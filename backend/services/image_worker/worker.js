const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

function health() {
  const versions = sharp.versions;
  return {
    status: "ok",
    service: "image-worker",
    sharp: versions.sharp,
    vips: versions.vips,
    formats: {
      jpeg: sharp.format.jpeg.input.file,
      png: sharp.format.png.input.file,
      webp: sharp.format.webp.input.file,
      tiff: sharp.format.tiff.input.file,
      avif: Boolean(sharp.format.heif && sharp.format.heif.input.file),
    },
  };
}

function kernelFor(method) {
  if (method === "pillow_bicubic" || method === "opencv_cubic") return sharp.kernel.cubic;
  return sharp.kernel.lanczos3;
}

function fitFor(mode) {
  if (mode === "cover") return "cover";
  if (mode === "stretch") return "fill";
  return "contain";
}

function marginPixels(request, width, height) {
  if (request.margin_mode === "pixels") {
    const value = Math.max(0, Math.round(Number(request.margin || 0)));
    return [
      Math.max(0, Math.min(value, Math.floor(width / 2) - 1)),
      Math.max(0, Math.min(value, Math.floor(height / 2) - 1)),
    ];
  }
  const margin = Math.max(0, Number(request.margin || 0));
  return [
    Math.max(0, Math.min(Math.round(width * margin / 100), Math.floor(width / 2) - 1)),
    Math.max(0, Math.min(Math.round(height * margin / 100), Math.floor(height / 2) - 1)),
  ];
}

function fitScaleRatio(inputWidth, inputHeight, request, contentWidth, contentHeight) {
  if (!inputWidth || !inputHeight) return 1;
  if (request.fit_mode === "cover" || request.fit_mode === "stretch") {
    return Math.max(contentWidth / inputWidth, contentHeight / inputHeight);
  }
  return Math.min(contentWidth / inputWidth, contentHeight / inputHeight);
}

function autoSharpenSigma(scale) {
  if (scale <= 0) return null;
  if (scale < 0.5) return 0.35;
  if (scale < 1) return 0.45;
  if (Math.abs(scale - 1) < 0.01) return 0.3;
  if (scale <= 1.5) return 0.55;
  return 0.7;
}

function sharpenSigma(request, scale) {
  const mode = request.clarity_enhance || "auto";
  if (mode === "none") return null;
  if (mode === "light") return 0.8;
  if (mode === "medium") return 1.0;
  if (mode === "strong") return 1.2;
  return autoSharpenSigma(scale);
}

function outputOptions(request, format) {
  const quality = Math.max(1, Math.min(100, Number(request.output_quality || 95)));
  if (format === "jpg" || format === "jpeg") {
    return ["jpeg", { quality, chromaSubsampling: "4:4:4", mozjpeg: false, progressive: true, optimiseScans: true }];
  }
  if (format === "webp") return ["webp", { quality }];
  if (format === "tiff") return ["tiff", { quality }];
  return ["png", { compressionLevel: 9 }];
}

async function writeOutput(output, method, options, outputPath, request) {
  if (method !== "jpeg") {
    await output[method](options).toFile(outputPath);
    return { quality: options.quality || null };
  }
  const maxMb = Math.max(0, Number(request.max_file_size_mb || 0));
  const maxBytes = maxMb > 0 ? Math.round(maxMb * 1024 * 1024) : 0;
  let quality = Math.max(1, Math.min(100, Number(options.quality || 95)));
  for (;;) {
    const jpegOptions = { ...options, quality };
    const buffer = await output.clone().jpeg(jpegOptions).toBuffer();
    if (!maxBytes || buffer.length <= maxBytes || quality <= 40) {
      fs.writeFileSync(outputPath, buffer);
      return { quality, bytes: buffer.length };
    }
    quality = Math.max(40, quality - 5);
  }
}

async function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => { data += chunk; });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}

async function transform(payload) {
  const request = payload.request || {};
  const inputPath = payload.input_path;
  const outputPath = payload.output_path;
  if (!inputPath || !outputPath) throw new Error("input_path and output_path are required");

  const targetWidth = Math.max(1, Math.round(Number(request.width || 1000)));
  const targetHeight = Math.max(1, Math.round(Number(request.height || 1000)));
  const [marginX, marginY] = marginPixels(request, targetWidth, targetHeight);
  const contentWidth = Math.max(1, targetWidth - marginX * 2);
  const contentHeight = Math.max(1, targetHeight - marginY * 2);
  const background = request.background || "#FFFFFF";

  let input = sharp(inputPath, { limitInputPixels: false }).rotate();
  if (request.crop_to_content) {
    const threshold = Math.max(0, Math.min(255, 255 - Number(request.white_threshold || 248)));
    input = input.flatten({ background }).trim({ background, threshold });
  }

  const normalizedInput = await input.png().toBuffer();
  const metadata = await sharp(normalizedInput, { limitInputPixels: false }).metadata();
  const scale = fitScaleRatio(metadata.width, metadata.height, request, contentWidth, contentHeight);
  const fit = fitFor(request.fit_mode);
  const kernel = kernelFor(request.standard_upscale_method);

  let output = sharp(normalizedInput, { limitInputPixels: false })
    .resize({
      width: contentWidth,
      height: contentHeight,
      fit,
      kernel,
      background,
      withoutEnlargement: false,
    })
    .extend({
      top: marginY,
      bottom: targetHeight - contentHeight - marginY,
      left: marginX,
      right: targetWidth - contentWidth - marginX,
      background,
    });

  const sigma = sharpenSigma(request, scale);
  if (sigma) output = output.sharpen(sigma);

  output = output.withMetadata({ density: Math.max(1, Math.round(Number(request.dpi || 72))) });
  const format = String(request.output_format || "jpg").toLowerCase().replace(/^\./, "");
  if (format === "jpg" || format === "jpeg") {
    output = output.flatten({ background });
  }
  const [method, options] = outputOptions(request, format);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const writeInfo = await writeOutput(output, method, options, outputPath, request);
  return { status: "ok", width: targetWidth, height: targetHeight, scale, ...writeInfo };
}

async function runLimited(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function runNext() {
    for (;;) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) return;
      results[index] = await worker(items[index], index);
    }
  }
  const workers = Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, runNext);
  await Promise.all(workers);
  return results;
}

async function batch(payload) {
  const items = Array.isArray(payload.items) ? payload.items : [];
  const concurrency = Math.max(1, Math.min(Number(payload.concurrency || 2), 8));
  const results = await runLimited(items, concurrency, async (item, index) => {
    try {
      const result = await transform(item);
      return { index, ...result, status: "processed" };
    } catch (error) {
      return {
        index,
        status: "failed",
        message: error && error.stack ? error.stack : String(error),
      };
    }
  });
  return { status: "ok", results };
}

async function main() {
  const command = process.argv[2] || "health";
  if (command === "health") {
    console.log(JSON.stringify(health(), null, 2));
    return;
  }
  if (command === "transform") {
    const payload = JSON.parse(await readStdin());
    console.log(JSON.stringify(await transform(payload)));
    return;
  }
  if (command === "batch") {
    const payload = JSON.parse(await readStdin());
    console.log(JSON.stringify(await batch(payload)));
    return;
  }
  throw new Error(`Unknown command: ${command}`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error && error.stack ? error.stack : String(error));
    process.exit(1);
  });
}

module.exports = { health, transform, batch };

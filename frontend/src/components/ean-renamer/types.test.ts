import { describe, expect, it } from "vitest";
import { columnCategoryKey, copyOutputPreflightError, outputLabelForColumn, validateEan13 } from "./types";

describe("EAN Renamer output mapping", () => {
  it("keeps standard category keys compatible with the backend", () => {
    expect(columnCategoryKey("lifestyle-human")).toBe("lifestyle_human");
    expect(columnCategoryKey("lifestyle-normal")).toBe("lifestyle_normal");
  });

  it("keeps custom columns as safe output category names", () => {
    expect(columnCategoryKey("detail-shots")).toBe("detail-shots");
    expect(outputLabelForColumn({ key: "detail-shots", title: "Detail shots", imageIds: [] })).toBe("Detail shots");
  });

  it("validates an EAN-13 check digit", () => {
    expect(validateEan13("8809893510410")).toBe(true);
    expect(validateEan13("8809893510411")).toBe(false);
  });

  it("requires separate copy outputs for populated categories", () => {
    const assignments = [{ category: "packshot" }, { category: "artwork" }];
    expect(copyOutputPreflightError("copy", assignments, { packshot: "D:/Out/Packshot" })).toContain("Missing: artwork");
    expect(copyOutputPreflightError("copy", assignments, {
      packshot: "D:/Out/Shared",
      artwork: "d:/out/shared/",
    })).toContain("different output folder");
    expect(copyOutputPreflightError("copy", assignments, {
      packshot: "D:/Out/Packshot",
      artwork: "D:/Out/Artwork",
    })).toBeNull();
  });
});

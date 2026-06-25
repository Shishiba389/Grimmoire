import { memo } from "react";
import type { RenImage } from "./types";
import { formatFileSize, thumbnailUrl } from "./types";

type Props = {
  image: RenImage;
  x: number;
  y: number;
  folderPath: string;
};

export const HoverPreview = memo(function HoverPreview({ image, x, y, folderPath }: Props) {
  return (
    <div
      className="ren-hover-preview"
      style={{
        left: Math.max(12, Math.min(x + 18, window.innerWidth - 340)),
        top: Math.max(12, Math.min(y + 18, window.innerHeight - 430)),
      }}
    >
      <div className="ren-hover-image-wrap">
        <img src={thumbnailUrl(image.id, folderPath)} alt={image.name} />
      </div>
      <div className="ren-hover-name" title={image.name}>
        {image.name}
      </div>
      <div className="ren-hover-meta">
        {image.width}&times;{image.height} &middot; {formatFileSize(image.sizeBytes)} &middot; {image.extension.toUpperCase()}
      </div>
    </div>
  );
});

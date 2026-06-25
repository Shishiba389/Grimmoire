import { memo } from "react";
import type { BulkWorkItem } from "./types";

type Props = {
  item: BulkWorkItem;
  onReturnToBulk: () => void;
  onNextBatch: () => void;
};

export const BulkActiveIndicator = memo(function BulkActiveIndicator({
  item,
  onReturnToBulk,
  onNextBatch,
}: Props) {
  return (
    <div className="ren-bulk-active">
      <div>
        <span>Bulk batch</span>
        <strong>{item.name}</strong>
        <small>{item.imageCount} images - {item.relativePath}</small>
      </div>
      <div className="ren-bulk-active-actions">
        <button className="btn btn-secondary btn-sm" onClick={onReturnToBulk}>Back to Bulk</button>
        <button className="btn btn-primary btn-sm" onClick={onNextBatch}>Next Batch</button>
      </div>
    </div>
  );
});

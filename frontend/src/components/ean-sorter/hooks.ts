import { useState, useEffect, useCallback } from "react";
import { apiJson } from "../ToolShared";
import type { SortJobRecord, MasterDataUploadResponse } from "./types";

export function useJobPolling(
  job: SortJobRecord | null,
  onComplete?: (job: SortJobRecord) => void,
  onFail?: (job: SortJobRecord) => void,
) {
  const [currentJob, setCurrentJob] = useState<SortJobRecord | null>(job);

  useEffect(() => {
    setCurrentJob(job);
  }, [job]);

  useEffect(() => {
    if (!currentJob || !["pending", "running"].includes(currentJob.status)) return;
    let cancelled = false;
    const timer = window.setInterval(async () => {
      try {
        const next = await apiJson<SortJobRecord>(`/api/jobs/${currentJob.id}`);
        if (cancelled) return;
        setCurrentJob(next);
        if (next.status === "completed") {
          window.clearInterval(timer);
          onComplete?.(next);
        } else if (next.status === "failed") {
          window.clearInterval(timer);
          onFail?.(next);
        }
      } catch {
        window.clearInterval(timer);
      }
    }, 1200);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [currentJob?.id, currentJob?.status]);

  return currentJob;
}

export function useMasterData() {
  const [sessionId, setSessionId] = useState("");
  const [rowCount, setRowCount] = useState(0);
  const [columnsDetected, setColumnsDetected] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const uploadFile = useCallback(async (file: File) => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await apiJson<MasterDataUploadResponse>(
        "/api/ean-sorter/master-data/upload",
        { method: "POST", body: form },
      );
      setSessionId(res.session_id);
      setRowCount(res.row_count);
      setColumnsDetected(res.columns_detected);
      setWarnings(res.warnings);
      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadPath = useCallback(async (path: string) => {
    setLoading(true);
    try {
      const res = await apiJson<MasterDataUploadResponse>(
        "/api/ean-sorter/master-data/upload-path",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path }),
        },
      );
      setSessionId(res.session_id);
      setRowCount(res.row_count);
      setColumnsDetected(res.columns_detected);
      setWarnings(res.warnings);
      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setSessionId("");
    setRowCount(0);
    setColumnsDetected([]);
    setWarnings([]);
  }, []);

  return {
    sessionId, rowCount, columnsDetected, warnings, loading,
    uploadFile, uploadPath, clear,
  };
}

export function matchesQuery(query: string, ...fields: (string | undefined | null)[]) {
  if (!query) return true;
  const q = query.toLowerCase();
  return fields.some((f) => (f || "").toLowerCase().includes(q));
}

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __grimoire?: {
      isDesktop?: boolean;
      pickFolder?: (title?: string) => Promise<string>;
      pickFile?: (title?: string, filters?: string) => Promise<string>;
      revealInExplorer?: (path: string) => void;
    };
    __GRIMOIRE_API_BASE__?: string;
  }
}

export type JobRecord = {
  id: string;
  status: "pending" | "running" | "completed" | "failed";
  original_filename?: string | null;
  output_path?: string | null;
  error?: string | null;
  summary?: Record<string, unknown>;
};

export function apiUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  if (!path.startsWith("/api") && !path.startsWith("/health")) return path;

  const injectedBase = window.__GRIMOIRE_API_BASE__?.replace(/\/$/, "");
  if (injectedBase) return `${injectedBase}${path}`;

  const { hostname, port, protocol } = window.location;
  const sameOriginPorts = new Set(["5173", "7788"]);
  if (
    protocol.startsWith("http") &&
    (hostname === "127.0.0.1" || hostname === "localhost") &&
    sameOriginPorts.has(port)
  ) {
    return path;
  }

  return `http://127.0.0.1:7788${path}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(apiUrl(path), init);
  } catch (error) {
    await sleep(1200);
    try {
      response = await fetch(apiUrl(path), init);
    } catch {
      throw error;
    }
  }
  if (!response.ok) {
    let detail = response.statusText;
    try {
      const payload = await response.json();
      detail = typeof payload.detail === "string" ? payload.detail : JSON.stringify(payload.detail ?? payload);
    } catch {
      detail = await response.text().catch(() => response.statusText);
    }
    throw new Error(detail);
  }
  return response.json() as Promise<T>;
}

export async function pickFolder(title: string, initialPath?: string): Promise<string> {
  if (window.__grimoire?.pickFolder) {
    return (await window.__grimoire.pickFolder(title)) || "";
  }
  const result = await apiJson<{ path: string }>("/api/local/select-folder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, initial_path: initialPath }),
  });
  return result.path || "";
}

export function statusLabel(job?: JobRecord | null) {
  if (!job) return "Idle";
  const progress = Number(job.summary?.progress_percent ?? 0);
  return job.status === "running" && progress ? `Running ${progress}%` : job.status;
}

export function useJobPolling(job: JobRecord | null, onDone?: (job: JobRecord) => void) {
  const [current, setCurrent] = useState<JobRecord | null>(job);

  useEffect(() => setCurrent(job), [job]);

  useEffect(() => {
    if (!current || !["pending", "running"].includes(current.status)) return;
    let cancelled = false;
    const timer = window.setInterval(async () => {
      try {
        const next = await apiJson<JobRecord>(`/api/jobs/${current.id}`);
        if (cancelled) return;
        setCurrent(next);
        if (["completed", "failed"].includes(next.status)) {
          window.clearInterval(timer);
          onDone?.(next);
        }
      } catch {
        window.clearInterval(timer);
      }
    }, 1200);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [current?.id, current?.status]);

  return current;
}

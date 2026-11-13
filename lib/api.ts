export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export type FileMeta = {
  fid: string;
  pid: number;
  album: string;
  filename: string;
  size_mb: number;
  created_at: string;
};

export type UploadInput = { file: File; pid: number; album: string };

function errorMessage(body: unknown, status: number): string {
  const detail = (body as { detail?: unknown } | null)?.detail;
  return typeof detail === "string" ? detail : `Błąd serwera (HTTP ${status})`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(API_URL + path, init);
  if (!res.ok) throw new Error(errorMessage(await res.json().catch(() => null), res.status));
  return res.status === 204 ? (undefined as T) : res.json();
}

export const listFiles = () => request<FileMeta[]>("/files");

export const deleteFile = (fid: string) => request<void>(`/files/${fid}`, { method: "DELETE" });

export const downloadUrl = (fid: string) => `${API_URL}/files/${fid}/download`;

/** Multipart upload via XHR, because fetch cannot report upload progress. */
export function uploadFile({ file, pid, album }: UploadInput, onProgress: (pct: number) => void): Promise<FileMeta> {
  const form = new FormData();
  form.append("file", file);
  form.append("pid", String(pid));
  form.append("album", album);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/files`);
    xhr.responseType = "json";
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () =>
      xhr.status < 300 ? resolve(xhr.response) : reject(new Error(errorMessage(xhr.response, xhr.status)));
    xhr.onerror = () => reject(new Error("Brak połączenia z API"));
    xhr.send(form);
  });
}

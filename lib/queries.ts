"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFile, listFiles, uploadFile, type UploadInput } from "./api";

const FILES_KEY = ["files"];

export const useFiles = () =>
  useQuery({
    queryKey: FILES_KEY,
    queryFn: listFiles,
    select: (files) => [...files].sort((a, b) => b.created_at.localeCompare(a.created_at)),
    refetchInterval: 10_000, // also drives the API status badge
  });

export function useUpload(onProgress: (pct: number) => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UploadInput) => uploadFile(input, onProgress),
    onSuccess: () => qc.invalidateQueries({ queryKey: FILES_KEY }),
  });
}

export function useDeleteFile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteFile,
    onSuccess: () => qc.invalidateQueries({ queryKey: FILES_KEY }),
  });
}

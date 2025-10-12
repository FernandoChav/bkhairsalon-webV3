'use client';

import { useCallback, useRef, useState } from 'react';

import { FileWithPreview } from '@/models/helpers';

interface UseFileUploadParams {
  maxFiles?: number;
  allowedTypes?: string[];
}

interface UseFileUploadReturn {
  files: FileWithPreview[];
  hasFiles: boolean;
  canAddMore: boolean;
  isAtMaxCapacity: boolean;
  fileCount: number;
  handleAddFiles: (newFiles: FileList | File[]) => void;
  handleRemoveFile: (index: number) => void;
  handleClearFiles: () => void;
}

export const useFileUpload = ({
  maxFiles = 5,
  allowedTypes = [],
}: UseFileUploadParams): UseFileUploadReturn => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const fileUrlsRef = useRef<Set<string>>(new Set());

  const handleAddFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const filesArray = Array.from(newFiles);

      // Filter files by allowed types if specified
      const filteredFiles =
        allowedTypes.length > 0
          ? filesArray.filter(file => allowedTypes.includes(file.type))
          : filesArray;

      const filesWithPreview = filteredFiles.map(file => {
        const fileWithPreview = file as FileWithPreview;
        const previewUrl = URL.createObjectURL(file);
        fileWithPreview.preview = previewUrl;
        fileUrlsRef.current.add(previewUrl);
        return fileWithPreview;
      });

      setFiles(prev => {
        const combined = [...prev, ...filesWithPreview];
        return combined.slice(0, maxFiles);
      });
    },
    [maxFiles, allowedTypes]
  );

  const handleRemoveFile = useCallback((index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      const fileToRemove = newFiles[index];

      // Revoke the object URL to free memory
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
        fileUrlsRef.current.delete(fileToRemove.preview);
      }

      newFiles.splice(index, 1);
      return newFiles;
    });
  }, []);

  const handleClearFiles = useCallback(() => {
    // Revoke all object URLs to free memory
    fileUrlsRef.current.forEach(url => {
      URL.revokeObjectURL(url);
    });
    fileUrlsRef.current.clear();
    setFiles([]);
  }, []);

  // Computed values
  const hasFiles = files.length > 0;
  const canAddMore = files.length < maxFiles;
  const isAtMaxCapacity = files.length >= maxFiles;
  const fileCount = files.length;

  return {
    // Valores
    files,
    hasFiles,
    canAddMore,
    isAtMaxCapacity,
    fileCount,
    // Handlers
    handleAddFiles,
    handleRemoveFile,
    handleClearFiles,
  };
};

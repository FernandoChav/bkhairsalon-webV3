'use client';

import { useCallback, useState } from 'react';

import { FileWithPreview } from '@/models/helpers';

export const useFileUpload = (maxFiles: number = 5) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const filesArray = Array.from(newFiles);
      const filesWithPreview = filesArray.map(file => {
        const fileWithPreview = file as FileWithPreview;
        fileWithPreview.preview = URL.createObjectURL(file);
        return fileWithPreview;
      });

      setFiles(prev => {
        const combined = [...prev, ...filesWithPreview];
        return combined.slice(0, maxFiles);
      });
    },
    [maxFiles]
  );

  const removeFile = useCallback((index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      // Revoke the object URL to free memory
      if (newFiles[index]?.preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  }, []);

  const clearFiles = useCallback(() => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
  }, [files]);

  return {
    // Valores
    files,
    // Handlers
    addFiles,
    removeFile,
    clearFiles,
  };
};

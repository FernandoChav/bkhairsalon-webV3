import { useMemo } from 'react';

interface UseFileUploadFieldParams {
  files: File[];
  maxFiles?: number;
}

interface UseFileUploadFieldReturn {
  // Values
  hasFiles: boolean;
  filesCount: number;
  maxFiles: number;
  uploadTitle: string;
  uploadPlaceholder: string;
  previewGridCols: '2' | '3' | '4' | '5';
}

export const useFileUploadField = ({
  files,
  maxFiles: maxFilesParam = 10,
}: UseFileUploadFieldParams): UseFileUploadFieldReturn => {
  const hasFiles = files.length > 0;
  const filesCount = files.length;
  const maxFiles = maxFilesParam;
  const isAtMaxFiles = filesCount >= maxFiles;

  const uploadTitle = useMemo(() => {
    return isAtMaxFiles
      ? `Límite máximo alcanzado (${maxFiles} fotos)`
      : 'Sube fotos de tu servicio';
  }, [isAtMaxFiles, maxFiles]);

  const uploadPlaceholder = useMemo(() => {
    return `${filesCount}/${maxFiles} fotos subidas`;
  }, [filesCount, maxFiles]);

  const previewGridCols = useMemo((): '2' | '3' | '4' | '5' => {
    return filesCount === 1 ? '2' : '4';
  }, [filesCount]);

  return {
    // Values
    hasFiles,
    filesCount,
    maxFiles,
    uploadTitle,
    uploadPlaceholder,
    previewGridCols,
  };
};

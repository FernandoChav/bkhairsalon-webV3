import { HiCamera, HiPlus, HiX } from 'react-icons/hi';

import { FC, useCallback, useRef } from 'react';

import Image from 'next/image';

import { Button } from '@/components/shadcn';
import { FileWithPreview } from '@/hooks/common';
import { cn } from '@/libs';

interface FileUploadProps {
  files: FileWithPreview[];
  onFileAdd: (files: FileList | File[]) => void;
  onFileRemove: (index: number) => void;
  maxFiles?: number;
  className?: string;
  accept?: string;
  multiple?: boolean;
  title?: string;
  description?: string;
  placeholder?: string;
  showPreview?: boolean;
  previewGridCols?: '2' | '3' | '4' | '5';
  disabled?: boolean;
}

export const FileUpload: FC<FileUploadProps> = ({
  files,
  onFileAdd,
  onFileRemove,
  maxFiles = 10,
  className,
  accept = 'image/*',
  multiple = true,
  title,
  description,
  placeholder,
  showPreview = true,
  previewGridCols = '4',
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        onFileAdd(selectedFiles);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [onFileAdd]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        onFileAdd(droppedFiles);
      }
    },
    [onFileAdd]
  );

  const openFileDialog = useCallback(() => {
    if (!disabled && files.length < maxFiles) {
      fileInputRef.current?.click();
    }
  }, [disabled, files.length, maxFiles]);

  const isImageFile = accept.includes('image');
  const isAtMaxFiles = files.length >= maxFiles;
  const isDisabled = disabled || isAtMaxFiles;

  // Default texts based on file type
  const defaultTitle = isImageFile
    ? isAtMaxFiles
      ? `Límite máximo alcanzado (${maxFiles} fotos)`
      : 'Sube fotos'
    : isAtMaxFiles
      ? `Límite máximo alcanzado (${maxFiles} archivos)`
      : 'Sube archivos';

  const defaultDescription = isImageFile
    ? 'Arrastra las imágenes aquí o haz clic para seleccionar'
    : 'Arrastra los archivos aquí o haz clic para seleccionar';

  const defaultPlaceholder = isImageFile
    ? `${files.length}/${maxFiles} fotos subidas`
    : `${files.length}/${maxFiles} archivos subidos`;

  const gridColsClass = {
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    '5': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
  }[previewGridCols];

  return (
    <div className={cn('space-y-4', className)}>
      <div
        onClick={openFileDialog}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors',
          !isDisabled &&
            'cursor-pointer hover:border-primary hover:bg-primary/5',
          isDisabled && 'pointer-events-none opacity-50'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          disabled={isDisabled}
        />

        <div className="flex flex-col items-center space-y-3">
          <div className="p-3 rounded-full bg-primary/10">
            <HiCamera className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-base font-medium text-foreground">
              {title || defaultTitle}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {description || defaultDescription}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {placeholder || defaultPlaceholder}
            </p>
          </div>
        </div>

        {showPreview && files.length > 0 && (
          <div className={cn('grid gap-4 mt-6', gridColsClass)}>
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  {isImageFile && file.preview ? (
                    <Image
                      src={file.preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <HiCamera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground truncate px-2">
                          {file.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => onFileRemove(index)}
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <HiX className="h-3 w-3" />
                </Button>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {file.name}
                </p>
              </div>
            ))}

            {files.length < maxFiles && !disabled && (
              <div
                onClick={openFileDialog}
                className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="flex flex-col items-center space-y-2">
                  <HiPlus className="h-8 w-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Agregar más
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

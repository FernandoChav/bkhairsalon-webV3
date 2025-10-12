import { useDropzone } from 'react-dropzone';
import { HiCamera, HiPlus, HiX } from 'react-icons/hi';

import { FC, MouseEvent, useCallback } from 'react';

import Image from 'next/image';

import { Button } from '@/components/shadcn';
import { cn } from '@/libs';
import { FileWithPreview } from '@/models/helpers';

interface FileUploadProps {
  // Valores (estado, datos, computed values)
  files: FileWithPreview[];
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

  // Handlers (funciones de manejo de eventos)
  handleAddFiles: (files: FileList | File[]) => void;
  handleRemoveFile: (index: number) => void;
}

export const FileUpload: FC<FileUploadProps> = ({
  // Valores primero
  files,
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
  // Handlers después
  handleAddFiles,
  handleRemoveFile,
}) => {
  // Handlers
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleAddFiles(acceptedFiles);
      }
    },
    [handleAddFiles]
  );

  const handleFileRemoveClick = (index: number) => {
    handleRemoveFile(index);
  };

  const handleAddMoreClick = () => {
    open();
  };

  const handleFileRemoveWithEvent =
    (index: number) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleFileRemoveClick(index);
    };

  const handleAddMoreWithEvent = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleAddMoreClick();
  };

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: handleDrop,
    accept: accept ? { [accept]: [] } : undefined,
    multiple,
    disabled: disabled || files.length >= maxFiles,
    noClick: false,
    noKeyboard: false,
  });

  // Computed values
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

  const dropzoneClassName = cn(
    'relative border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors',
    !isDisabled && 'cursor-pointer hover:border-primary hover:bg-primary/5',
    isDisabled && 'pointer-events-none opacity-50',
    isDragActive && 'border-primary bg-primary/5'
  );

  const addMoreClassName = cn(
    'aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors'
  );

  return (
    <div className={cn('space-y-4', className)}>
      <div {...getRootProps()} className={dropzoneClassName}>
        <input {...getInputProps()} />

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
              <div
                key={index}
                className="relative group"
                onClick={e => e.stopPropagation()}
              >
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
                  onClick={handleFileRemoveWithEvent(index)}
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
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
                onClick={handleAddMoreWithEvent}
                className={addMoreClassName}
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

import { HiCamera, HiPlus, HiX } from 'react-icons/hi';

import { FC, useCallback, useRef } from 'react';

import { Button } from '@/components/shadcn';
import { FileWithPreview } from '@/hooks/common';
import { cn } from '@/libs';

interface ImageUploadProps {
  files: FileWithPreview[];
  onFileAdd: (files: FileList | File[]) => void;
  onFileRemove: (index: number) => void;
  maxFiles?: number;
  className?: string;
}

export const ImageUpload: FC<ImageUploadProps> = ({
  files,
  onFileAdd,
  onFileRemove,
  maxFiles = 10,
  className,
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
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={cn('space-y-4', className)}>
      <div
        onClick={openFileDialog}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-colors',
          'hover:border-primary hover:bg-primary/5',
          files.length >= maxFiles && 'pointer-events-none opacity-50'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          disabled={files.length >= maxFiles}
        />

        <div className="flex flex-col items-center space-y-3">
          <div className="p-3 rounded-full bg-primary/10">
            <HiCamera className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-base font-medium text-foreground">
              {files.length >= maxFiles
                ? `Límite máximo alcanzado (${maxFiles} fotos)`
                : 'Sube fotos de tu servicio'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Arrastra las imágenes aquí o haz clic para seleccionar
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {files.length}/{maxFiles} fotos subidas
            </p>
          </div>
        </div>
        {files.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={file.preview}
                    alt={`Preview ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
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
            {files.length < maxFiles && (
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

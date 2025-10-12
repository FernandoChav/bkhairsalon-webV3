import { FC } from 'react';

import { Button, FormLabel } from '@/components/shadcn';
import { FileUpload } from '@/components/ui';

import { useFileUploadField } from '../hooks';

interface FileUploadFieldProps {
  files: File[];
  handleAddFiles: (files: FileList | File[]) => void;
  handleRemoveFile: (index: number) => void;
  handleClearFiles: () => void;
}

export const FileUploadField: FC<FileUploadFieldProps> = ({
  files,
  handleAddFiles,
  handleRemoveFile,
  handleClearFiles,
}) => {
  const {
    hasFiles,
    filesCount,
    maxFiles,
    uploadTitle,
    uploadPlaceholder,
    previewGridCols,
  } = useFileUploadField({ files });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <FormLabel className="text-sm font-medium text-muted-foreground">
          Fotos del Servicio (Opcional)
        </FormLabel>
        {hasFiles && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClearFiles}
            className="text-xs cursor-pointer"
          >
            Limpiar todas ({filesCount})
          </Button>
        )}
      </div>

      <FileUpload
        files={files}
        maxFiles={maxFiles}
        accept="image/*"
        multiple={true}
        title={uploadTitle}
        description="Arrastra las imágenes aquí o haz clic para seleccionar"
        placeholder={uploadPlaceholder}
        showPreview={true}
        previewGridCols={previewGridCols}
        handleAddFiles={handleAddFiles}
        handleRemoveFile={handleRemoveFile}
      />
    </div>
  );
};

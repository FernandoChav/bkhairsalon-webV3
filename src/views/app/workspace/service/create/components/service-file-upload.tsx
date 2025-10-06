import { FC } from 'react';

import { Button, FormLabel } from '@/components/shadcn';
import { FileUpload } from '@/components/ui';

interface ServiceFileUploadProps {
  files: File[];
  handleAddFiles: (files: FileList | File[]) => void;
  handleRemoveFile: (index: number) => void;
  handleClearFiles: () => void;
}

export const ServiceFileUpload: FC<ServiceFileUploadProps> = ({
  files,
  handleAddFiles,
  handleRemoveFile,
  handleClearFiles,
}) => {
  // Computed values
  const hasFiles = files.length > 0;
  const filesCount = files.length;
  const maxFiles = 10;
  const isAtMaxFiles = filesCount >= maxFiles;

  const uploadTitle = isAtMaxFiles
    ? `Límite máximo alcanzado (${maxFiles} fotos)`
    : 'Sube fotos de tu servicio';

  const uploadPlaceholder = `${filesCount}/${maxFiles} fotos subidas`;

  const previewGridCols = filesCount === 1 ? '2' : '4';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <FormLabel className="text-sm font-medium">
          Fotos del Servicio
        </FormLabel>
        {hasFiles && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClearFiles}
            className="text-xs"
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

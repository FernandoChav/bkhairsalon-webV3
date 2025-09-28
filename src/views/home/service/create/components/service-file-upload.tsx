import { FC } from 'react';

import { Button } from '@/components/shadcn';
import { FormLabel } from '@/components/shadcn';
import { FileUpload } from '@/components/ui';

interface ServiceFileUploadProps {
  files: File[];
  addFiles: (files: FileList | File[]) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
}

export const ServiceFileUpload: FC<ServiceFileUploadProps> = ({
  files,
  addFiles,
  removeFile,
  clearFiles,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <FormLabel className="text-sm font-medium">
          Fotos del Servicio
        </FormLabel>
        {files.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearFiles}
            className="text-xs"
          >
            Limpiar todas
          </Button>
        )}
      </div>
      <FileUpload
        files={files}
        onFileAdd={addFiles}
        onFileRemove={removeFile}
        maxFiles={10}
        accept="image/*"
        multiple={true}
        title={
          files.length >= 10
            ? 'Límite máximo alcanzado (10 fotos)'
            : 'Sube fotos de tu servicio'
        }
        description="Arrastra las imágenes aquí o haz clic para seleccionar"
        placeholder={`${files.length}/10 fotos subidas`}
        showPreview={true}
        previewGridCols="4"
      />
    </div>
  );
};

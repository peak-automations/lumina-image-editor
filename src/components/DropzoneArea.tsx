import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { cn } from '../lib/utils';

interface DropzoneAreaProps {
  onImageSelect: (file: File) => void;
  className?: string;
}

export function DropzoneArea({ onImageSelect, className }: DropzoneAreaProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  } as any);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200",
        isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-text-muted hover:bg-surface-hover",
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
        <UploadCloud className={cn("w-12 h-12 mb-4", isDragActive ? "text-primary" : "text-text-muted")} />
        <p className="mb-2 text-sm text-text-muted">
          <span className="font-semibold text-text">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-text-muted">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
      </div>
    </div>
  );
}

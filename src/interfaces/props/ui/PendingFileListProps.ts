export interface PendingFileListProps {
  files: File[];
  isUploading: boolean;
  onRemove: (file: File) => void;
  onUpload: () => void;
}

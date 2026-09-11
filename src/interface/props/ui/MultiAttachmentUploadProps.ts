export interface MultiAttachmentUploadProps {
  onUpload: (file: File) => Promise<unknown>;
  onSuccess?: (result: unknown) => void;
  allowedTypesLabel?: string;
  instructions?: string;
  accept?: Record<string, string[]>;
}

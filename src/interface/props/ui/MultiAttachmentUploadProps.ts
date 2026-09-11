export interface MultiAttachmentUploadProps {
  onUpload: (file: File) => Promise<any>;
  onSuccess?: (result: any) => void;
  allowedTypesLabel?: string;
  instructions?: string;
  accept?: Record<string, string[]>;
}

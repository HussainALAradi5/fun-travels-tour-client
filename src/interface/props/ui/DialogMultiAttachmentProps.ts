export interface DialogMultiAttachmentProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<unknown>;
  onSuccess?: () => void;
  title: string;
  description: string;
  templateData: Record<string, unknown>[];
  templateFileName: string;
  instructions: string;
  colorPalette?: string;
}

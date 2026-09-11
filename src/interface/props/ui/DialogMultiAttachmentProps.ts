export interface DialogMultiAttachmentProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<any>;
  onSuccess?: () => void;
  title: string;
  description: string;
  templateData: any[];
  templateFileName: string;
  instructions: string;
  colorPalette?: string;
}

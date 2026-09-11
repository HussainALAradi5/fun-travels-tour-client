export interface ExportOptionProps {
  title: string;
  desc: string;
  icon: any;
  scheme: string;
  onSelect: () => void;
}

export interface GenericExportDialogProps<T extends Record<string, any>> {
  open: boolean;
  onClose: () => void;
  data: T[];
  fileName: string;
  imageColumns?: string[];
}

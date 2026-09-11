export interface ExportOptionProps {
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number }>;
  scheme: string;
  onSelect: () => void;
}

export interface GenericExportDialogProps<T extends Record<string, unknown>> {
  open: boolean;
  onClose: () => void;
  data: T[];
  fileName: string;
  imageColumns?: string[];
}

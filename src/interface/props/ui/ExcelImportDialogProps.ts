import type { ImportResult } from "@/interface/common/ImportResult";

export interface ExcelImportDialogProps {
  open: boolean;
  title: string;
  description: string;
  columns: readonly string[];
  onClose: () => void;
  onImport: (file: File) => Promise<ImportResult>;
  onCompleted?: () => void;
}

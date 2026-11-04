/**
 * "report" offers branded PDF and Excel reports of the rows; "template" offers a clean Excel import
 * template whose columns are the keys of the first row.
 */
export interface ExportDialogProps<T> {
  open: boolean;
  onClose: () => void;
  data: T[];
  fileName: string;
  imageColumns?: string[];
  mode?: "report" | "template";
  /** Template mode: extra guidance written to the Instructions sheet. */
  instructions?: string;
}

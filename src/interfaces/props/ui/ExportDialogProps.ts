import type { ReportSpec } from "@/interfaces/common/ReportSpec";

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
  /**
   * When set and the user is signed in, the server generates the report from all matching records
   * (not just the rows loaded here) and keeps it; otherwise the loaded rows are exported in the browser.
   */
  report?: ReportSpec;
}

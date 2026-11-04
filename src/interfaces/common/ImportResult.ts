/** Mirrors the server ImportResult returned by spreadsheet imports. */
export interface ImportResult {
  importedCount: number;
  failedCount: number;
  errors: string[];
}

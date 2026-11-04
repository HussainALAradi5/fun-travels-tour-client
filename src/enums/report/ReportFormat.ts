/** File formats of a server report. */
export const ReportFormat = {
  PDF: "PDF",
  XLSX: "XLSX",
} as const;

export type ReportFormat = (typeof ReportFormat)[keyof typeof ReportFormat];

/** Header facts printed on every exported report. */
export interface ReportMeta {
  title: string;
  generatedAt: Date;
  generatedBy: string;
  recordCount: number;
}

import type { ReportRequestDto } from "@/dtos/report/ReportRequestDto";

/** Which server report a table or page exports; the format is picked in the export dialog. */
export type ReportSpec = Omit<ReportRequestDto, "format">;

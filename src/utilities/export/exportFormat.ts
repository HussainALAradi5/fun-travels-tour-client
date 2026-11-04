import { HIDDEN_EXPORT_KEYS } from "@/constants/export/reportTemplate";
import type { ExportRecord } from "@/interfaces/common/ExportRecord";
import type { ExportValue } from "@/interfaces/common/ExportValue";
import type { ReportMeta } from "@/interfaces/common/ReportMeta";
import { authUtils } from "@/utilities/AuthUtils";

const ISO_DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** "ticketNumber" -> "Ticket Number". */
export function formatHeader(key: string): string {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** A readable cell value: nested records show their name, lists are joined, ISO dates are shortened. */
export function formatValue(value: ExportValue, separator = ", "): string {
  if (value === null || value === undefined || value === "") return "-";
  if (Array.isArray(value)) return value.length ? value.map((v) => formatValue(v, separator)).join(separator) : "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return Number.isInteger(value) ? String(value) : value.toFixed(2);
  if (typeof value === "object") {
    const named = value.name ?? value.title ?? value.officialName ?? value.famousName ?? value.agencyName
      ?? value.branchName ?? value.tourNumber ?? value.seatCode ?? value.accountNumber ?? value.reservationNumber;
    return named === undefined || named === null ? "-" : String(named);
  }
  const text = String(value).trim();
  if (ISO_DATE_TIME.test(text)) return text.replace("T", " ").slice(0, 16);
  return text;
}

/**
 * Excel keeps numbers and dates typed so totals, sorting, and filters work. Server timestamps carry no
 * zone and mean wall-clock time, so they are read as UTC: Excel then shows exactly the server's value.
 */
export function excelValue(value: ExportValue): string | number | Date {
  if (typeof value === "number") return value;
  if (typeof value === "string" && (ISO_DATE.test(value) || ISO_DATE_TIME.test(value))) {
    const hasZone = /(Z|[+-]\d{2}:?\d{2})$/.test(value);
    const date = new Date(ISO_DATE.test(value) || hasZone ? value : `${value}Z`);
    if (!Number.isNaN(date.getTime())) return date;
  }
  return formatValue(value, "\n");
}

/** Excel number format for a typed cell: date only, date and time, or two decimals. */
export function excelFormat(raw: ExportValue, cell: string | number | Date): string | undefined {
  if (cell instanceof Date) return typeof raw === "string" && ISO_DATE.test(raw) ? "yyyy-mm-dd" : "yyyy-mm-dd hh:mm";
  if (typeof cell === "number" && !Number.isInteger(cell)) return "#,##0.00";
  return undefined;
}

/** Characters a cell shows, used to size columns. */
export function displayLength(cell: string | number | Date): number {
  if (cell instanceof Date) return 16;
  return String(cell).split("\n").reduce((longest, line) => Math.max(longest, line.length), 0);
}

/** Exportable keys of the first record, in order. */
export function exportKeys(data: ExportRecord[]): string[] {
  return data.length ? Object.keys(data[0]).filter((k) => !HIDDEN_EXPORT_KEYS.has(k.toLowerCase())) : [];
}

/** Title, timestamp, author, and count printed on every report. */
export function buildReportMeta(fileName: string, recordCount: number): ReportMeta {
  return {
    title: formatHeader(fileName.replace(/_/g, " ")),
    generatedAt: new Date(),
    generatedBy: authUtils.getUser()?.name ?? "Guest",
    recordCount,
  };
}

/** "Tour_Inventory" + "pdf" -> "Tour_Inventory_2026-11-04_1530.pdf". */
export function reportFileName(fileName: string, extension: string, at: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp = `${at.getFullYear()}-${pad(at.getMonth() + 1)}-${pad(at.getDate())}_${pad(at.getHours())}${pad(at.getMinutes())}`;
  return `${fileName.replace(/[^\w-]+/g, "_")}_${stamp}.${extension}`;
}

/** "4 Nov 2026, 15:30". */
export function formatStamp(at: Date): string {
  return at.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

/** Starts a browser download of the blob. */
export function saveBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

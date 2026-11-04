import jsPDF from "jspdf";
import autoTable, { type CellHookData } from "jspdf-autotable";
import { DEFAULT_IMAGE_COLUMNS, PDF_LAYOUT, REPORT_BRAND } from "@/constants/export/reportTemplate";
import type { ExportRecord } from "@/interfaces/common/ExportRecord";
import type { ReportMeta } from "@/interfaces/common/ReportMeta";
import { buildReportMeta, exportKeys, formatHeader, formatStamp, formatValue, reportFileName } from "./exportFormat";

const TOTAL_PAGES = "{total_pages}";
const NUMERIC = /^-?[$€£]?\d[\d,]*(\.\d+)?%?$/;
const isImage = (value: unknown): value is string => typeof value === "string" && value.startsWith("data:image");

/** Navy letterhead with brand on the left and report title on the right; repeated on every page. */
function drawLetterhead(doc: jsPDF, meta: ReportMeta) {
  const width = doc.internal.pageSize.getWidth();
  const { marginX, headerHeight } = PDF_LAYOUT;
  doc.setFillColor(...REPORT_BRAND.primaryRgb);
  doc.rect(0, 0, width, headerHeight, "F");
  doc.setFillColor(...REPORT_BRAND.accentRgb);
  doc.rect(0, headerHeight, width, 1.2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold").setFontSize(15).text(REPORT_BRAND.name, marginX, 10);
  doc.setFont("helvetica", "normal").setFontSize(8).text(REPORT_BRAND.tagline, marginX, 15.5);
  doc.setFont("helvetica", "bold").setFontSize(12).text(meta.title, width - marginX, 10, { align: "right" });
  doc.setFont("helvetica", "normal").setFontSize(8).text("Report", width - marginX, 15.5, { align: "right" });
}

/** Generated date, author, and record count, under the letterhead of the first page. */
function drawMetaLine(doc: jsPDF, meta: ReportMeta) {
  const y = PDF_LAYOUT.headerHeight + 7;
  doc.setTextColor(...REPORT_BRAND.mutedRgb).setFont("helvetica", "normal").setFontSize(8);
  doc.text(`Generated ${formatStamp(meta.generatedAt)}   |   By ${meta.generatedBy}   |   ${meta.recordCount} record${meta.recordCount === 1 ? "" : "s"}`,
    PDF_LAYOUT.marginX, y);
}

/** Rule, confidentiality note, brand, and "Page x of y" at the bottom of every page. */
function drawFooter(doc: jsPDF, page: number) {
  const width = doc.internal.pageSize.getWidth();
  const y = doc.internal.pageSize.getHeight() - 7;
  doc.setDrawColor(...REPORT_BRAND.mutedRgb).setLineWidth(0.2).line(PDF_LAYOUT.marginX, y - 4, width - PDF_LAYOUT.marginX, y - 4);
  doc.setTextColor(...REPORT_BRAND.mutedRgb).setFont("helvetica", "normal").setFontSize(7);
  doc.text(REPORT_BRAND.confidentiality, PDF_LAYOUT.marginX, y);
  doc.text(REPORT_BRAND.name, width / 2, y, { align: "center" });
  doc.text(`Page ${page} of ${TOTAL_PAGES}`, width - PDF_LAYOUT.marginX, y, { align: "right" });
}

/** "End of report" with the record count, under the last table row. */
function drawEndNote(doc: jsPDF, meta: ReportMeta) {
  const finalY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? PDF_LAYOUT.headerHeight;
  doc.setTextColor(...REPORT_BRAND.mutedRgb).setFont("helvetica", "italic").setFontSize(7.5);
  doc.text(`End of report - ${meta.recordCount} record${meta.recordCount === 1 ? "" : "s"}`, PDF_LAYOUT.marginX, finalY + 6);
}

/** Image cells (QR codes, barcodes) reserve height and are drawn after the cell. */
function sizeImageCell(data: CellHookData, imageColumns: string[]) {
  if (data.section === "body" && imageColumns.includes(String(data.column.dataKey)) && isImage(data.cell.raw)) {
    data.cell.text = [""];
    data.cell.styles.minCellHeight = String(data.column.dataKey).toLowerCase().includes("barcode") ? 10 : 16;
  }
}

function drawImageCell(doc: jsPDF, data: CellHookData, imageColumns: string[]) {
  const value = data.cell.raw;
  if (data.section !== "body" || !imageColumns.includes(String(data.column.dataKey)) || !isImage(value)) return;
  const barcode = String(data.column.dataKey).toLowerCase().includes("barcode");
  const [w, h] = barcode ? [24, 7] : [13, 13];
  const format = value.slice(0, 30).toLowerCase().includes("png") ? "PNG" : "JPEG";
  try {
    doc.addImage(value.replace(/\s+/g, ""), format, data.cell.x + (data.cell.width - w) / 2, data.cell.y + (data.cell.height - h) / 2, w, h);
  } catch {
    doc.setTextColor(185, 28, 28).setFontSize(6).text("image unavailable", data.cell.x + 1.5, data.cell.y + data.cell.height / 2);
  }
}

/** Downloads the records as a branded A4 landscape PDF report. */
export function downloadPdfReport(data: ExportRecord[], fileName: string, imageColumns: string[] = DEFAULT_IMAGE_COLUMNS) {
  if (!data.length) return;
  const meta = buildReportMeta(fileName, data.length);
  const keys = exportKeys(data);
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  doc.setProperties({ title: meta.title, author: meta.generatedBy, creator: REPORT_BRAND.name, subject: `${meta.title} report` });
  // Rows keyed by field so autotable reports each column's field name (image columns are matched by it).
  const body = data.map((row) => Object.fromEntries(keys.map((k) => [k, imageColumns.includes(k) && isImage(row[k]) ? (row[k] as string) : formatValue(row[k])])));
  const columnStyles = Object.fromEntries(keys.filter((k) => imageColumns.includes(k))
    .map((k) => [k, { cellWidth: k.toLowerCase().includes("barcode") ? 30 : 18, halign: "center" as const }]));
  const top = PDF_LAYOUT.headerHeight + 4;

  drawMetaLine(doc, meta);
  autoTable(doc, {
    columns: keys.map((k) => ({ header: formatHeader(k), dataKey: k })),
    body,
    columnStyles,
    rowPageBreak: "avoid",
    startY: top + PDF_LAYOUT.metaHeight,
    margin: { top: top + 2, left: PDF_LAYOUT.marginX, right: PDF_LAYOUT.marginX, bottom: PDF_LAYOUT.footerHeight + 4 },
    theme: "grid",
    styles: { font: "helvetica", fontSize: PDF_LAYOUT.fontSize, cellPadding: 2, overflow: "linebreak", valign: "middle",
      lineColor: [215, 222, 234], lineWidth: 0.15, textColor: [30, 41, 59] },
    headStyles: { fillColor: REPORT_BRAND.primaryRgb, textColor: 255, fontStyle: "bold", halign: "left" },
    alternateRowStyles: { fillColor: REPORT_BRAND.zebraRgb },
    showHead: "everyPage",
    didParseCell: (cell) => {
      sizeImageCell(cell, imageColumns);
      if (cell.section === "body" && typeof cell.cell.raw === "string" && NUMERIC.test(cell.cell.raw)) cell.cell.styles.halign = "right";
    },
    didDrawCell: (cell) => drawImageCell(doc, cell, imageColumns),
    didDrawPage: (page) => {
      drawLetterhead(doc, meta);
      drawFooter(doc, page.pageNumber);
    },
  });

  drawEndNote(doc, meta);
  doc.putTotalPages(TOTAL_PAGES);
  doc.save(reportFileName(fileName, "pdf", meta.generatedAt));
}

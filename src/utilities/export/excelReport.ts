import ExcelJS from "exceljs";
import { EXCEL_HEADER_ROWS, EXCEL_MAX_COLUMN_WIDTH, EXCEL_MIN_COLUMN_WIDTH, REPORT_BRAND } from "@/constants/export/reportTemplate";
import type { ExportRecord } from "@/interfaces/common/ExportRecord";
import { buildReportMeta, displayLength, excelFormat, excelValue, exportKeys, formatHeader, formatStamp, reportFileName, saveBlob } from "./exportFormat";

const XLSX_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const thin = { style: "thin" as const, color: { argb: REPORT_BRAND.borderArgb } };
const BORDER = { top: thin, left: thin, bottom: thin, right: thin };
const HEADER_FILL = { type: "pattern" as const, pattern: "solid" as const, fgColor: { argb: REPORT_BRAND.primaryArgb } };
const ZEBRA_FILL = { type: "pattern" as const, pattern: "solid" as const, fgColor: { argb: REPORT_BRAND.zebraArgb } };

/** Excel sheet names: at most 31 characters, none of \ / ? * [ ] : */
const sheetName = (title: string) => title.replace(/[\\/?*[\]:]/g, " ").slice(0, 31) || "Report";

function newWorkbook(author: string) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = author;
  workbook.company = REPORT_BRAND.name;
  workbook.created = new Date();
  return workbook;
}

/** Column widths follow the longest value, within limits. */
function fitColumns(sheet: ExcelJS.Worksheet, headers: string[], rows: (string | number | Date)[][]) {
  headers.forEach((header, i) => {
    const longest = Math.max(header.length, ...rows.map((r) => displayLength(r[i] ?? "")));
    sheet.getColumn(i + 1).width = Math.min(EXCEL_MAX_COLUMN_WIDTH, Math.max(EXCEL_MIN_COLUMN_WIDTH, longest + 3));
  });
}

function styleHeaderRow(row: ExcelJS.Row) {
  row.height = 22;
  row.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = HEADER_FILL;
    cell.border = BORDER;
    cell.alignment = { vertical: "middle", horizontal: "left" };
  });
}

/** Downloads the records as a branded Excel report: letterhead rows, frozen filterable header, typed cells. */
export async function downloadExcelReport(data: ExportRecord[], fileName: string) {
  if (!data.length) return;
  const meta = buildReportMeta(fileName, data.length);
  const keys = exportKeys(data);
  const headers = keys.map(formatHeader);
  const rows = data.map((record) => keys.map((k) => excelValue(record[k])));
  const workbook = newWorkbook(meta.generatedBy);
  const sheet = workbook.addWorksheet(sheetName(meta.title), {
    views: [{ state: "frozen", ySplit: EXCEL_HEADER_ROWS + 1 }],
    pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0, paperSize: 9 },
    headerFooter: { oddFooter: `&L${REPORT_BRAND.confidentiality}&C${REPORT_BRAND.name}&RPage &P of &N` },
  });
  const lastColumn = Math.max(keys.length, 1);

  sheet.mergeCells(1, 1, 1, lastColumn);
  sheet.getCell(1, 1).value = REPORT_BRAND.name;
  sheet.getCell(1, 1).font = { bold: true, size: 16, color: { argb: REPORT_BRAND.primaryArgb } };
  sheet.mergeCells(2, 1, 2, lastColumn);
  sheet.getCell(2, 1).value = meta.title;
  sheet.getCell(2, 1).font = { bold: true, size: 13 };
  sheet.mergeCells(3, 1, 3, lastColumn);
  sheet.getCell(3, 1).value = `Generated ${formatStamp(meta.generatedAt)}  |  By ${meta.generatedBy}  |  ${meta.recordCount} records`;
  sheet.getCell(3, 1).font = { size: 9, color: { argb: "FF64748B" } };

  const headerRow = sheet.getRow(EXCEL_HEADER_ROWS + 1);
  headerRow.values = headers;
  styleHeaderRow(headerRow);
  rows.forEach((values, index) => {
    const row = sheet.addRow(values);
    row.eachCell({ includeEmpty: true }, (cell, column) => {
      cell.border = BORDER;
      cell.alignment = { vertical: "top", wrapText: true, horizontal: typeof cell.value === "number" ? "right" : "left" };
      const format = excelFormat(data[index][keys[column - 1]], values[column - 1]);
      if (format) cell.numFmt = format;
      if (index % 2 === 1) cell.fill = ZEBRA_FILL;
    });
  });
  sheet.autoFilter = { from: { row: EXCEL_HEADER_ROWS + 1, column: 1 }, to: { row: EXCEL_HEADER_ROWS + 1, column: lastColumn } };
  fitColumns(sheet, headers, rows);

  saveBlob(new Blob([await workbook.xlsx.writeBuffer()], { type: XLSX_TYPE }), reportFileName(fileName, "xlsx", meta.generatedAt));
}

/**
 * Downloads an import template: column names in row 1 exactly as the importer reads them (nothing above
 * them), and an Instructions sheet after it. The server reads the first sheet only.
 */
export async function downloadImportTemplate(columns: string[], fileName: string, instructions?: string) {
  const meta = buildReportMeta(fileName, 0);
  const workbook = newWorkbook(meta.generatedBy);
  const sheet = workbook.addWorksheet("Import", { views: [{ state: "frozen", ySplit: 1 }] });
  styleHeaderRow(sheet.addRow(columns));
  columns.forEach((c, i) => { sheet.getColumn(i + 1).width = Math.max(EXCEL_MIN_COLUMN_WIDTH + 4, c.length + 6); });

  const help = workbook.addWorksheet("Instructions");
  help.getColumn(1).width = 100;
  help.addRow([REPORT_BRAND.name]).font = { bold: true, size: 16, color: { argb: REPORT_BRAND.primaryArgb } };
  help.addRow([meta.title]).font = { bold: true, size: 13 };
  help.addRow([]);
  [
    "Fill one row per record on the Import sheet. Keep the column names in row 1 unchanged.",
    instructions ?? `Columns: ${columns.join(", ")}.`,
    "Mobile numbers start with + and the country code, for example +97339990001.",
    "Rows with errors are reported back after upload; the other rows are still imported.",
  ].forEach((line) => { help.addRow([line]).alignment = { wrapText: true }; });

  saveBlob(new Blob([await workbook.xlsx.writeBuffer()], { type: XLSX_TYPE }), reportFileName(fileName, "xlsx", meta.generatedAt));
}

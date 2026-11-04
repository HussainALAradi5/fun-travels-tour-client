/** Brand and layout values shared by every exported PDF and Excel file. */
export const REPORT_BRAND = {
  name: "Fun Travels Tour",
  tagline: "Travel agency management platform",
  confidentiality: "Confidential - for internal use only",
  /** Navy used for the letterhead and table header (RGB and ARGB forms). */
  primaryRgb: [30, 58, 138] as [number, number, number],
  primaryArgb: "FF1E3A8A",
  accentRgb: [37, 99, 235] as [number, number, number],
  zebraRgb: [243, 246, 252] as [number, number, number],
  zebraArgb: "FFF3F6FC",
  borderArgb: "FFD7DEEA",
  mutedRgb: [100, 116, 139] as [number, number, number],
} as const;

/** Fields never exported: identifiers, secrets, audit columns, images that are not codes, and nested lists. */
export const HIDDEN_EXPORT_KEYS = new Set([
  "id", "password", "token", "secret", "updatedat", "createdby", "updatedby", "flagpngurl", "flagsvgurl",
  "tickets", "reservations", "reservation", "availablemeals", "selectedmeals", "seats", "profileimageurl",
  "base64image", "seatconfig",
]);

/** Columns holding QR codes and barcodes as data URLs; the PDF draws them as images. */
export const DEFAULT_IMAGE_COLUMNS = ["qrCode", "barcode"];

/** Page layout of the PDF report, in millimetres (A4 landscape). */
export const PDF_LAYOUT = {
  marginX: 10,
  headerHeight: 22,
  metaHeight: 10,
  footerHeight: 12,
  fontSize: 8,
} as const;

/** Rows above the table in the Excel report: brand, title, meta line, spacer. */
export const EXCEL_HEADER_ROWS = 4;
export const EXCEL_MAX_COLUMN_WIDTH = 50;
export const EXCEL_MIN_COLUMN_WIDTH = 12;

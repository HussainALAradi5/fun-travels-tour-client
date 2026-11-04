import type { ExportRecord } from "./ExportRecord";

/** Any value a record may hold in an export. */
export type ExportValue = string | number | boolean | null | undefined | ExportRecord | ExportRecord[];

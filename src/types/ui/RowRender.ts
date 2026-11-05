import type { ReactNode } from "react";

/** Column render hooks as DataTable passes them to its rows, typed loosely so any row shape fits. */
export type RowRender = Array<{ key?: string; type?: string; render?: (row: Record<string, unknown>) => ReactNode }>;

import type { NamedRecord } from "@/interfaces/common/NamedRecord";
import type { SelectOption } from "@/interfaces/common/SelectOption";


/** Country or city records as select options. */
export const toNamedOptions = (items: NamedRecord[] | unknown): SelectOption[] =>
  (Array.isArray(items) ? (items as NamedRecord[]) : []).map((item) => ({
    label: item.name || item.officialName || item.famousName || `Unknown (ID: ${item.id})`,
    value: String(item.id),
  }));

/** `{ id }` reference from a select value, or undefined when nothing is selected. */
export const toReference = (value?: string | number | null) => {
  const id = Number(value);
  return value !== "" && value != null && Number.isFinite(id) && id > 0 ? { id } : undefined;
};

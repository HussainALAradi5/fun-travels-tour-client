export const formatCatalogDate = (dateStr?: string) =>
  dateStr ? new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "TBD";

export const formatPrice = (value?: number | null) => `$${(value ?? 0).toFixed(2)}`;

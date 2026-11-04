import type { Tour } from "@/interfaces/tour/Tour";

export interface CustomerTourCatalogTableProps {
  tours: Tour[];
  isAuthenticated: boolean;
  loading?: boolean;
}

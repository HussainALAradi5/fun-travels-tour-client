import type { Tour } from "@/interface/tour/Tour";

export interface CustomerTourCatalogTableProps {
  tours: Tour[];
  isAuthenticated: boolean;
  loading?: boolean;
}

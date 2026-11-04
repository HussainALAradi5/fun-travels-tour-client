import { DataTable } from "@/components/ui/custom/DataTable";
import { CATALOG_EXPORT_NAME } from "@/constants/tour/catalog";
import { useCustomerTourColumns } from "@/hooks/tour-management/useCustomerTourColumns";
import type { CustomerTourCatalogTableProps } from "@/interfaces/props/tour/CustomerTourCatalogTableProps";

export const CustomerTourCatalogTable = ({ tours, isAuthenticated, loading }: CustomerTourCatalogTableProps) => {
  const columns = useCustomerTourColumns(isAuthenticated);
  return (
    <DataTable data={tours} columns={columns} loading={loading} searchDisabled colorPalette="blue"
      exportFileName={CATALOG_EXPORT_NAME} enableExport />
  );
};

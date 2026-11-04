import { Box } from "@chakra-ui/react";
import { useTransportationColumns } from "@/hooks/tour-management/useTransportationColumns";
import type { Transportation } from "@/interfaces/tour/Transportation";
import type { TransportationTableProps } from "@/interfaces/props/tour/TransportationTableProps";
import { DataTable } from "../../ui/custom/DataTable";
import { ReportType } from "@/enums/report/ReportType";

export const TransportationTable = ({ data, loading, onEdit, onView }: TransportationTableProps) => {
  const columns = useTransportationColumns(onView, onEdit);
  return (
    <Box p={1} bg="bg.panel" borderRadius="3xl" border="1px solid" borderColor="border.subtle" shadow="xl" overflow="hidden">
      <DataTable<Transportation> data={data} loading={loading} enableExport exportFileName="Fleet_Inventory"
        report={{ type: ReportType.TRANSPORTATIONS }} searchDisabled columns={columns} />
    </Box>
  );
};

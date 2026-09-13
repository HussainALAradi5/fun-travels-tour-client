import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "@/lib/navigation";
import { Stack, useDisclosure } from "@chakra-ui/react";
import { TransportationHeader } from "./Transportation/TransportationHeader";
import { TransportationTable } from "./Transportation/TransportationTable";
import { TransportationEditDialog } from "./Transportation/TransportationEditDialog";
import { useTourManagement } from "@/hooks/tourManagement/useTourManagement";
import type { Transportation } from "@/interface/tour/Transportation";
import { ExcelImportDialog } from "@/components/ui/Custom/Dialogs/ExcelImportDialog";
import { transportationService } from "@/Api/tourmanagement/Transportation";

export const TransportationManager = () => {
  const navigate = useNavigate();
  const { open, onOpen, onClose } = useDisclosure();
  const importDialog = useDisclosure();

  const {
    transportation: list,
    isLoading,
    isMutating,
    fetchTransportation,
    handleUpdateTransportation
  } = useTourManagement();

  const [selectedItem, setSelectedItem] = useState<Transportation | null>(null);
  const [filters, setFilters] = useState({
    type: "ALL",
    status: "ALL",
    globalSearch: ""
  });

  const filteredList = useMemo(() => (list || []).filter(t => t?.id), [list]);

  const loadData = useCallback(() => {
    fetchTransportation({
      type: filters.type === "ALL" ? undefined : filters.type as string,
      unitStatus: filters.status === "ALL" ? undefined : filters.status as string,
      keyword: filters.globalSearch || undefined,
    } as Record<string, string | number | boolean>);
  }, [filters, fetchTransportation]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleUpdate = async (values: Transportation | Record<string, unknown>) => {
    if (selectedItem?.id) {
      await handleUpdateTransportation(selectedItem.id, values as Transportation);
      loadData();
      onClose();
    }
  };

  return (
    <Stack gap={8} animation="fade-in 0.5s ease-out">
      <TransportationHeader
        count={filteredList.length}
        searchValue={filters.globalSearch}
        onSearch={(val) => setFilters(p => ({ ...p, globalSearch: val }))}

        typeFilterValue={filters.type}
        statusFilterValue={filters.status}
        onTypeFilterChange={(val) => setFilters(p => ({ ...p, type: val }))}
        onStatusFilterChange={(val) => setFilters(p => ({ ...p, status: val }))}

        onAdd={() => navigate("/admin/transports/create")}
        onImport={importDialog.onOpen}
        onReset={() => setFilters({ type: "ALL", status: "ALL", globalSearch: "" })}
      />

      <ExcelImportDialog
        open={importDialog.open}
        onClose={importDialog.onClose}
        title="Import transportation units"
        description="Each valid row creates one unit and its complete seat inventory on the server."
        columns={[
          "transportationNumber", "code", "type", "providerName", "totalCapacity",
          "agencyId", "branchId (optional)", "premiumSeats", "accessibleSeats", "kidsSeats",
        ]}
        onImport={transportationService.importExcel}
        onCompleted={loadData}
      />

      <TransportationTable
        data={filteredList}
        loading={isLoading}
        onEdit={(item) => { setSelectedItem(item); onOpen(); }}
        onView={(id) => navigate(`/admin/transports/${id}`)}
      />

      <TransportationEditDialog
        open={open}
        onClose={onClose}
        transport={selectedItem}
        onUpdate={handleUpdate}
        loading={isMutating}
      />
    </Stack>
  );
};

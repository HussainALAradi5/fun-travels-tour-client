import { Box, Center, Spinner, VStack } from "@chakra-ui/react";
import { LayoutGrid } from "lucide-react";
import { AppDialog } from "@/components/ui/custom/dialogs/AppDialog";
import { useSeatManager } from "@/hooks/tour-management/useSeatManager";
import type { SeatManagerProps } from "@/interfaces/props/tour/SeatManagerProps";
import { SeatEditDialog } from "./SeatEditDialog";
import { SeatManagerHeader } from "./SeatManagerHeader";
import { SeatManagerTable } from "./SeatManagerTable";
import { SeatSummaryCard } from "./SeatSummaryCard";

export const SeatManager = ({ transportId }: SeatManagerProps) => {
  const s = useSeatManager(transportId);
  if (s.isLoading && s.seats.length === 0) return <Center p={10}><Spinner size="xl" color="blue.500" /></Center>;
  return (
    <>
      <SeatSummaryCard totalSeats={s.seats.length} totals={s.totals} onManage={() => s.setIsTableOpen(true)} />
      <AppDialog open={s.isTableOpen} onClose={() => s.setIsTableOpen(false)} title="Seating Management"
        description="Search, filter, and modify seat details for this unit." icon={LayoutGrid} size="xl" colorPalette="blue">
        <VStack w="full" align="stretch" gap={5} mt={2}>
          <SeatManagerHeader count={s.filteredSeats.length} searchValue={s.search} onSearch={s.setSearch}
            typeFilterValue={s.filterType} onTypeFilterChange={s.setFilterType} statusFilterValue={s.filterStatus}
            onStatusFilterChange={s.setFilterStatus} onReset={s.resetFilters} totals={s.totals} totalSeats={s.seats.length} />
          <Box borderWidth="1px" borderColor="border.subtle" borderRadius="2xl" overflow="hidden" shadow="sm" bg="bg.panel">
            <SeatManagerTable data={s.filteredSeats} loading={s.isLoading} onEdit={s.edit} />
          </Box>
        </VStack>
      </AppDialog>
      <SeatEditDialog open={!!s.editingSeat} onClose={s.closeEditor} seat={s.editingSeat} onSave={s.save} loading={s.isMutating} />
    </>
  );
};

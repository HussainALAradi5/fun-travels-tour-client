import { useState, useEffect, useMemo } from "react";
import {
  VStack,
  HStack,
  Text,
  Button,
  Box,
  SimpleGrid,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { Armchair, LayoutGrid } from "lucide-react";

import { useTourManagement } from "@/hooks/tourManagement/useTourManagement";
import { ChairTypeColor } from "@/enums/tourmanagement/ChairType";
import type { ChairType } from "@/enums/tourmanagement/ChairType";
import { typedEntries } from "@/utilities/ObjectUtils";
import type { Seat } from "@/interface/tour/Seat";

import { AppDialog } from "@/components/ui/Custom/Dialogs/AppDialog";
import { SeatEditDialog } from "./SeatEditDialog";
import { SeatManagerHeader } from "./SeatManagerHeader";
import { SeatManagerTable } from "./SeatManagerTable";

export const SeatManager = ({ transportId }: { transportId: number }) => {
  const { seats, fetchSeats, isLoading, isMutating, handleUpdateSeat } =
    useTourManagement();
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [editingSeat, setEditingSeat] = useState<Seat | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    if (transportId) fetchSeats(transportId);
  }, [transportId, fetchSeats]);
  const totals = useMemo(() => {
    return seats.reduce(
      (acc, seat) => {
        acc[seat.chairType] = (acc[seat.chairType] || 0) + 1;
        return acc;
      },
      {} as Partial<Record<ChairType, number>>,
    );
  }, [seats]);
  const filteredSeats = useMemo(() => {
    return seats.filter((seat) => {
      const matchesSearch = seat.seatCode
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = filterType === "ALL" || seat.chairType === filterType;
      const matchesStatus =
        filterStatus === "ALL" || seat.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [seats, search, filterType, filterStatus]);

  const handleSave = async (updatedSeat: Seat) => {
    if (!updatedSeat.id) return;
    await handleUpdateSeat(updatedSeat.id, updatedSeat, transportId);
    setEditingSeat(null);
    setIsTableOpen(true);
  };

  const handleEdit = (seat: Seat) => {
    setIsTableOpen(false);
    setEditingSeat(seat);
  };

  const handleCloseEditor = () => {
    setEditingSeat(null);
    setIsTableOpen(true);
  };

  const handleResetFilters = () => {
    setSearch("");
    setFilterType("ALL");
    setFilterStatus("ALL");
  };

  if (isLoading && seats.length === 0) {
    return (
      <Center p={10}>
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <>
<Box
        w="full"
        bg="bg.panel"
        p={6}
        borderRadius="3xl"
        border="1px solid"
        borderColor="border.subtle"
        shadow="sm"
      >
        <HStack justify="space-between" flexWrap="wrap" gap={4}>
          <HStack gap={4}>
            <Box p={3} bg="blue.500/10" color="blue.500" borderRadius="xl">
              <LayoutGrid size={24} />
            </Box>
            <VStack align="start" gap={0}>
              <Text fontWeight="black" fontSize="lg">
                Fleet Seating Configured
              </Text>
              <Text fontSize="sm" color="fg.muted">
                {seats.length} total seats available in this unit.
              </Text>
            </VStack>
          </HStack>

          <Button
            colorPalette="blue"
            size="lg"
            borderRadius="full"
            onClick={() => setIsTableOpen(true)}
            _hover={{ transform: "translateY(-2px)" }}
            transition="all 0.2s"
          >
            <Armchair size={18} style={{ marginRight: "8px" }} /> Manage Layout
            & Config
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} mt={6}>
          {typedEntries(totals).map(([type, count]) => (
            <Box
              key={type}
              p={3}
              borderRadius="2xl"
              bg="bg.muted"
              border="1px solid"
              borderColor="border.subtle"
            >
              <Text
                fontSize="2xs"
                fontWeight="black"
                color="fg.muted"
                letterSpacing="widest"
                mb={1}
                textTransform="uppercase"
              >
                {type.replace("_", " ")}
              </Text>
              <Text
                fontSize="xl"
                fontWeight="black"
                color={`${ChairTypeColor[type]}.500`}
              >
                {count}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
<AppDialog
        open={isTableOpen}
        onClose={() => setIsTableOpen(false)}
        title="Seating Management"
        description="Search, filter, and modify seat details for this unit."
        icon={LayoutGrid}
        size="xl"
        colorPalette="blue"
      >
        <VStack w="full" align="stretch" gap={5} mt={2}>
<SeatManagerHeader
            count={filteredSeats.length}
            searchValue={search}
            onSearch={setSearch}
            typeFilterValue={filterType}
            onTypeFilterChange={setFilterType}
            statusFilterValue={filterStatus}
            onStatusFilterChange={setFilterStatus}
            onReset={handleResetFilters}
            totals={totals}
            totalSeats={seats.length}
          />
<Box
            borderWidth="1px"
            borderColor="border.subtle"
            borderRadius="2xl"
            overflow="hidden"
            shadow="sm"
            bg="bg.panel"
          >
            <SeatManagerTable
              data={filteredSeats}
              loading={isLoading}
              onEdit={handleEdit}
            />
          </Box>
        </VStack>
      </AppDialog>
      <SeatEditDialog
        open={!!editingSeat}
        onClose={handleCloseEditor}
        seat={editingSeat}
        onSave={handleSave}
        loading={isMutating}
      />
    </>
  );
};



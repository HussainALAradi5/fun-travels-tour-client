import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "@/lib/navigation";
import { Box, Stack } from "@chakra-ui/react";
import { useTourManagement } from "@/hooks/tourManagement/useTourManagement";
import { floatIn } from "@/utilities/Animations";
import { TourInventoryStats } from "./TourInventory/TourInventoryStats";
import { TourInventoryHeader } from "./TourInventory/TourInventoryHeader";
import { TourInventoryTable } from "./TourInventory/TourInventoryTable";
import { PageWrapper } from "@/components/ui/Custom/PageWrapper";

export const TourInventoryManager = () => {
  const { tours, isLoading, fetchTours } = useTourManagement();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string[]>(["ALL"]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const filteredTours = useMemo(() => {
    const activeVal = statusFilter[0];
    return activeVal === "ALL"
      ? tours
      : tours.filter((t) => t.status === activeVal);
  }, [tours, statusFilter]);

  return (
    <Box animation={`${floatIn} 0.5s ease-out`}>
      <PageWrapper
        title="Tour Inventory Management"
        subtitle="Operational intelligence for your travel resource allocation."
        imageUrl="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
        showAction={false}
      >
        <Stack gap={8}>
          <TourInventoryStats tours={tours} />
<TourInventoryHeader
            statusFilter={statusFilter}
            onFilterChange={setStatusFilter}
            onCreateClick={() => navigate("/admin/tours/create")}
          />

          <TourInventoryTable
            data={filteredTours}
            isLoading={isLoading}
            onViewDetails={(id) => navigate(`/admin/tours/${id}`)}
          />
        </Stack>
      </PageWrapper>
    </Box>
  );
};

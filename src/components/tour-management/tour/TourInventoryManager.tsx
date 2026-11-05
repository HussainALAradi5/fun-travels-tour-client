import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "@/lib/navigation";
import { Box, Stack } from "@chakra-ui/react";
import { useTourManagement } from "@/hooks/tour-management/useTourManagement";
import { floatIn } from "@/utilities/Animations";
import { TourInventoryStats } from "./tour-inventory/TourInventoryStats";
import { TourInventoryHeader } from "./tour-inventory/TourInventoryHeader";
import { TourInventoryTable } from "./tour-inventory/TourInventoryTable";
import { PageWrapper } from "@/components/ui/custom/PageWrapper";
import { IMAGES } from "@/constants/ui/images";

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
        imageUrl={IMAGES.tourAdmin}
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

import { MetricBox } from "@/components/ui/Custom/GlowComponents";
import { GenericStatus } from "@/enums/GenericStatus";
import type { TourStatsProps } from "@/interface";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { LayoutDashboard, CheckCircle, AlertTriangle } from "lucide-react";

export const TourInventoryStats = ({ tours }: TourStatsProps) => {
  const activeCount = tours.filter((t) => t.status === GenericStatus.ACTIVE).length;
  const criticalCount = tours.filter((t) => (t.availableSlots || 0) < 5).length;

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
      <MetricBox icon={LayoutDashboard} color="blue.500" label="Total Assets">
        <Text fontSize="3xl" fontWeight="black" letterSpacing="tight">{tours.length}</Text>
        <Text fontSize="xs" color="fg.muted">Registered packages</Text>
      </MetricBox>

      <MetricBox icon={CheckCircle} color="green.500" label="Active Tours">
        <Text fontSize="3xl" fontWeight="black" letterSpacing="tight">{activeCount}</Text>
        <Text fontSize="xs" color="fg.muted">Currently bookable</Text>
      </MetricBox>

      <MetricBox icon={AlertTriangle} color="orange.500" label="Critical Capacity">
        <Text fontSize="3xl" fontWeight="black" letterSpacing="tight">{criticalCount}</Text>
        <Text fontSize="xs" color="fg.muted">Less than 5 seats left</Text>
      </MetricBox>
    </SimpleGrid>
  );
};

import { SimpleGrid, Heading } from "@chakra-ui/react";
import { DollarSign, Users, Calendar, Ticket as TicketIcon } from "lucide-react";
import { MetricBox } from "@/components/ui/Custom/GlowComponents";
import type { Tour } from "@/interface";

interface TourMetricsProps {
  tour: Tour;
  bookedCount: number;
}

export const TourMetrics = ({ tour, bookedCount }: TourMetricsProps) => {
  const expectedRevenue = (tour.basePrice || 0) * bookedCount;

  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} gap="4">
      <MetricBox icon={DollarSign} color="blue.500" label="Expected Revenue">
        <Heading size="lg">${expectedRevenue.toLocaleString()}</Heading>
      </MetricBox>
      <MetricBox icon={Users} color="green.500" label="Availability">
        <Heading size="lg">{tour.availableSlots}/{tour.maxCapacity}</Heading>
      </MetricBox>
      <MetricBox icon={Calendar} color="purple.500" label="Timeline">
        <Heading size="lg">{tour.numberOfDays} Days</Heading>
      </MetricBox>
      <MetricBox icon={TicketIcon} color="orange.500" label="Bookings">
        <Heading size="lg">{bookedCount} Tickets</Heading>
      </MetricBox>
    </SimpleGrid>
  );
};

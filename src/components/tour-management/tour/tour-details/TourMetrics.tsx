import { SimpleGrid, Heading } from "@chakra-ui/react";
import { DollarSign, Users, Calendar, Ticket as TicketIcon } from "lucide-react";
import { MetricBox } from "@/components/ui/custom/GlowComponents";
import type { TourMetricsProps } from "@/interfaces/props/tour/TourMetricsProps";
import { formatCurrency } from "@/utilities/formatHelper";
import { TicketStatus } from "@/enums/tour-management/TicketStatus";

export const TourMetrics = ({ tour, tickets }: TourMetricsProps) => {
  // Cancelled tickets free their seat and are refunded, so they count toward neither figure.
  const live = tickets.filter((t) => t.ticketStatus !== TicketStatus.CANCELLED);
  const bookedCount = live.length;
  const expectedRevenue = live.reduce((sum, t) => sum + (t.totalPrice || 0), 0);

  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} gap="4">
      <MetricBox icon={DollarSign} color="blue.500" label="Expected Revenue">
        <Heading size="lg">{formatCurrency(expectedRevenue)}</Heading>
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


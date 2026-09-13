import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { BookOpen } from "lucide-react";
import { useNavigate } from "@/lib/navigation";
import { ticketService } from "@/Api/tourmanagement/Ticket";
import type { Ticket } from "@/interface/tour/Ticket";
import { useUser } from "@/hooks/User/useUser";
import { TicketTable } from "./TicketTable";
import { notify } from "@/components/ui/Custom/GenericNotification";
import { DateSortFilter } from "@/components/ui/Custom/DateSortFilter";
import type { DateSortFilterValue } from "@/interface/props/ui/DateSortFilterProps";
import type { TicketSortField } from "@/interface/tour/TicketFilterParams";
import { GuidedStepsDialog } from "@/components/ui/Custom/Dialogs/GuidedStepsDialog";
import { customerTicketGuide } from "@/constants/ticket/customerTicketGuide";

export const CustomerTicketsManager = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<DateSortFilterValue<TicketSortField>>({
    sortBy: "bookingDate",
    sortDir: "desc",
  });

  useEffect(() => {
    if (!user?.id) return;
    ticketService.search({ customerId: user.id, size: 100, ...filter })
      .then((res) => setTickets(res.content))
      .catch(() => notify({ title: "Failed to load tickets", type: "error" }))
      .finally(() => setLoading(false));
  }, [filter, user?.id]);

  return (
    <Box>
      <Flex justify="flex-end" mb={4}>
        <GuidedStepsDialog
          title="How to use your ticket"
          description="Follow these steps for a smooth check-in and boarding experience."
          triggerLabel="Ticket guide"
          triggerIcon={BookOpen}
          steps={customerTicketGuide}
          finalMessage="Open a booking to view its current status, boarding details, and available actions."
        />
      </Flex>
      <DateSortFilter
        value={filter}
        onChange={(nextFilter) => {
          setLoading(true);
          setFilter(nextFilter);
        }}
        dateLabel="booking date"
        sortOptions={[
          { label: "Booking date", value: "bookingDate" },
          { label: "Travel start", value: "startDate" },
          { label: "Travel end", value: "endDate" },
          { label: "Total price", value: "totalPrice" },
        ]}
      />
      <TicketTable
        tickets={tickets}
        isLoading={loading}
        onView={(id) => navigate(`/my-bookings/${id}`)}
      />
    </Box>
  );
};


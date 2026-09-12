import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "@/lib/navigation";
import { ticketService } from "@/Api/tourmanagement/Ticket";
import type { Ticket } from "@/interface/tour/Ticket";
import { useUser } from "@/hooks/User/useUser";
import { TicketTable } from "./TicketTable";
import { notify } from "@/components/ui/Custom/GenericNotification";
import { DateSortFilter } from "@/components/ui/Custom/DateSortFilter";
import type { DateSortFilterValue } from "@/interface/props/ui/DateSortFilterProps";
import type { TicketSortField } from "@/interface/tour/TicketFilterParams";

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


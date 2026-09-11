import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ticketService } from "@/Api/tourmanagement/Ticket";
import type { Ticket } from "@/interface/tour/Ticket";
import { useUser } from "@/hooks/User/useUser";
import { TicketTable } from "./TicketTable";
import { notify } from "@/components/ui/Custom/GenericNotification";

export const CustomerTicketsManager = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    ticketService.filter({ customerId: user.id })
      .then((res) => setTickets(Array.isArray(res) ? res : []))
      .catch(() => notify({ title: "Failed to load tickets", type: "error" }))
      .finally(() => setLoading(false));
  }, [user?.id]);

  return (
    <Box>
      <TicketTable
        tickets={tickets}
        isLoading={loading}
        onView={(id) => navigate(`/my-bookings/${id}`)}
      />
    </Box>
  );
};


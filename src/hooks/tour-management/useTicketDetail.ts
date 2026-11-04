import { useCallback, useEffect, useMemo, useState } from "react";
import { ticketService } from "@/services/tour-management/ticketService";
import { tourService } from "@/services/tour-management/tourService";
import type { Ticket } from "@/interfaces/tour/Ticket";
import type { Tour } from "@/interfaces/tour/Tour";
import { TicketStatus } from "@/enums/tour-management/TicketStatus";
import { GenericStatus } from "@/enums/GenericStatus";

/**
 * A ticket and its full tour. The ticket only carries a tour summary (number, title, dates), so the
 * route, countries, vehicle, and tour status for the boarding pass come from the tour itself.
 */
export function useTicketDetail(id: string | undefined) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!id) return;
    try {
      const loaded = await ticketService.getById(Number(id));
      setTicket(loaded);
      if (loaded.tour?.id) setTour(await tourService.getById(loaded.tour.id));
    } catch (err) {
      console.error("Failed to load ticket:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const { isCancelled, isCompleted } = useMemo(() => ({
    isCancelled: ticket?.ticketStatus === TicketStatus.CANCELLED,
    isCompleted: ticket?.ticketStatus === TicketStatus.COMPLETED || tour?.status === GenericStatus.COMPLETED,
  }), [ticket, tour]);

  return { ticket, tour, loading, refresh, isCancelled, isCompleted };
}

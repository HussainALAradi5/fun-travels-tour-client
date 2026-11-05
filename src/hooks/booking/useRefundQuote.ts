import { useEffect, useState } from "react";
import type { RefundQuoteResponseDto } from "@/dtos/tour-management/RefundQuoteResponseDto";
import { ticketService } from "@/services/tour-management/ticketService";

/** The refund a ticket would get if cancelled now; loaded when the cancel dialog opens. */
export function useRefundQuote(ticketId: number | undefined, open: boolean) {
  const [quote, setQuote] = useState<RefundQuoteResponseDto | null>(null);
  useEffect(() => {
    if (!open || !ticketId) return;
    let active = true;
    ticketService.refundQuote(ticketId).then((q) => active && setQuote(q)).catch(() => active && setQuote(null));
    return () => { active = false; };
  }, [ticketId, open]);
  return quote;
}

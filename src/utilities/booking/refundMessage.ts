import type { RefundQuoteResponseDto } from "@/dtos/tour-management/RefundQuoteResponseDto";

/** One sentence the customer reads before confirming a cancellation. */
export function refundMessage(quote: RefundQuoteResponseDto | null): string {
  if (!quote) return "Checking how much you would get back...";
  const days = quote.daysUntilTour === 1 ? "1 day" : `${quote.daysUntilTour} days`;
  if (Number(quote.refund) <= 0) {
    return `The tour starts in ${days}, so cancelling now refunds nothing (${quote.reason}). Your seat will be released.`;
  }
  return `Cancel now and $${Number(quote.refund).toFixed(2)} of $${Number(quote.paid).toFixed(2)} (${quote.percent}%) returns to your wallet. `
    + `The tour starts in ${days}. Your seat will be released.`;
}

import { CheckCircle, CreditCard, MapPin, Navigation, ShieldCheck, XCircle } from "lucide-react";
import type { JourneySteps } from "@/interfaces/booking/JourneySteps";
import type { Ticket } from "@/interfaces/tour/Ticket";
import type { Tour } from "@/interfaces/tour/Tour";

const DONE = { color: "green.500", glowColor: "rgba(34, 197, 94, 0.4)" };
const NOW = { color: "blue.500", glowColor: "rgba(59, 130, 246, 0.45)" };
const LATER = { color: "gray.300", glowColor: "transparent" };
const DAY_MS = 86_400_000;

const dayText = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "date to be set");

/** Steps follow the real state: paid, the tour running, the departure date, and completion. */
export function journeySteps(ticket: Ticket, tour: Tour | null): JourneySteps {
  if (ticket.ticketStatus === "CANCELLED") {
    return {
      next: "This ticket is cancelled. Any refund went to your wallet; see Wallet for the details.",
      items: [{ id: "cancelled", title: "Cancelled", description: "The seat was released.", icon: XCircle, color: "red.500" }],
    };
  }
  const start = tour?.startDate ?? ticket.tour?.startDate;
  const daysLeft = start ? Math.ceil((new Date(start).getTime() - Date.now()) / DAY_MS) : null;
  const completed = ticket.ticketStatus === "COMPLETED" || tour?.status === "COMPLETED";
  const departed = completed || (daysLeft !== null && daysLeft <= 0);
  const running = tour?.status === "ACTIVE" || departed;
  const paid = Boolean(ticket.paid);
  const state = (done: boolean, current: boolean) => (done ? DONE : current ? NOW : LATER);
  const items = [
    { id: "booked", title: "Booked", description: `On ${dayText(ticket.bookingDate)}`, icon: CheckCircle, ...DONE },
    { id: "paid", title: paid ? "Paid" : "Waiting for payment", description: paid ? "Paid from your wallet" : "Pay within 15 minutes to keep your seat",
      icon: CreditCard, ...state(paid, !paid) },
    { id: "tour", title: "Tour confirmed by the agency", description: running ? "The tour is running as planned" : "The agency is preparing the tour",
      icon: ShieldCheck, ...state(running, paid && !running) },
    { id: "departure", title: "Departure", description: `${tour?.startCity?.name ?? "Departure point"} on ${dayText(start)}`,
      icon: Navigation, ...state(departed, running && !departed) },
    { id: "home", title: "Back home", description: tour?.endCity?.name ?? "Final destination", icon: MapPin, ...state(completed, departed && !completed) },
  ];
  const next = !paid ? "Next: pay for this booking before the hold expires, or the seat is released."
    : completed ? "Your trip is complete. We hope you enjoyed it!"
    : departed ? "Enjoy your trip! Show the boarding pass when asked."
    : daysLeft !== null ? `Next: departure in ${daysLeft} day${daysLeft === 1 ? "" : "s"}. Keep your boarding pass ready.`
    : "Next: the agency will share the departure details.";
  return { items, next };
}

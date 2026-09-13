import {
  CalendarSearch,
  CheckCircle2,
  CreditCard,
  ListChecks,
  Search,
  TicketCheck,
  Users,
} from "lucide-react";
import type { GuideStep } from "@/interface/common/GuideStep";

export const customerTourGuide: GuideStep[] = [
  {
    id: "find-tour",
    title: "Find the right tour",
    description: "Search by destination and use the travel-date filters to narrow the available tours.",
    icon: Search,
  },
  {
    id: "review-tour",
    title: "Review the tour details",
    description: "Check the itinerary, departure and return dates, price, capacity, transportation, and included services.",
    icon: CalendarSearch,
    note: "Availability can change while other customers complete their reservations.",
  },
  {
    id: "travellers",
    title: "Add the travellers",
    description: "Enter accurate traveller details and select the available seats and meal options for each guest.",
    icon: Users,
  },
  {
    id: "confirm",
    title: "Confirm your selections",
    description: "Review traveller names, selected inventory, dates, and the final price before continuing.",
    icon: ListChecks,
  },
  {
    id: "payment",
    title: "Complete payment",
    description: "Choose an available payment method and wait for the confirmation before leaving checkout.",
    icon: CreditCard,
    note: "Do not submit payment more than once while a transaction is processing.",
  },
  {
    id: "ticket",
    title: "Open your ticket",
    description: "After confirmation, find the booking in My Expeditions and follow its ticket instructions.",
    icon: TicketCheck,
  },
  {
    id: "updates",
    title: "Watch for updates",
    description: "Check your notifications for schedule, meeting-point, transportation, or booking-status changes.",
    icon: CheckCircle2,
  },
];

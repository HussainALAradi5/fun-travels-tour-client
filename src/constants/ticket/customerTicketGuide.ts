import { CalendarCheck, CircleHelp, Clock3, MapPin, QrCode, ShieldCheck } from "lucide-react";
import type { GuideStep } from "@/interface/common/GuideStep";

export const customerTicketGuide: GuideStep[] = [
  {
    id: "verify",
    title: "Check your ticket details",
    description: "Confirm the traveler name, tour date, departure city, selected seat, and meal choices.",
    icon: CalendarCheck,
    note: "Contact support before departure if any traveler information is incorrect.",
  },
  {
    id: "prepare",
    title: "Prepare your documents",
    description: "Bring the identification or travel document used for the reservation.",
    icon: ShieldCheck,
  },
  {
    id: "arrive",
    title: "Arrive before departure",
    description: "Go to the meeting point early enough for verification, baggage handling, and boarding.",
    icon: Clock3,
    note: "We recommend arriving at least 30 minutes early unless your tour states otherwise.",
  },
  {
    id: "check-in",
    title: "Present your QR code",
    description: "Open this ticket and show the QR code to the tour representative during check-in.",
    icon: QrCode,
    note: "Keep the brightness high and avoid sharing screenshots publicly.",
  },
  {
    id: "board",
    title: "Confirm the vehicle and seat",
    description: "Follow the representative's directions and use the transportation and seat shown on your ticket.",
    icon: MapPin,
  },
  {
    id: "help",
    title: "Need help or need to cancel?",
    description: "Use the ticket actions before the cancellation deadline or contact support for assistance.",
    icon: CircleHelp,
  },
];

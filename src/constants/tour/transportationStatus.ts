import { AlertTriangle, CheckCircle2, CircleSlash, Gauge, Wrench, type LucideIcon } from "lucide-react";
import { TransportationStatus } from "@/enums/tour-management/TransportationStatus";

export const TRANSPORTATION_STATUS_DISPLAY: Record<TransportationStatus, { color: string; icon: LucideIcon; label: string }> = {
  [TransportationStatus.AVAILABLE]: { color: "green", icon: CheckCircle2, label: "Available" },
  [TransportationStatus.PARTIAL]: { color: "yellow", icon: Gauge, label: "Partial" },
  [TransportationStatus.FULL]: { color: "orange", icon: AlertTriangle, label: "At Capacity" },
  [TransportationStatus.MAINTENANCE]: { color: "red", icon: Wrench, label: "Maintenance" },
  [TransportationStatus.INACTIVE]: { color: "gray", icon: CircleSlash, label: "Inactive" },
};

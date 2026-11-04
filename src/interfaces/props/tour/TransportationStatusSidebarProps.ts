import type { Transportation } from "@/interfaces/tour/Transportation";
import type { TransportationStatus } from "@/enums/tour-management/TransportationStatus";

export interface TransportationStatusSidebarProps {
  transport: Transportation;
  onStatusChange: (status: TransportationStatus) => Promise<void>;
}

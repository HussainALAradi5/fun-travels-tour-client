import type { Transportation } from "@/interface/tour/Transportation";
import type { TransportationStatus } from "@/enums/tourmanagement/TransportationStatus";

export interface TransportationStatusSidebarProps {
  transport: Transportation;
  onStatusChange: (status: TransportationStatus) => Promise<void>;
}

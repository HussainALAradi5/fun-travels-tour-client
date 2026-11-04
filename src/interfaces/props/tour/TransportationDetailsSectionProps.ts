import type { TransportationStatus } from "@/enums/tour-management/TransportationStatus";
import type { Transportation } from "../../tour/Transportation";

export interface TransportationDetailsSectionProps {
  id?: string;
  transport: Transportation | null;
  themeColor: string;
  onStatusChange?: (status: TransportationStatus) => Promise<void>;
}

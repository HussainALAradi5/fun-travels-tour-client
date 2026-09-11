import type { Transportation } from "../../tour/Transportation";
import type { GenericStatus } from "../../../enums/GenericStatus";

export interface TransportationStatusSidebarProps {
  transportation: Transportation;
  onStatusChange: (status: GenericStatus) => void;
}

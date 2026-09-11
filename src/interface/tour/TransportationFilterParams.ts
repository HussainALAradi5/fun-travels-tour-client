import type { GenericStatus } from "@/enums/GenericStatus";
import type { TransportationStatus } from "@/enums/tourmanagement/TransportationStatus";
import type { TransportationType } from "@/enums/tourmanagement/TransportationType";
import type { GenericFilterParams } from "@/interface/common/GenericFilterParams";

export interface TransportationFilterParams extends GenericFilterParams<string, GenericStatus> {
  type?: TransportationType;
  unitStatus?: TransportationStatus;
  keyword?: string;
}

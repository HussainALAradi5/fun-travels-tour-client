import type { ChairType } from "@/enums/tourmanagement/ChirType";
import type { SeatStatus } from "@/enums/tourmanagement/SeatStatus";
import type { GenericFilterParams } from "@/interface/common/GenericFilterParams";

export interface SeatFilterParams extends GenericFilterParams<string, SeatStatus> {
  transportId: number;
  chairType?: ChairType;
  keyword?: string;
}

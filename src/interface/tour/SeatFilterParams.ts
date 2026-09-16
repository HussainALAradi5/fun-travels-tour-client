import type { ChairType } from "@/enums/tourmanagement/ChairType";
import type { SeatStatus } from "@/enums/tourmanagement/SeatStatus";
import type { FilterInterface } from "@/interface/common/FilterInterface";

export interface SeatFilterParams extends FilterInterface {
  status?: SeatStatus;
  transportId: number;
  chairType?: ChairType;
  keyword?: string;
}

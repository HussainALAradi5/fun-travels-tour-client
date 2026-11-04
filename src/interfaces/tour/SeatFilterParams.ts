import type { ChairType } from "@/enums/tour-management/ChairType";
import type { SeatStatus } from "@/enums/tour-management/SeatStatus";
import type { FilterInterface } from "@/interfaces/common/FilterInterface";

export interface SeatFilterParams extends FilterInterface {
  status?: SeatStatus;
  transportId: number;
  /** Report availability for this tour instead of the vehicle's physical status. */
  tourId?: number;
  chairType?: ChairType;
  keyword?: string;
}

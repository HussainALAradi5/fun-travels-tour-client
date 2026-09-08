import type { ChairType } from '../../enums/tourmanagement/ChirType';
import type { SeatStatus } from '../../enums/tourmanagement/SeatStatus';

export interface SeatResponse {
  id: number;
  seatCode: string;
  chairType: ChairType;
  status: SeatStatus;
  seatPriceModifier?: number;
}

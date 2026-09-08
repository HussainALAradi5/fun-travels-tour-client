import type { ChairType } from '../../enums/tourmanagement/ChirType';
import type { SeatStatus } from '../../enums/tourmanagement/SeatStatus';

export interface Seat {
  id?: number;
  seatCode: string;
  chairType: ChairType;
  status: SeatStatus;
  seatPriceModifier: number;
  transportation?: { id?: number };
  ticket?: { id?: number };
}

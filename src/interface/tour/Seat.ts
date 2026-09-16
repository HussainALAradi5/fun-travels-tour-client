import type { ChairType } from '../../enums/tourmanagement/ChairType';
import type { SeatStatus } from '../../enums/tourmanagement/SeatStatus';
import type { Transportation } from './Transportation';
import type { Ticket } from './Ticket';

export interface Seat {
  id?: number;
  seatCode: string;
  chairType: ChairType;
  status: SeatStatus;
  seatPriceModifier: number;
  transportation?: Partial<Transportation>;
  ticket?: Partial<Ticket>;
}

import type { ChairType } from '../../enums/tour-management/ChairType';
import type { SeatStatus } from '../../enums/tour-management/SeatStatus';
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

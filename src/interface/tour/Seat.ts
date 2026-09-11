import type { ChairType } from '../../enums/tourmanagement/ChirType';
import type { SeatStatus } from '../../enums/tourmanagement/SeatStatus';
import type { EntityReference } from '../common/EntityReference';

export interface Seat {
  id?: number;
  seatCode: string;
  chairType: ChairType;
  status: SeatStatus;
  seatPriceModifier: number;
  transportation?: Partial<EntityReference>;
  ticket?: Partial<EntityReference>;
}

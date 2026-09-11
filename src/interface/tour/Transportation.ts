import type { TransportationType } from '../../enums/tourmanagement/TransportationType';
import type { TransportationStatus } from '../../enums/tourmanagement/TransportationStatus';
import type { GenericStatus } from '../../enums/GenericStatus';
import type { Seat } from './Seat';
import type { Tour } from './Tour';
import type { Agency } from '../agency/Agency';

export interface Transportation {
  id?: number;
  transportationNumber: string;
  code: string;
  type: TransportationType;
  providerName: string;
  status: GenericStatus;
  totalCapacity: number;
  remainingSeats?: number;
  calculatedAvailable?: number;
  agency?: Partial<Agency>;
  tours?: Tour[];
  seats: Seat[];
  unitStatus?: TransportationStatus;
  seatConfig?: Record<string, number>;
}

export const DEFAULT_TRANSPORTATION: Partial<Transportation> = {
  transportationNumber: "",
  code: "",
  type: "BUS" as TransportationType,
  providerName: "",
  status: "ACTIVE" as GenericStatus,
  totalCapacity: 0,
  seats: [],
  unitStatus: "AVAILABLE" as TransportationStatus,
};

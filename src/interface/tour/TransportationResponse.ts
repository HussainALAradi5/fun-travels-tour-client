import type { TransportationStatus } from '../../enums/tourmanagement/TransportationStatus';
import type { TransportationType } from '../../enums/tourmanagement/TransportationType';
import type { GenericStatus } from '../../enums/GenericStatus';
import type { Seat } from './Seat';

export interface TransportationResponse {
  id: number;
  transportationNumber: string;
  code?: string;
  type: TransportationType;
  providerName?: string;
  status: GenericStatus;
  unitStatus?: TransportationStatus;
  totalCapacity: number;
  remainingSeats?: number;
  calculatedAvailable?: number;
  seats?: Seat[];
}

export const DEFAULT_TRANSPORTATION_RESPONSE: Partial<TransportationResponse> = {
  transportationNumber: "",
  type: "BUS",
  totalCapacity: 0,
  status: "ACTIVE",
};


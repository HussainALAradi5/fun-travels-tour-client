import type { TransportationType } from '../../enums/tourmanagement/TransportationType';
import type { TransportationStatus } from '../../enums/tourmanagement/TransportationStatus';
import type { GenericStatus } from '../../enums/GenericStatus';

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
  seats?: { id: number; seatCode: string; chairType?: string; status?: string }[];
}

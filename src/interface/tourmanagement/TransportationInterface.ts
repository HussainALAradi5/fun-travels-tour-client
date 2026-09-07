import { TransportationType } from "@/enums/tourmanagement/TransportationType";
import { GenericStatus } from "@/enums/GenericStatus";
import type { Seat } from "./SeatInterface";
import { TransportationStatus } from "@/enums/tourmanagement/TransportationStatus";
import type { Tour } from "./TourInterface";
import type { Agency } from "../Agency/AgencyInterface";

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
  agency?: Agency;
  tours?: Tour[];
  seats: Seat[];
  unitStatus?: TransportationStatus;
  seatConfig?: Record<string, number>;
}


export const DEFAULT_TRANSPORTATION: Partial<Transportation> = {
  transportationNumber: "",
  code: "",
  type: TransportationType.BUS,
  providerName: "",
  totalCapacity: 0,
  status: GenericStatus.PENDING,
  unitStatus: TransportationStatus.AVAILABLE,
  seats: [],
};
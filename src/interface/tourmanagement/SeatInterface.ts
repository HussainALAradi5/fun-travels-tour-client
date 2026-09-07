import { ChairType } from "@/enums/tourmanagement/ChirType";
import { SeatStatus } from "@/enums/tourmanagement/SeatStatus";
import type { Transportation } from "./TransportationInterface";
import type { Ticket } from "./TicketInterface";

export interface Seat {
  id?: number;
  seatCode: string;
  chairType: ChairType;
  status: SeatStatus;
  seatPriceModifier: number;
  transportation?: Transportation; // Added mapping
  ticket?: Ticket; // Added mapping
}



export const DEFAULT_SEAT: Partial<Seat> = {
  seatCode: "",
  chairType: ChairType.STANDARD,
  status: SeatStatus.AVAILABLE,
  seatPriceModifier: 0,
};

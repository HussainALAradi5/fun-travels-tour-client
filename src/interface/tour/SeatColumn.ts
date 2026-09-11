export interface SeatColumn {
  id: number;
  seatNumber: string;
  seatType: string;
  seatStatus: string;
  deckLevel: string;
  rowPosition: number;
  columnPosition: number;
  transportationId: number;
  passengerName?: string;
  passengerEmail?: string;
}

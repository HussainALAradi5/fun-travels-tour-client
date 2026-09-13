import type { TransportationType } from "@/enums/tourmanagement/TransportationType";

export interface TransportationCreateRequest extends Record<string, unknown> {
  transportationNumber: string;
  code: string;
  type: TransportationType;
  providerName: string;
  totalCapacity: number;
  agencyId: number;
  branchId?: number;
  seatConfig?: Record<string, number>;
}

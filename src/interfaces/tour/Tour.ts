import type { TourResponseDto } from "@/dtos/tour-management/TourResponseDto";
import type { GenericStatus } from "@/enums/GenericStatus";

/** Tour as the server sends it; the shape is generated from the server DTO. */
export type Tour = TourResponseDto;

export const DEFAULT_TOUR: Partial<Tour> = {
  tourNumber: "",
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  maxCapacity: 0,
  availableSlots: 0,
  status: "PENDING" as GenericStatus,
  hasTransportation: false,
  basePrice: 0,
  discountPrice: 0,
};

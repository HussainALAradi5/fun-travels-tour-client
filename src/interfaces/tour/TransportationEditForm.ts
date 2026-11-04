import type { Transportation } from "./Transportation";
import type { TransportationUpdateRequestDto } from "@/dtos/tour-management/TransportationUpdateRequestDto";

/** Vehicle edit form: the vehicle plus the number of seats of each special chair type. */
export type TransportationEditForm = Transportation & Required<Pick<TransportationUpdateRequestDto, "seatConfig">>;

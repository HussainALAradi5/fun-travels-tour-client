import type { Transportation } from "@/interface/tour/Transportation";

export type TransportationFormValues = Transportation & {
  transportationName: string;
  transportationCapacity: number;
  transportationType: string;
  transportationDescription: string;
};

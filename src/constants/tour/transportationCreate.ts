import type { TransportationFormValues } from "@/types/tour/TransportationFormValues";

export const FLEET_PATH = "/admin/transports";

export const TRANSPORTATION_INITIAL_VALUES: TransportationFormValues = {
  code: "",
  transportationNumber: "",
  providerName: "",
  type: "" as TransportationFormValues["type"],
  totalCapacity: 0,
  agencyId: 0,
  seatConfig: { PREMIUM_RECLINER: 0, WHEELCHAIR_ACCESSIBLE: 0, KIDS_CHAIR: 0 },
};

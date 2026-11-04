import { Bus, Car, Plane, Ship, type LucideIcon } from "lucide-react";
import { TransportationType } from "@/enums/tour-management/TransportationType";

export const VEHICLE_ICONS: Partial<Record<TransportationType, LucideIcon>> = {
  [TransportationType.BUS]: Bus,
  [TransportationType.FLIGHT]: Plane,
  [TransportationType.FERRY]: Ship,
  [TransportationType.PRIVATE_CAR]: Car,
};
export const DEFAULT_VEHICLE_ICON = Bus;

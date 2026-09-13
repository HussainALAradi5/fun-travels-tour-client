import { BusFront, CarFront, Plane, Sailboat, Ship, TrainFront } from "lucide-react";
import { TransportationType } from "@/enums/tourmanagement/TransportationType";
import type { SelectOption } from "@/interface/common/SelectOption";

export const transportationTypeOptions: SelectOption[] = [
  { label: "Bus", value: TransportationType.BUS, icon: BusFront },
  { label: "Flight", value: TransportationType.FLIGHT, icon: Plane },
  { label: "Boat", value: TransportationType.BOAT, icon: Sailboat },
  { label: "Train", value: TransportationType.TRAIN, icon: TrainFront },
  { label: "Private car", value: TransportationType.PRIVATE_CAR, icon: CarFront },
  { label: "Ferry", value: TransportationType.FERRY, icon: Ship },
];

import { DEFAULT_VEHICLE_ICON, VEHICLE_ICONS } from "@/constants/tour/vehicleIcons";
import type { VehicleIconProps } from "@/interfaces/props/tour/VehicleIconProps";

export const VehicleIcon = ({ type, size = 16 }: VehicleIconProps) => {
  const Icon = VEHICLE_ICONS[type] ?? DEFAULT_VEHICLE_ICON;
  return <Icon size={size} />;
};

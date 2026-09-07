import type { PortType } from "@/enums/PortType";
import type { City } from "./CityInterface";
import type { Country } from "./CountryInterface";
import type { GenericStatus } from "@/enums/GenericStatus";

export interface Port {
  id?: number;
  portName: string;
  portCode: string;
  portType: PortType;
  city?: City;
  country?: Country;
  latitude?: number;
  longitude?: number;
  status: GenericStatus;
}

export const DEFAULT_PORT: Partial<Port> = {
  portName: "",
  portCode: "",
  latitude: 0.0,
  longitude: 0.0,
};

export interface PortTableProps {
  data: Port[];
  isLoading: boolean;
  onEdit: (id: number) => void;
}
import type { City } from './City';
import type { Country } from './Country';
import type { PortType } from '../../enums/PortType';
import type { GenericStatus } from '../../enums/GenericStatus';

export interface PortResponse {
  id: number;
  portName: string;
  portCode: string;
  portType: PortType;
  city?: Partial<City>;
  country?: Partial<Country>;
  latitude?: number;
  longitude?: number;
  status: GenericStatus;
}

export const DEFAULT_PORT_RESPONSE: Partial<PortResponse> = {
  portName: "",
  portCode: "",
  portType: "AIRPORT" as PortType,
  status: "ACTIVE" as GenericStatus,
};

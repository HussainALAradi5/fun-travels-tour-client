import type { PortType } from '../../enums/PortType';
import type { GenericStatus } from '../../enums/GenericStatus';
import type { City } from './City';
import type { Country } from './Country';

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

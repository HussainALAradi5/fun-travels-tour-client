import type { PortType } from '../../enums/PortType';
import type { GenericStatus } from '../../enums/GenericStatus';
import type { City } from './CityInterface';
import type { Country } from './CountryInterface';

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

export interface PortResponse {
  id: number;
  portName: string;
  portCode: string;
  portType: PortType;
  city?: { id: number; name: string };
  country?: { id: number; famousName: string };
  latitude?: number;
  longitude?: number;
  status: GenericStatus;
}

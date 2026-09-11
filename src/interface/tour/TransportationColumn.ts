export interface TransportationColumn {
  id: number;
  transportationName: string;
  transportationType: string;
  transportationCapacity: number;
  transportationDescription: string;
  transportationStatus: string;
  agencyId: number;
  agencyName?: string;
}

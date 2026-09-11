export interface AgencyPayload {
  agencyName: string;
  agencyEmail: string;
  agencyPhone: string;
  agencyDescription: string;
  countryId: number | null;
  cityId: number | null;
}

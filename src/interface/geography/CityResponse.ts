export interface CityResponse {
  id: number;
  name: string;
  country?: { id: number; famousName: string };
}

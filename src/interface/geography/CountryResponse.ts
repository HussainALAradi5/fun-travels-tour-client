export interface CountryResponse {
  id: number;
  famousName: string;
  officialName: string;
  countryCode: string;
  flagPngUrl: string;
  flagSvgUrl: string;
  dialCode?: string;
}

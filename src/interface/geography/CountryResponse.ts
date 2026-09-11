export interface CountryResponse {
  id: number;
  famousName: string;
  officialName: string;
  countryCode: string;
  flagPngUrl: string;
  flagSvgUrl: string;
  dialCode?: string;
}

export const DEFAULT_COUNTRY_RESPONSE: Partial<CountryResponse> = {
  famousName: "",
  officialName: "",
  countryCode: "",
  flagPngUrl: "",
  flagSvgUrl: "",
};

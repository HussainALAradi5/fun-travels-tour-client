export interface Country {
  id?: number | null;
  famousName: string;
  officialName: string;
  countryCode: string;
  flagPngUrl: string;
  flagSvgUrl: string;
  dialCode?: string;
  mobileNumberLength?: number | null;
}

export interface CountryResponse {
  id: number;
  famousName: string;
  officialName: string;
  countryCode: string;
  flagPngUrl: string;
  flagSvgUrl: string;
  dialCode?: string;
}

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

export const DEFAULT_COUNTRY: Partial<Country> = {
  famousName: "",
  officialName: "",
  countryCode: "",
  flagPngUrl: "",
  flagSvgUrl: "",
  dialCode: "",
  mobileNumberLength: null,
};

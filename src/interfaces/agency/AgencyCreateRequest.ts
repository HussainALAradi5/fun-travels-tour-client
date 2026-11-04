export interface AgencyCreateRequest {
  agencyName: string;
  address?: string;
  contactNumber?: string;
  ownerMobileNumber?: string;
  countryId?: number;
  cityId?: number;
  agencyOwnerId?: number;
}

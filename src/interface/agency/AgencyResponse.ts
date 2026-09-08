export interface AgencyResponse {
  id: number;
  agencyName: string;
  address?: string;
  contactNumber?: string;
  ownerMobileNumber?: string;
  country?: { id: number; famousName: string };
  city?: { id: number; name: string };
  agencyOwner?: { id: number; name: string; email: string };
  active: boolean;
}

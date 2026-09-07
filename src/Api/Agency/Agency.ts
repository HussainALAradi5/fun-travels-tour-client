import apiClient from "@/config/BaseApi";
import type { Agency } from "@/interface/Agency/AgencyInterface";
import type { User } from "@/interface/UserInterface";
import type { ApiResponse } from "@/utilities/ApiUtility";
import { authUtils } from "@/utilities/AuthUtils";

export const agencyService = {
  // Get all agencies (Admin level)
  getAllAgencies: async () => {
    // Added /api prefix to match @RequestMapping in AgencyController.java
    const response =
      await apiClient.get<ApiResponse<Agency[]>>("agencies");
    return response.data;
  },

  getAgencyById: async (id: string | number) => {
    const response = await apiClient.get<ApiResponse<Agency>>(
      `agencies/${id}`,
    );
    return response.data;
  },

  /**
   * Creates a new agency.
   * Logic matches AgencyController.java: payload.get("agencyName"), payload.get("countryId"), etc.
   */
  createAgency: async (agencyData: any) => {
    const response = await apiClient.post<ApiResponse<Agency>>(
      "agencies",
      agencyData,
    );
    return response.data;
  },

  /**
   * Role-based staff view.
   * Uses the requesterId to let the backend filter if you are an OWNER (your agency)
   * or a MANAGER (your branch).
   */
  getVisibleStaff: async () => {
    const user = authUtils.getUser();
    if (!user || !user.id) throw new Error("User not authenticated");

    const response = await apiClient.get<ApiResponse<User[]>>(
      `agencies/staff-view/${user.id}`,
    );
    return response.data;
  },

  // Direct fetch for specific agency employees
  getEmployeesByAgency: async (agencyId: number) => {
    const response = await apiClient.get<ApiResponse<User[]>>(
      `agencies/${agencyId}/employees`,
    );
    return response.data;
  },
};

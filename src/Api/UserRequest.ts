import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/utilities/ApiUtility";
import type { UserRequest } from "@/interface/UserRequestInterface";
import { UserRequestStatus } from "@/enums/UserRequest/UserRequestStatus";
import { UserRequestType } from "@/enums/UserRequest/UserRequestType";

export const userRequestService = {
  /**
   * Create a new Request (Support or Suggestion)
   */
  create: async (request: UserRequest) => {
    const response = await apiClient.post<ApiResponse<UserRequest>>(
      "/user-requests",
      request,
    );
    return response.data; // Standardized: { success: boolean, message: string, data: T }
  },

  /**
   * Get Requests with Dynamic Filtering
   */
  getRequests: async (params: {
    currentUserId: number;
    status?: UserRequestStatus;
    type?: UserRequestType;
    userIdFilter?: number;
  }) => {
    const queryParams = new URLSearchParams();
    queryParams.append("currentUserId", params.currentUserId.toString());

    if (params.status) queryParams.append("status", params.status);
    if (params.type) queryParams.append("type", params.type);
    if (params.userIdFilter)
      queryParams.append("userIdFilter", params.userIdFilter.toString());

    const response = await apiClient.get<UserRequest[]>(
      `/user-requests?${queryParams.toString()}`,
    );
    return { data: response.data, success: true };
  },

  /**
   * Get a single request by ID
   */
  getById: async (id: number) => {
    const response = await apiClient.get<ApiResponse<UserRequest>>(`/user-requests/${id}`);
    return response.data;
  },

  /**
   * Assign a request to a Support Agent
   */
  assignToAgent: async (requestId: number, agentId: number) => {
    const response = await apiClient.patch<ApiResponse<UserRequest>>(
      `/user-requests/${requestId}/assign/${agentId}`,
    );
    return response.data;
  },

  /**
   * Mark a request as Solved/Completed
   */
  solveRequest: async (requestId: number, solverId: number) => {
    const response = await apiClient.patch<ApiResponse<UserRequest>>(
      `/user-requests/${requestId}/solve/${solverId}`,
    );
    return response.data;
  },

  /**
   * Reject a request
   */
  rejectRequest: async (requestId: number, rejectedById: number) => {
    const response = await apiClient.patch<ApiResponse<UserRequest>>(
      `/user-requests/${requestId}/reject/${rejectedById}`,
    );
    return response.data;
  },

  /**
   * Delete a request
   */
  delete: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/user-requests/${id}`,
    );
    return response.data;
  },

  /** Helpers */
  getMySuggestions: (userId: number) =>
    userRequestService.getRequests({
      currentUserId: userId,
      type: UserRequestType.SUGGESTION,
    }),

  getPendingSupport: (adminId: number) =>
    userRequestService.getRequests({
      currentUserId: adminId,
      status: UserRequestStatus.PENDING,
      type: UserRequestType.SUPPORT,
    }),
};
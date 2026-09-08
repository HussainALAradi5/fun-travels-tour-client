import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { UserRequestResponse } from "@/interface/support/UserRequestResponse";
import type { UserRequest } from "@/interface/support/UserRequest";
import { UserRequestStatus } from "@/enums/UserRequest/UserRequestStatus";
import { UserRequestType } from "@/enums/UserRequest/UserRequestType";

export const userRequestService = {
  create: async (request: Partial<UserRequestResponse>): Promise<UserRequest> => {
    const response = await apiClient.post<ApiResponse<UserRequestResponse>>(
      "/user-requests",
      request,
    );
    return response.data.data as unknown as UserRequest;
  },

  getRequests: async (params: {
    currentUserId: number;
    status?: UserRequestStatus;
    type?: UserRequestType;
    userIdFilter?: number;
  }): Promise<UserRequest[]> => {
    const queryParams = new URLSearchParams();
    queryParams.append("currentUserId", params.currentUserId.toString());

    if (params.status) queryParams.append("status", params.status);
    if (params.type) queryParams.append("type", params.type);
    if (params.userIdFilter)
      queryParams.append("userIdFilter", params.userIdFilter.toString());

    const response = await apiClient.get<ApiResponse<UserRequestResponse[]>>(
      `/user-requests?${queryParams.toString()}`,
    );
    return response.data.data as unknown as UserRequest[];
  },

  getById: async (id: number): Promise<UserRequest> => {
    const response = await apiClient.get<ApiResponse<UserRequestResponse>>(`/user-requests/${id}`);
    return response.data.data as unknown as UserRequest;
  },

  assignToAgent: async (requestId: number, agentId: number): Promise<UserRequest> => {
    const response = await apiClient.patch<ApiResponse<UserRequestResponse>>(
      `/user-requests/${requestId}/assign/${agentId}`,
    );
    return response.data.data as unknown as UserRequest;
  },

  solveRequest: async (requestId: number, solverId: number): Promise<UserRequest> => {
    const response = await apiClient.patch<ApiResponse<UserRequestResponse>>(
      `/user-requests/${requestId}/solve/${solverId}`,
    );
    return response.data.data as unknown as UserRequest;
  },

  rejectRequest: async (requestId: number, rejectedById: number): Promise<UserRequest> => {
    const response = await apiClient.patch<ApiResponse<UserRequestResponse>>(
      `/user-requests/${requestId}/reject/${rejectedById}`,
    );
    return response.data.data as unknown as UserRequest;
  },

  delete: async (id: number): Promise<null> => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/user-requests/${id}`,
    );
    return response.data.data;
  },

  getMySuggestions: (userId: number): Promise<UserRequest[]> =>
    userRequestService.getRequests({
      currentUserId: userId,
      type: UserRequestType.SUGGESTION,
    }),

  getPendingSupport: (adminId: number): Promise<UserRequest[]> =>
    userRequestService.getRequests({
      currentUserId: adminId,
      status: UserRequestStatus.PENDING,
      type: UserRequestType.SUPPORT,
    }),
};

import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { UserRequest } from "@/interface/support/UserRequest";
import { UserRequestStatus } from "@/enums/UserRequest/UserRequestStatus";
import { UserRequestType } from "@/enums/UserRequest/UserRequestType";
import type { UserRequestFilterParams } from "@/interface/support/UserRequestFilterParams";
import type { PageResponse } from "@/interface/common/PageResponse";

export const userRequestService = {
  create: async (request: Partial<UserRequest>): Promise<UserRequest> => {
    const response = await apiClient.post<ApiResponse<UserRequest>>(
      "/user-requests",
      request,
    );
    return response.data.data as unknown as UserRequest;
  },

  getRequests: async (params: UserRequestFilterParams): Promise<PageResponse<UserRequest>> => {
    const queryParams = new URLSearchParams();
    queryParams.append("currentUserId", params.currentUserId.toString());

    if (params.status) queryParams.append("status", params.status);
    if (params.type) queryParams.append("type", params.type);
    if (params.userIdFilter)
      queryParams.append("userIdFilter", params.userIdFilter.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.page !== undefined) queryParams.append("page", params.page.toString());
    if (params.size !== undefined) queryParams.append("size", params.size.toString());
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortDir) queryParams.append("sortDir", params.sortDir);

    const response = await apiClient.get<PageResponse<UserRequest>>(
      `/user-requests?${queryParams.toString()}`,
    );
    return response.data;
  },

  getById: async (id: number): Promise<UserRequest> => {
    const response = await apiClient.get<ApiResponse<UserRequest>>(`/user-requests/${id}`);
    return response.data.data as unknown as UserRequest;
  },

  assignToAgent: async (requestId: number, agentId: number): Promise<UserRequest> => {
    const response = await apiClient.patch<ApiResponse<UserRequest>>(
      `/user-requests/${requestId}/assign/${agentId}`,
    );
    return response.data.data as unknown as UserRequest;
  },

  solveRequest: async (requestId: number, solverId: number): Promise<UserRequest> => {
    const response = await apiClient.patch<ApiResponse<UserRequest>>(
      `/user-requests/${requestId}/solve/${solverId}`,
    );
    return response.data.data as unknown as UserRequest;
  },

  rejectRequest: async (requestId: number, rejectedById: number): Promise<UserRequest> => {
    const response = await apiClient.patch<ApiResponse<UserRequest>>(
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

  getMySuggestions: (userId: number): Promise<PageResponse<UserRequest>> =>
    userRequestService.getRequests({
      currentUserId: userId,
      type: UserRequestType.SUGGESTION,
    }),

  getPendingSupport: (adminId: number): Promise<PageResponse<UserRequest>> =>
    userRequestService.getRequests({
      currentUserId: adminId,
      status: UserRequestStatus.PENDING,
      type: UserRequestType.SUPPORT,
    }),
};

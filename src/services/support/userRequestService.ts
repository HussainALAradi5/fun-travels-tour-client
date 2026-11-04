import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { UserRequest } from "@/interfaces/support/UserRequest";
import { UserRequestStatus } from "@/enums/user-request/UserRequestStatus";
import { UserRequestType } from "@/enums/user-request/UserRequestType";
import type { UserRequestFilterParams } from "@/interfaces/support/UserRequestFilterParams";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import type { UserRequestCreateRequest } from "@/interfaces/support/UserRequestCreateRequest";
import { extractData } from "@/utilities/apiHelper";

export const userRequestService = {
  create: async (request: UserRequestCreateRequest): Promise<UserRequest> => {
    const response = await apiClient.post<ApiResponse<UserRequest>>(
      ENDPOINTS.userRequests.root,
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

    const response = await apiClient.get<ApiResponse<PageResponse<UserRequest>> | PageResponse<UserRequest>>(
      `${ENDPOINTS.userRequests.root}?${queryParams.toString()}`,
    );
    const payload = response.data;
    if ("success" in payload) {
      return extractData(payload);
    }
    return payload;
  },

  getById: async (id: number): Promise<UserRequest> => {
    const response = await apiClient.get<ApiResponse<UserRequest>>(ENDPOINTS.userRequests.byId(id));
    return response.data.data as unknown as UserRequest;
  },

  assignToAgent: async (requestId: number, agentId: number): Promise<UserRequest> => {
    const response = await apiClient.patch<ApiResponse<UserRequest>>(
      ENDPOINTS.userRequests.assign(requestId, agentId),
    );
    return response.data.data as unknown as UserRequest;
  },

  solveRequest: async (requestId: number): Promise<UserRequest> => {
    const response = await apiClient.patch<ApiResponse<UserRequest>>(
      ENDPOINTS.userRequests.solve(requestId),
    );
    return response.data.data as unknown as UserRequest;
  },

  rejectRequest: async (requestId: number): Promise<UserRequest> => {
    const response = await apiClient.patch<ApiResponse<UserRequest>>(
      ENDPOINTS.userRequests.reject(requestId),
    );
    return response.data.data as unknown as UserRequest;
  },

  delete: async (id: number): Promise<null> => {
    const response = await apiClient.delete<ApiResponse<null>>(
      ENDPOINTS.userRequests.byId(id),
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

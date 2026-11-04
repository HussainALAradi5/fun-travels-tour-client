import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { UserRequestResponseDto } from "@/dtos/support/UserRequestResponseDto";
import { UserRequestStatus } from "@/enums/user-request/UserRequestStatus";
import { UserRequestType } from "@/enums/user-request/UserRequestType";
import type { UserRequestFilterParams } from "@/interfaces/support/UserRequestFilterParams";
import type { PageResponseDto } from "@/dtos/common/PageResponseDto";
import type { UserRequestCreateRequestDto } from "@/dtos/support/UserRequestCreateRequestDto";
import { extractData } from "@/utilities/apiHelper";

export const userRequestService = {
  create: async (request: UserRequestCreateRequestDto): Promise<UserRequestResponseDto> => {
    const response = await apiClient.post<ApiResponse<UserRequestResponseDto>>(
      ENDPOINTS.userRequests.root,
      request,
    );
    return response.data.data as unknown as UserRequestResponseDto;
  },

  getRequests: async (params: UserRequestFilterParams): Promise<PageResponseDto<UserRequestResponseDto>> => {
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

    const response = await apiClient.get<ApiResponse<PageResponseDto<UserRequestResponseDto>> | PageResponseDto<UserRequestResponseDto>>(
      `${ENDPOINTS.userRequests.root}?${queryParams.toString()}`,
    );
    const payload = response.data;
    if ("success" in payload) {
      return extractData(payload);
    }
    return payload;
  },

  getById: async (id: number): Promise<UserRequestResponseDto> => {
    const response = await apiClient.get<ApiResponse<UserRequestResponseDto>>(ENDPOINTS.userRequests.byId(id));
    return response.data.data as unknown as UserRequestResponseDto;
  },

  assignToAgent: async (requestId: number, agentId: number): Promise<UserRequestResponseDto> => {
    const response = await apiClient.patch<ApiResponse<UserRequestResponseDto>>(
      ENDPOINTS.userRequests.assign(requestId, agentId),
    );
    return response.data.data as unknown as UserRequestResponseDto;
  },

  solveRequest: async (requestId: number): Promise<UserRequestResponseDto> => {
    const response = await apiClient.patch<ApiResponse<UserRequestResponseDto>>(
      ENDPOINTS.userRequests.solve(requestId),
    );
    return response.data.data as unknown as UserRequestResponseDto;
  },

  rejectRequest: async (requestId: number): Promise<UserRequestResponseDto> => {
    const response = await apiClient.patch<ApiResponse<UserRequestResponseDto>>(
      ENDPOINTS.userRequests.reject(requestId),
    );
    return response.data.data as unknown as UserRequestResponseDto;
  },

  delete: async (id: number): Promise<null> => {
    const response = await apiClient.delete<ApiResponse<null>>(
      ENDPOINTS.userRequests.byId(id),
    );
    return response.data.data;
  },

  getMySuggestions: (userId: number): Promise<PageResponseDto<UserRequestResponseDto>> =>
    userRequestService.getRequests({
      currentUserId: userId,
      type: UserRequestType.SUGGESTION,
    }),

  getPendingSupport: (adminId: number): Promise<PageResponseDto<UserRequestResponseDto>> =>
    userRequestService.getRequests({
      currentUserId: adminId,
      status: UserRequestStatus.PENDING,
      type: UserRequestType.SUPPORT,
    }),
};

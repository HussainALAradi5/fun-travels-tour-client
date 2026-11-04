import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { ProfileResponseDto } from "@/dtos/user/ProfileResponseDto";
import type { UserUpdateRequestDto } from "@/dtos/user/UserUpdateRequestDto";

/** The signed-in user's own profile: identity, agency placement, and wallet in one response. */
export const profileService = {
  getMine: async (): Promise<ProfileResponseDto> => {
    const response = await apiClient.get<ApiResponse<ProfileResponseDto>>(ENDPOINTS.users.myProfile);
    return response.data.data;
  },

  updateMine: async (request: UserUpdateRequestDto): Promise<ProfileResponseDto> => {
    const response = await apiClient.put<ApiResponse<ProfileResponseDto>>(ENDPOINTS.users.myProfile, request);
    return response.data.data;
  },
};

import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import { API_ORIGIN } from "@/config/api.config";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { ImportResultDto } from "@/dtos/common/ImportResultDto";
import type { UserResponseDto } from "@/dtos/user/UserResponseDto";
import type { UserUpdateRequestDto } from "@/dtos/user/UserUpdateRequestDto";
import type { EmployeeCreateRequestDto } from "@/dtos/user/EmployeeCreateRequestDto";
import type { LoginRequestDto } from "@/dtos/auth/LoginRequestDto";
import type { AuthResponseDto } from "@/dtos/auth/AuthResponseDto";
import type { RegisterRequestDto } from "@/dtos/auth/RegisterRequestDto";
import type { PasswordResetConfirmRequestDto } from "@/dtos/auth/PasswordResetConfirmRequestDto";
import { authUtils } from "@/utilities/AuthUtils";

export const userService = {
  login: async (credentials: LoginRequestDto): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await apiClient.post<ApiResponse<AuthResponseDto>>(ENDPOINTS.auth.login, credentials);
    if (response.data.success && response.data.data.token && response.data.data.user) {
      authUtils.saveSession(response.data.data.token, response.data.data.user);
    }
    return response.data;
  },

  register: async (user: RegisterRequestDto): Promise<ApiResponse<UserResponseDto>> => {
    const response = await apiClient.post<ApiResponse<UserResponseDto>>(ENDPOINTS.auth.register, user);
    return response.data;
  },

  getAllUsers: async (): Promise<UserResponseDto[]> => {
    const response = await apiClient.get<ApiResponse<UserResponseDto[]>>(ENDPOINTS.users.root);
    return response.data.data;
  },

  getAgencyEmployees: async (agencyId: number, role?: string): Promise<UserResponseDto[]> => {
    const response = await apiClient.get<ApiResponse<UserResponseDto[]>>(ENDPOINTS.users.byAgency(agencyId), {
      params: role && role !== "ALL" ? { role } : undefined,
    });
    return response.data.data;
  },

  getProfile: async (id: number): Promise<UserResponseDto> => {
    const response = await apiClient.get<ApiResponse<UserResponseDto>>(ENDPOINTS.users.byId(id));
    return response.data.data;
  },

  updateUser: async (id: number, request: UserUpdateRequestDto): Promise<UserResponseDto> => {
    const response = await apiClient.put<ApiResponse<UserResponseDto>>(ENDPOINTS.users.byId(id), request);
    return response.data.data;
  },

  /** The server places the account in the creator's agency unless an admin passes one. */
  addEmployee: async (request: EmployeeCreateRequestDto, agencyId?: number, branchId?: number): Promise<UserResponseDto> => {
    const response = await apiClient.post<ApiResponse<UserResponseDto>>(ENDPOINTS.users.addEmployee, request, {
      params: { agencyId, branchId },
    });
    return response.data.data;
  },

  updateUserPermissions: async (id: number, type: string, branchId?: number): Promise<UserResponseDto> => {
    const response = await apiClient.put<ApiResponse<UserResponseDto>>(ENDPOINTS.users.permissions(id), null, {
      params: { type, branchId },
    });
    return response.data.data;
  },

  deleteUser: async (id: number): Promise<null> => {
    const response = await apiClient.delete<ApiResponse<null>>(ENDPOINTS.users.byId(id));
    return response.data.data;
  },

  getUsersByRole: async (type: string): Promise<UserResponseDto[]> => {
    const response = await apiClient.get<ApiResponse<UserResponseDto[]>>(ENDPOINTS.users.byRole(type));
    return response.data.data;
  },

  getOwners: (): Promise<UserResponseDto[]> => userService.getUsersByRole("OWNER"),
  getEmployees: (): Promise<UserResponseDto[]> => userService.getUsersByRole("EMPLOYEE"),
  getManagers: (): Promise<UserResponseDto[]> => userService.getUsersByRole("MANAGER"),
  getCustomers: (): Promise<UserResponseDto[]> => userService.getUsersByRole("CUSTOMER"),

  bulkImport: async (agencyId: number, file: File): Promise<ImportResultDto> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post<ApiResponse<ImportResultDto>>(ENDPOINTS.users.bulkImport, formData, {
      params: { agencyId },
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  getProfileImageUrl: (imagePath: string | null): string | undefined => {
    if (!imagePath?.trim()) return undefined;
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_ORIGIN}${imagePath}`;
  },

  requestPasswordReset: async (email: string): Promise<string> => {
    const response = await apiClient.post<ApiResponse<string>>(ENDPOINTS.auth.passwordResetRequest, {
      identifier: email,
    });
    return response.data.message;
  },

  confirmPasswordReset: async (request: PasswordResetConfirmRequestDto): Promise<UserResponseDto> => {
    const response = await apiClient.post<ApiResponse<UserResponseDto>>(ENDPOINTS.auth.passwordResetConfirm, request);
    return response.data.data;
  },
};

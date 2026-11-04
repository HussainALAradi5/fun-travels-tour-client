import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import { API_ORIGIN } from "@/config/api.config";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { ImportResult } from "@/interfaces/common/ImportResult";
import type { User } from "@/interfaces/user/User";
import type { UserUpdateRequest } from "@/interfaces/user/UserUpdateRequest";
import type { EmployeeCreateRequest } from "@/interfaces/user/EmployeeCreateRequest";
import type { LoginRequest } from "@/interfaces/auth/LoginRequest";
import type { AuthSession } from "@/interfaces/auth/AuthSession";
import type { RegisterRequest } from "@/interfaces/auth/RegisterRequest";
import type { PasswordResetConfirm } from "@/interfaces/auth/PasswordResetConfirm";
import { authUtils } from "@/utilities/AuthUtils";

export const userService = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<AuthSession>> => {
    const response = await apiClient.post<ApiResponse<AuthSession>>(ENDPOINTS.auth.login, credentials);
    if (response.data.success && response.data.data.token) {
      authUtils.saveSession(response.data.data.token, response.data.data.user);
    }
    return response.data;
  },

  register: async (user: RegisterRequest): Promise<ApiResponse<User>> => {
    const response = await apiClient.post<ApiResponse<User>>(ENDPOINTS.auth.register, user);
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>(ENDPOINTS.users.root);
    return response.data.data;
  },

  getAgencyEmployees: async (agencyId: number, role?: string): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>(ENDPOINTS.users.byAgency(agencyId), {
      params: role && role !== "ALL" ? { role } : undefined,
    });
    return response.data.data;
  },

  getProfile: async (id: number): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(ENDPOINTS.users.byId(id));
    return response.data.data;
  },

  updateUser: async (id: number, request: UserUpdateRequest): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>(ENDPOINTS.users.byId(id), request);
    return response.data.data;
  },

  /** The server places the account in the creator's agency unless an admin passes one. */
  addEmployee: async (request: EmployeeCreateRequest, agencyId?: number, branchId?: number): Promise<User> => {
    const response = await apiClient.post<ApiResponse<User>>(ENDPOINTS.users.addEmployee, request, {
      params: { agencyId, branchId },
    });
    return response.data.data;
  },

  updateUserPermissions: async (id: number, type: string, branchId?: number): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>(ENDPOINTS.users.permissions(id), null, {
      params: { type, branchId },
    });
    return response.data.data;
  },

  deleteUser: async (id: number): Promise<null> => {
    const response = await apiClient.delete<ApiResponse<null>>(ENDPOINTS.users.byId(id));
    return response.data.data;
  },

  getUsersByRole: async (type: string): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>(ENDPOINTS.users.byRole(type));
    return response.data.data;
  },

  getOwners: (): Promise<User[]> => userService.getUsersByRole("OWNER"),
  getEmployees: (): Promise<User[]> => userService.getUsersByRole("EMPLOYEE"),
  getManagers: (): Promise<User[]> => userService.getUsersByRole("MANAGER"),
  getCustomers: (): Promise<User[]> => userService.getUsersByRole("CUSTOMER"),

  bulkImport: async (agencyId: number, file: File): Promise<ImportResult> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post<ApiResponse<ImportResult>>(ENDPOINTS.users.bulkImport, formData, {
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

  confirmPasswordReset: async (request: PasswordResetConfirm): Promise<User> => {
    const response = await apiClient.post<ApiResponse<User>>(ENDPOINTS.auth.passwordResetConfirm, request);
    return response.data.data;
  },
};

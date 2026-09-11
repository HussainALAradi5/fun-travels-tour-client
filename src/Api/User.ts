import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { User } from "@/interface/user/User";
import type { LoginRequest } from "@/interface/auth/LoginRequest";
import type { AuthSession } from "@/interface/auth/AuthSession";
import type { RegisterRequest } from "@/interface/auth/RegisterRequest";
import { authUtils } from "@/utilities/AuthUtils";

export const userService = {
  login: async (
    credentials: LoginRequest,
  ): Promise<ApiResponse<AuthSession>> => {
    const response = await apiClient.post<ApiResponse<AuthSession>>(
      "/auth/login",
      credentials,
    );
    if (response.data.success && response.data.data.token) {
      authUtils.saveSession(response.data.data.token, response.data.data.user);
    }
    return response.data;
  },

  register: async (
    user: RegisterRequest,
  ): Promise<ApiResponse<User>> => {
    const response = await apiClient.post<ApiResponse<User>>(
      "/auth/register",
      user,
    );
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>("/users");
    return response.data.data as unknown as User[];
  },

  getAgencyEmployees: async (
    agencyId: number,
    role?: string,
  ): Promise<User[]> => {
    const roleParam = role && role !== "ALL" ? `?role=${role}` : "";
    const response = await apiClient.get<ApiResponse<User[]>>(
      `/users/agency/${agencyId}${roleParam}`,
    );
    return response.data.data as unknown as User[];
  },

  getProfile: async (id: number): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(
      `/users/${id}`,
    );
    return response.data.data as unknown as User;
  },

  updateUser: async (id: number, userDetails: User): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>(
      `/users/${id}`,
      userDetails,
    );
    return response.data.data as unknown as User;
  },

  addEmployee: async (
    user: User,
    requesterType: string,
    agencyId?: number,
    branchId?: number,
  ): Promise<User> => {
    const params = new URLSearchParams();
    params.append("requesterType", requesterType);
    if (agencyId) params.append("agencyId", agencyId.toString());
    if (branchId) params.append("branchId", branchId.toString());

    const response = await apiClient.post<ApiResponse<User>>(
      `/users/add-employee?${params.toString()}`,
      user,
    );
    return response.data.data as unknown as User;
  },

  updateUserPermissions: async (
    id: number,
    type: string,
    branchId?: number,
  ): Promise<User> => {
    const params = new URLSearchParams({ type });
    if (branchId) params.append("branchId", branchId.toString());

    const response = await apiClient.put<ApiResponse<User>>(
      `/users/permissions/${id}?${params.toString()}`,
    );
    return response.data.data as unknown as User;
  },

  deleteUser: async (id: number): Promise<null> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/users/${id}`);
    return response.data.data;
  },

  getUsersByRole: async (type: string): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>(
      `/users/role/${type}`,
    );
    return response.data.data as unknown as User[];
  },

  getOwners: (): Promise<User[]> => userService.getUsersByRole("OWNER"),
  getEmployees: (): Promise<User[]> => userService.getUsersByRole("EMPLOYEE"),
  getManagers: (): Promise<User[]> => userService.getUsersByRole("MANAGER"),
  getCustomers: (): Promise<User[]> => userService.getUsersByRole("CUSTOMER"),

  bulkImport: async (
    agencyId: number,
    file: File,
  ): Promise<{ imported: number; failed: number; errors: string[] }> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<
      ApiResponse<{ imported: number; failed: number; errors: string[] }>
    >(`/users/bulk-import?agencyId=${agencyId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  getProfileImageUrl: (imagePath: string | null): string | undefined => {
    if (!imagePath?.trim()) return undefined;
    if (imagePath.startsWith("http")) return imagePath;
    const backendBase = "http://localhost:8080";
    return `${backendBase}${imagePath}`;
  },

  requestPasswordReset: async (
    identifier: string,
    baseNumber: string,
  ): Promise<string> => {
    const params = new URLSearchParams({ identifier, baseNumber });
    const response = await apiClient.post<ApiResponse<string>>(
      `/users/request-password-reset?${params.toString()}`,
    );
    return response.data.data;
  },

  confirmPasswordReset: async (
    identifier: string,
    baseNumber: string,
    token: string,
    newPassword: string,
  ): Promise<User> => {
    const params = new URLSearchParams({
      identifier,
      baseNumber,
      token,
      newPassword,
    });
    const response = await apiClient.post<ApiResponse<User>>(
      `/users/confirm-password-reset?${params.toString()}`,
    );
    return response.data.data as unknown as User;
  },
};

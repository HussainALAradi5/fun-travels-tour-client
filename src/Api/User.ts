import apiClient from "@/config/BaseApi";
import type { User } from "@/interface/UserInterface";
import type { ApiResponse } from "@/utilities/ApiUtility";
import { authUtils } from "@/utilities/AuthUtils";

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  success: boolean;
  message?: string;
}

export const userService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/login",
        credentials,
      );
      if (response.data && response.data.token) {
        authUtils.saveSession(response.data.token, response.data.user);
      }
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
        token: "",
        user: {} as User,
      };
    }
  },
  register: async (user: User) => {
    const response = await apiClient.post<ApiResponse<User>>(
      "/auth/register",
      user,
    );
    return response.data;
  },

  getAllUsers: async () => {
    const response = await apiClient.get<User[]>("/users");
    return { data: response.data, success: true };
  },
  getAgencyEmployees: async (agencyId: number, role?: string) => {
    const roleParam = role && role !== "ALL" ? `?role=${role}` : "";
    const response = await apiClient.get<User[]>(
      `/users/agency/${agencyId}${roleParam}`,
    );
    return { data: response.data, success: true };
  },

  getProfile: async (id: number) => {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: number, userDetails: User) => {
    const response = await apiClient.put<ApiResponse<User>>(
      `/users/${id}`,
      userDetails,
    );
    return response.data;
  },

  addEmployee: async (
    user: User,
    requesterType: string,
    agencyId?: number,
    branchId?: number,
  ) => {
    const params = new URLSearchParams();
    params.append("requesterType", requesterType);
    if (agencyId) params.append("agencyId", agencyId.toString());
    if (branchId) params.append("branchId", branchId.toString());

    const response = await apiClient.post<ApiResponse<User>>(
      `/users/add-employee?${params.toString()}`,
      user,
    );
    return response.data;
  },

  updateUserPermissions: async (
    id: number,
    type: string,
    branchId?: number,
  ) => {
    const params = new URLSearchParams({ type });
    if (branchId) params.append("branchId", branchId.toString());

    const response = await apiClient.put<ApiResponse<User>>(
      `/users/permissions/${id}?${params.toString()}`,
    );
    return response.data;
  },

  deleteUser: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<null>>(`/users/${id}`);
    return response.data;
  },

  getUsersByRole: async (type: string) => {
    const response = await apiClient.get<User[]>(`/users/role/${type}`);
    return { data: response.data, success: true };
  },

  getOwners: () => userService.getUsersByRole("OWNER"),
  getEmployees: () => userService.getUsersByRole("EMPLOYEE"),
  getManagers: () => userService.getUsersByRole("MANAGER"),
  getCustomers: () => userService.getUsersByRole("CUSTOMER"),

  bulkImport: async (agencyId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<ApiResponse<any>>(
      `/users/bulk-import?agencyId=${agencyId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  getProfileImageUrl: (imagePath: string | null): string => {
    if (!imagePath) return "/default-avatar.png";
    if (imagePath.startsWith("http")) return imagePath;
    const backendBase = "http://localhost:8080";
    return `${backendBase}${imagePath}`;
  },

  requestPasswordReset: async (identifier: string, baseNumber: string) => {
    try {
      const params = new URLSearchParams({ identifier, baseNumber });
      const response = await apiClient.post<ApiResponse<string>>(
        `/users/request-password-reset?${params.toString()}`,
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to send code",
      };
    }
  },

  confirmPasswordReset: async (
    identifier: string,
    baseNumber: string,
    token: string,
    newPassword: string,
  ) => {
    try {
      const params = new URLSearchParams({
        identifier,
        baseNumber,
        token,
        newPassword,
      });
      const response = await apiClient.post<ApiResponse<User>>(
        `/users/confirm-password-reset?${params.toString()}`,
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to reset password",
      };
    }
  },
};

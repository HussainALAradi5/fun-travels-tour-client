import { useState } from "react";
import { useNavigate } from "@/lib/navigation";
import { userService } from "@/Api/User";
import { useAuth } from "@/utilities/AuthContext";
import type { LoginRequest } from "@/interface/auth/LoginRequest";

export function useLogin() {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (values: LoginRequest) => {
    setError(null);
    setLoading(true);
    try {
      const response = await userService.login(values);
      if (response.success) {
        refreshAuth();
        navigate("/profile");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
}

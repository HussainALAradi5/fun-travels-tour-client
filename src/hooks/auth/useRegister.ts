import { useState } from "react";
import { useNavigate } from "@/lib/navigation";
import { userService } from "@/Api/User";
import type { RegisterRequest } from "@/interface/auth/RegisterRequest";

export function useRegister() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async (values: RegisterRequest) => {
    setError(null);
    setLoading(true);
    try {
      const result = await userService.register(values);
      if (result.success) {
        navigate("/login");
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { register, error, loading };
}

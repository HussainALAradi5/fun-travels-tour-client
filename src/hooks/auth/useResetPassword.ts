import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { userService } from "@/services/user/userService";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "@/lib/navigation";
import type { ResetPasswordFormValues } from "@/types/user/ResetPasswordFormValues";

/** Reads the token and email from the reset link and submits the new password. */
export function useResetPassword() {
  const params = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token") ?? "";
  const email = params.get("email") ?? "";

  const submit = useCallback(async (values: ResetPasswordFormValues) => {
    if (values.newPassword !== values.confirmPassword) {
      toaster.create({ title: "Passwords do not match", type: "error" });
      return;
    }
    await userService.confirmPasswordReset({ identifier: email, token, newPassword: values.newPassword });
    toaster.create({ title: "Password updated", description: "Sign in with your new password.", type: "success" });
    navigate("/login");
  }, [email, token, navigate]);

  return { hasLink: Boolean(token && email), email, submit };
}

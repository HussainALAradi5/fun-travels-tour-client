import { AuthShell } from "@/components/user/auth/AuthShell";
import { LoginForm } from "@/components/user/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell title="Welcome Back" subtitle="Login to manage your tours">
      <LoginForm />
    </AuthShell>
  );
}
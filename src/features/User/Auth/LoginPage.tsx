import { AuthShell } from "@/components/User/Auth/AuthShell";
import { LoginForm } from "@/components/User/Auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell title="Welcome Back" subtitle="Login to manage your tours">
      <LoginForm />
    </AuthShell>
  );
}
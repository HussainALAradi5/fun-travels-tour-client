import { AuthShell } from "@/components/user/auth/AuthShell";
import { RegisterForm } from "@/components/user/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create Account"
      subtitle="Join Fun Travel today"
      maxWidth="lg"
    >
      <RegisterForm />
    </AuthShell>
  );
}

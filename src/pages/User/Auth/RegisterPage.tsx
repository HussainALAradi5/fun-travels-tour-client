import { AuthShell } from "@/components/User/Auth/AuthShell";
import { RegisterForm } from "@/components/User/Auth/RegisterForm";

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

import { Link as RouterLink } from "@/lib/navigation";
import { Text, Link as ChakraLink } from "@chakra-ui/react";
import { DynamicForm } from "@/components/ui/Custom/DynamicForm";
import type { RegisterRequest } from "@/interface/auth/RegisterRequest";
import { DEFAULT_USER } from "@/interface/user/User";
import type { FieldConfig } from "@/interface/common/FieldConfig";
import { useRegister } from "@/hooks/auth/useRegister";

const registerFields: FieldConfig<RegisterRequest>[] = [
  { name: "name", label: "Full Name", type: "text", isRequired: true, gridSpan: 1 },
  { name: "userName", label: "Username", type: "text", isRequired: true, gridSpan: 1 },
  { name: "email", label: "Email", type: "email", isRequired: true, gridSpan: 2 },
  { name: "password", label: "Password", type: "password", isRequired: true, gridSpan: 2 },
  { name: "mobileNumber", label: "Mobile Number", type: "text", isRequired: true, gridSpan: 2 },
  { name: "age", label: "Age", type: "number", gridSpan: 1 },
];

const defaultValues: RegisterRequest = {
  userName: DEFAULT_USER.userName,
  name: DEFAULT_USER.name,
  email: DEFAULT_USER.email,
  password: "",
  mobileNumber: DEFAULT_USER.mobileNumber,
  age: DEFAULT_USER.age,
};

export const RegisterForm = () => {
  const { register, error, loading } = useRegister();

  return (
    <>
      {error && (
        <div style={{ marginBottom: 16, padding: 12, backgroundColor: "#fed7d7", borderRadius: 8 }}>
          <Text color="red.800">{error}</Text>
        </div>
      )}

      <DynamicForm<RegisterRequest>
        fields={registerFields}
        initialValues={defaultValues}
        onSubmit={register}
        submitLabel={loading ? "Creating Account..." : "Create Account"}
        columns={2}
      />
      <Text textAlign="center" fontSize="sm" mt={4}>
        Already have an account?{" "}
        <ChakraLink asChild color="blue.500" fontWeight="bold">
          <RouterLink to="/login">Login</RouterLink>
        </ChakraLink>
      </Text>
    </>
  );
};



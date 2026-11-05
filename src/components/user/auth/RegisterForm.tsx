import { Link as RouterLink } from "@/lib/navigation";
import { Text, Link as ChakraLink } from "@chakra-ui/react";
import { DynamicForm } from "@/components/ui/custom/DynamicForm";
import type { RegisterRequestDto } from "@/dtos/auth/RegisterRequestDto";
import type { FieldConfig } from "@/interfaces/common/FieldConfig";
import { useRegister } from "@/hooks/auth/useRegister";

const registerFields: FieldConfig<RegisterRequestDto>[] = [
  { name: "name", label: "Full Name", type: "text", isRequired: true, gridSpan: 1 },
  { name: "userName", label: "Username", type: "text", isRequired: true, gridSpan: 1 },
  { name: "email", label: "Email", type: "email", isRequired: true, gridSpan: 2 },
  { name: "password", label: "Password", type: "password", isRequired: true, gridSpan: 2 },
  { name: "gender", label: "Gender", type: "gender", isRequired: true, gridSpan: 2 },
  { name: "mobileNumber", label: "Mobile Number", type: "mobile", isRequired: true, gridSpan: 2 },
  { name: "age", label: "Age", type: "number", gridSpan: 1 },
];

// Gender starts unchosen; the form requires it before submitting.
const defaultValues = { userName: "", name: "", email: "", password: "", mobileNumber: "", age: 0 } as RegisterRequestDto;

export const RegisterForm = () => {
  const { register, error, loading } = useRegister();

  return (
    <>
      {error && (
        <div style={{ marginBottom: 16, padding: 12, backgroundColor: "#fed7d7", borderRadius: 8 }}>
          <Text color="red.800">{error}</Text>
        </div>
      )}

      <DynamicForm<RegisterRequestDto>
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



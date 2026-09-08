import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Text, Link as ChakraLink } from "@chakra-ui/react";
import { userService } from "@/Api/User";
import { GenericForm } from "@/components/ui/Custom/GenericForm";
import type { RegisterRequest } from "@/interface";
import type { FieldConfig } from "@/utilities/FormTypes";

const DEFAULT_REGISTER: RegisterRequest = {
  userName: "",
  name: "",
  email: "",
  password: "",
  mobileNumber: "",
  age: 0,
};

const registerFields: FieldConfig<RegisterRequest>[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    isRequired: true,
    gridSpan: 1,
  },
  {
    name: "userName",
    label: "Username",
    type: "text",
    isRequired: true,
    gridSpan: 1,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    isRequired: true,
    gridSpan: 2,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    isRequired: true,
    gridSpan: 2,
  },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    type: "text",
    isRequired: true,
    gridSpan: 2,
  },
  { name: "age", label: "Age", type: "number", gridSpan: 1 },
];

export const RegisterForm = () => {
  const navigate = useNavigate();

  const handleRegister = async (values: RegisterRequest) => {
    const result = await userService.register(values);
    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <>
      <GenericForm<RegisterRequest>
        fields={registerFields}
        initialValues={DEFAULT_REGISTER}
        onSubmit={handleRegister}
        submitLabel="Create Account"
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

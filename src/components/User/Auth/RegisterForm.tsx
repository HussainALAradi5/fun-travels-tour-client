import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Text, Link as ChakraLink } from "@chakra-ui/react";
import { userService } from "@/Api/User";
import { GenericForm } from "@/components/ui/Custom/GenericForm";
import { type User, DEFAULT_USER } from "@/interface/UserInterface";
import type { FieldConfig } from "@/utilities/FormTypes";

const registerFields: FieldConfig<User>[] = [
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
    label: "Email Address",
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
    type: "mobile",
    isRequired: true,
    gridSpan: 2,
  },
  { name: "age", label: "Age", type: "number", gridSpan: 1 },
];

export const RegisterForm = () => {
  const navigate = useNavigate();

  const handleRegister = async (values: User) => {
    const result = await userService.register(values);
    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <>
      <GenericForm<User>
        fields={registerFields}
        initialValues={DEFAULT_USER}
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

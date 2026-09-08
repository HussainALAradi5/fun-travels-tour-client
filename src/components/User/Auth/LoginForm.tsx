import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Text, Link as ChakraLink, Alert, Flex, HStack } from "@chakra-ui/react";
import { userService } from "@/Api/User";
import type { LoginRequest } from "@/interface";
import { GenericForm } from "@/components/ui/Custom/GenericForm";
import { useAuth } from "@/utilities/AuthContext";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: LoginRequest) => {
    setError(null);
    const response = await userService.login(values);
    if (response.success) {
      refreshAuth();
      navigate("/profile");
    } else {
      setError(response.message || "Login failed");
    }
  };

  return (
    <>
      {error && (
        <Alert.Root status="error" mb={4} borderRadius="lg">
          <Alert.Content>
            <Alert.Title>{error}</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      )}

      <GenericForm<LoginRequest>
        fields={[
          {
            name: "identifier",
            label: "Username or Email",
            type: "text",
            isRequired: true,
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            isRequired: true,
          },
        ]}
        initialValues={{ identifier: "", password: "" }}
        onSubmit={handleLogin}
        submitLabel="Sign In"
        columns={1}
      />
     
      <Flex justify="space-between" align="center" mt={6} pt={4} borderTop="1px solid" borderColor="gray.100" _dark={{ borderColor: "gray.800" }}>
        <HStack gap={1}>
          <Text fontSize="sm" color="fg.muted">New?</Text>
          <ChakraLink asChild color="blue.500" fontSize="sm" fontWeight="bold">
            <RouterLink to="/register">Register</RouterLink>
          </ChakraLink>
        </HStack>

        <ChakraLink asChild color="blue.500" fontSize="sm" fontWeight="medium">
          <RouterLink to="/forgot-password">Forgot Password?</RouterLink>
        </ChakraLink>
      </Flex>
    </>
  );
};
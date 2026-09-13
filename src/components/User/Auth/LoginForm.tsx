import { Link as RouterLink } from "@/lib/navigation";
import { Text, Link as ChakraLink, Alert, Flex, HStack } from "@chakra-ui/react";
import type { LoginRequest } from "@/interface/auth/LoginRequest";
import { DynamicForm } from "@/components/ui/Custom/DynamicForm";
import { useLogin } from "@/hooks/auth/useLogin";

export const LoginForm = () => {
  const { login, error, loading } = useLogin();

  return (
    <>
      {error && (
        <Alert.Root status="error" mb={4} borderRadius="lg">
          <Alert.Content>
            <Alert.Title>{error}</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      )}

      <DynamicForm<LoginRequest>
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
        onSubmit={login}
        submitLabel={loading ? "Signing In..." : "Sign In"}
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



import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { DynamicForm } from "@/components/ui/custom/DynamicForm";
import { Link as RouterLink } from "@/lib/navigation";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import type { ResetPasswordFormValues } from "@/types/user/ResetPasswordFormValues";

export const ResetPassword = () => {
  const { hasLink, email, submit } = useResetPassword();

  return (
    <Box maxW="md" mx="auto" mt={10} p={8} border="1px solid" borderColor="border.subtle"
      borderRadius="3xl" boxShadow="xl" bg="bg.panel">
      <VStack gap={2} mb={8}>
        <Heading size="xl" textAlign="center" fontWeight="black">Choose a New Password</Heading>
        <Text color="fg.muted" fontSize="sm" textAlign="center">
          {hasLink ? `Resetting the password for ${email}` : "This reset link is incomplete. Request a new one."}
        </Text>
      </VStack>
      {hasLink ? (
        <DynamicForm<ResetPasswordFormValues>
          fields={[
            { name: "newPassword", label: "New Password", type: "password", isRequired: true },
            { name: "confirmPassword", label: "Confirm Password", type: "password", isRequired: true },
          ]}
          initialValues={{ newPassword: "", confirmPassword: "" }}
          onSubmit={submit}
          submitLabel="Update Password"
          columns={1}
        />
      ) : (
        <RouterLink to="/forgot-password">Request a new reset link</RouterLink>
      )}
    </Box>
  );
};

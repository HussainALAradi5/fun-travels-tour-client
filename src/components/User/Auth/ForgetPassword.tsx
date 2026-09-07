import { useState } from "react";
import { Box, Heading, VStack, Link as ChakraLink, Text, Button, HStack, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { LuShieldCheck, LuCheck } from "react-icons/lu";
import { userService } from "@/Api/User";
import { GenericForm } from "@/components/ui/Custom/GenericForm";

// --- Sub-component 1: The Request Form ---
const EmailRequestForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const handleEmailRequest = async (values: { email: string }) => {
    // We send an empty string for the baseNumber parameter since it's an email
    const res = await userService.requestPasswordReset(values.email, "");
    if (res.success) {
      onSuccess();
    }
    return res;
  };

  return (
    <GenericForm<{ email: string }>
      fields={[
        { 
          name: "email", 
          label: "Email Address", 
          type: "email", 
          placeholder: "you@example.com", 
          isRequired: true 
        }
      ]}
      initialValues={{ email: "" }}
      onSubmit={handleEmailRequest} 
      submitLabel="Send Reset Link" 
      columns={1}
    />
  );
};

// --- Sub-component 2: The Success Screen ---
const SuccessView = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <VStack textAlign="center" py={4} gap={4}>
      {/* Adapts background and icon color for Dark Mode */}
      <Box p={4} bg="green.50" _dark={{ bg: "green.900/30" }} borderRadius="full">
        <Icon as={LuCheck} boxSize={10} color="green.500" _dark={{ color: "green.400" }} />
      </Box>
      <Text color="fg.muted" fontWeight="medium">
        A secure reset link has been dispatched. Please check your inbox (and spam folder) to proceed.
      </Text>
      <Button variant="outline" borderRadius="xl" onClick={onRetry} w="full">
        Didn't get it? Try again
      </Button>
    </VStack>
  );
};

// --- Main Wrapper Component ---
export const ForgetPassword = () => {
  const [isSent, setIsSent] = useState(false);

  return (
    <Box 
      maxW="md" 
      mx="auto" 
      mt={10} 
      p={8} 
      border="1px solid" 
      borderColor="border.subtle" 
      borderRadius="3xl" 
      boxShadow="xl" 
      bg="bg.panel" // Automatically switches between white and dark gray
    >
      <VStack gap={2} mb={8}>
        <Icon as={LuShieldCheck} boxSize={10} color="blue.500" _dark={{ color: "blue.400" }} />
        <Heading size="xl" textAlign="center" fontWeight="black" letterSpacing="tight" color="fg">
          {isSent ? "Check Inbox" : "Account Recovery"}
        </Heading>
        <Text color="fg.muted" fontSize="sm" textAlign="center">
          {isSent 
            ? "Follow the instructions in the email to reset your password" 
            : "Enter the email associated with your account"}
        </Text>
      </VStack>

      {!isSent ? (
        <EmailRequestForm onSuccess={() => setIsSent(true)} />
      ) : (
        <SuccessView onRetry={() => setIsSent(false)} />
      )}

      {/* Replaced hardcoded gray border with border.subtle */}
      <HStack justify="center" mt={8} pt={6} borderTop="1px solid" borderColor="border.subtle">
        <ChakraLink asChild color="fg.muted" fontSize="sm" _hover={{ color: "blue.500", _dark: { color: "blue.400" } }}>
          <RouterLink to="/login">Return to Sign In</RouterLink>
        </ChakraLink>
      </HStack>
    </Box>
  );
};
import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import { Inbox } from "lucide-react";

export const NotificationEmptyState = () => (
  <Box
    p={16}
    textAlign="center"
    borderRadius="3xl"
    borderStyle="dashed"
    borderWidth="2px"
    borderColor="border.subtle"
    bg="bg.surface"
    transition="all 0.3s"
    _hover={{ bg: "bg.muted", borderColor: "border.muted" }}
  >
    <VStack gap={4}>
      <Box p={5} borderRadius="2xl" bg="gray.100" _dark={{ bg: "whiteAlpha.100" }} color="gray.400">
        <Icon as={Inbox} size="2xl" strokeWidth={1.5} />
      </Box>
      <VStack gap={1}>
        <Text color="fg" fontWeight="bold" fontSize="lg" letterSpacing="tight">
          You're all caught up!
        </Text>
        <Text fontSize="sm" color="fg.muted" maxW="sm" lineHeight="tall">
          When there are updates regarding your tours, tickets, or user requests, they will appear right here.
        </Text>
      </VStack>
    </VStack>
  </Box>
);
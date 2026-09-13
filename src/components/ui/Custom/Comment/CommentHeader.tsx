import { HStack, VStack, Center, Icon, Heading, Text, Box } from "@chakra-ui/react";
import { MessageSquare } from "lucide-react";
import type { CommentHeaderProps } from "@/interface/props/ui/CommentHeaderProps";

export const CommentHeader = ({ title, count }: CommentHeaderProps) => (
  <HStack mb={6} pb={4} borderBottomWidth="1px" justify="space-between" borderColor="border.subtle">
    <HStack gap={3}>
      <Center w={10} h={10} bg="blue.500" color="white" borderRadius="xl" shadow="0 4px 12px rgba(49, 130, 206, 0.3)">
        <Icon size="md" as={MessageSquare} />
      </Center>
      <VStack align="start" gap={0}>
        <Heading size="md" color="fg.emphasized">{title}</Heading>
        <Text fontSize="xs" color="fg.muted">Recent activity and messages</Text>
      </VStack>
    </HStack>
    <Box bg="blue.50" _dark={{ bg: "blue.950" }} px={3} py={1} borderRadius="full">
      <Text fontSize="xs" color="blue.600" fontWeight="bold">{count} Messages</Text>
    </Box>
  </HStack>
);
import { Flex, HStack, VStack, Text, Icon, Badge, Box } from "@chakra-ui/react";
import { Bell, BellRing } from "lucide-react";
import type { NotificationHeaderProps } from "@/interface/props/notification/NotificationHeaderProps";

export const NotificationHeader = ({ unreadCount }: NotificationHeaderProps) => (
  <Flex justify="space-between" align="center" px={1} mb={2}>
    <HStack gap={4}>
      <Box
        p={3}
        borderRadius="xl"
        bg={unreadCount > 0 ? "blue.50" : "bg.subtle"}
        _dark={{ bg: unreadCount > 0 ? "blue.900/30" : "bg.subtle" }}
        position="relative"
      >
         <Icon
           as={unreadCount > 0 ? BellRing : Bell}
           size="xl"
           color={unreadCount > 0 ? "blue.600" : "fg.muted"}
           _dark={{ color: unreadCount > 0 ? "blue.400" : "fg.muted" }}
         />
         {unreadCount > 0 && (
           <Box
             position="absolute" top="2px" right="2px"
             w="12px" h="12px" bg="red.500"
             borderRadius="full" border="2px solid" borderColor="bg.panel"
           />
         )}
      </Box>
      <VStack align="start" gap={0}>
        <Text fontWeight="bold" fontSize="2xl" letterSpacing="tight" color="fg">
          Inbox
        </Text>
        <Text fontSize="sm" color="fg.muted" fontWeight="medium">
          Manage your alerts and updates
        </Text>
      </VStack>
    </HStack>

    {unreadCount > 0 && (
      <Badge colorPalette="blue" variant="solid" borderRadius="full" px={3} py={1} fontSize="sm" shadow="sm">
        {unreadCount} New
      </Badge>
    )}
  </Flex>
);
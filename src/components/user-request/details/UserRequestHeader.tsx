import { Badge, Button, Flex, Heading, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { ArrowLeft, Power } from "lucide-react";
import { UserRequestAction } from "@/enums/user-request/UserRequestAction";
import { UserRequestStatusColor } from "@/enums/user-request/UserRequestStatus";
import { UserRequestTypeColor } from "@/enums/user-request/UserRequestType";
import type { RequestActionProps } from "@/interfaces/props/support/RequestActionProps";
import { useNavigate } from "@/lib/navigation";

export const UserRequestHeader = ({ request, loading, onAction, canClose }: RequestActionProps) => {
  const navigate = useNavigate();
  return (
    <Flex justify="space-between" align="center" mb={10} flexWrap="wrap" gap={6}>
      <HStack gap={5}>
        <IconButton variant="subtle" rounded="full" aria-label="Back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></IconButton>
        <VStack align="start" gap={1}>
          <HStack gap={3}>
            <Heading size="lg" color="fg.emphasized">{request.title}</Heading>
            <Badge variant="surface" colorPalette="blue" size="sm" borderRadius="md" px={2}>REQ-{request.id}</Badge>
          </HStack>
          <Text fontSize="xs" color="fg.muted" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">User Service Request</Text>
        </VStack>
      </HStack>
      <HStack gap={3}>
        {canClose && (
          <Button size="sm" variant="surface" colorPalette="red" onClick={() => onAction(UserRequestAction.SOLVE)} loading={loading} borderRadius="xl">
            <Power size={14} /> Close Request
          </Button>
        )}
        <Badge colorPalette={UserRequestTypeColor[request.type]} variant="subtle" borderRadius="full" px={4} py={1.5} textTransform="capitalize" fontWeight="bold">
          {request.type.replace("_", " ")}
        </Badge>
        <Badge colorPalette={UserRequestStatusColor[request.status]} variant="solid" borderRadius="full" px={5} py={1.5} fontWeight="bold">{request.status}</Badge>
      </HStack>
    </Flex>
  );
};

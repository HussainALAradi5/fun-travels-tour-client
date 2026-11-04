import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { CheckCircle, UserPlus, XCircle } from "lucide-react";
import { UserRequestAction } from "@/enums/user-request/UserRequestAction";
import { UserRequestStatus } from "@/enums/user-request/UserRequestStatus";
import type { RequestActionProps } from "@/interfaces/props/support/RequestActionProps";

/** Pending: take ownership or reject. Assigned: resolve or reject. */
export const UserRequestAgentActions = ({ request, loading, onAction }: RequestActionProps) => {
  const pending = request.status === UserRequestStatus.PENDING;
  const assigned = request.status === UserRequestStatus.APPROVED;
  if (!pending && !assigned) return null;
  return (
    <Box p={6} bg="bg.panel" borderRadius="2xl" borderWidth="1px" borderStyle="dashed" borderColor="blue.200">
      <HStack justify="space-between">
        <Text fontSize="sm" fontWeight="bold" color="fg.muted">Agent Administrative Actions</Text>
        <HStack gap={3}>
          {pending ? (
            <Button colorPalette="blue" size="sm" onClick={() => onAction(UserRequestAction.ASSIGN)} loading={loading} borderRadius="lg">
              <UserPlus size={16} /> Take Ownership
            </Button>
          ) : (
            <Button colorPalette="green" size="sm" onClick={() => onAction(UserRequestAction.SOLVE)} loading={loading} borderRadius="lg">
              <CheckCircle size={16} /> Resolve
            </Button>
          )}
          <Button variant="outline" colorPalette="red" size="sm" onClick={() => onAction(UserRequestAction.REJECT)} loading={loading} borderRadius="lg">
            <XCircle size={16} /> Reject
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

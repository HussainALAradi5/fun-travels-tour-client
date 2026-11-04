import { Box, Center, Grid, HStack, Icon, Spinner, Text, VStack } from "@chakra-ui/react";
import { Briefcase, Calendar, FileText, User } from "lucide-react";
import { UserRequestStatus } from "@/enums/user-request/UserRequestStatus";
import { useUserRequestDetails } from "@/hooks/support/useUserRequestDetails";
import { useParams } from "@/lib/navigation";
import { AuditLog } from "../ui/custom/AuditLog";
import { CommentSection } from "../ui/custom/CommentSection";
import { InfoTile } from "./details/InfoTile";
import { UserRequestAgentActions } from "./details/UserRequestAgentActions";
import { UserRequestHeader } from "./details/UserRequestHeader";

const DATE_FORMAT: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };

export const UserRequestDetails = () => {
  const { id } = useParams();
  const d = useUserRequestDetails(id);
  const request = d.request;
  if (d.loading || !request) return <Center h="50vh"><Spinner size="xl" color="blue.500" /></Center>;
  const actionProps = { request, loading: d.actionLoading, onAction: d.runAction };
  return (
    <Box p={6} maxW="7xl" mx="auto" w="full">
      <UserRequestHeader {...actionProps} canClose={d.isOwner && request.status === UserRequestStatus.APPROVED} />
      <Grid templateColumns={{ base: "1fr", lg: "1.2fr 0.8fr" }} gap={10} alignItems="start">
        <VStack align="stretch" gap={8}>
          <Box bg="bg.panel" p={8} borderRadius="3xl" borderWidth="1px" shadow="sm">
            <HStack mb={5} color="blue.500">
              <Icon as={FileText} boxSize={4} />
              <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">Description</Text>
            </HStack>
            <Text fontSize="md" lineHeight="relaxed" color="fg.emphasized" whiteSpace="pre-wrap">{request.description}</Text>
          </Box>
          <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={4}>
            <InfoTile label="Submitted By" value={request.user?.name} icon={User} palette="blue" />
            <InfoTile label="Created At" icon={Calendar} palette="gray"
              value={request.createdAt ? new Date(request.createdAt).toLocaleDateString("en-GB", DATE_FORMAT) : "-"} />
            <InfoTile label="Assigned To" value={request.assignedTo?.name || "Unassigned"} icon={Briefcase} palette="purple" />
          </Grid>
          {d.isSupport && !d.closed && <UserRequestAgentActions {...actionProps} />}
          <AuditLog events={d.events} title="Activity Timeline" />
        </VStack>
        <Box position="sticky" top="24px">
          <CommentSection comments={d.comments} currentUserId={d.user?.id || 0} onAddComment={d.addComment}
            onEditComment={d.editComment} title="Discussion" isReadOnly={d.closed} />
        </Box>
      </Grid>
    </Box>
  );
};

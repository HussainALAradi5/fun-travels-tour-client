import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "@/lib/navigation";
import {
  Box, Center, Flex, HStack, IconButton, Spinner, VStack, Text,
  Button, Icon, Heading, Badge, Grid
} from "@chakra-ui/react";
import {
  ArrowLeft, Briefcase, Calendar, CheckCircle, FileText,
  Power, User, UserPlus, XCircle
} from "lucide-react";

import { genericTrackingService } from "@/Api/genericTracking";
import { userRequestService } from "@/Api/UserRequest";
import { useUser } from "@/hooks/User/useUser";
import type { GenericComment } from "@/interface/support/GenericComment"; import type { GenericEventLog } from "@/interface/support/GenericEventLog";
import type { UserRequest } from "@/interface/support/UserRequest";
import { AuditLog } from "../ui/Custom/AuditLog";
import { CommentSection } from "../ui/Custom/CommentSection";
import type { AuditEventItem } from "@/interface/common/AuditEventItem";
import type { CommentItem } from "@/interface/common/CommentItem";
import { notify } from "../ui/Custom/GenericNotification";
import { UserRequestStatus } from "@/enums/UserRequest/UserRequestStatus";
import { UserRequestAction } from "@/enums/UserRequest/UserRequestAction";
import { RequestStatusColors, RequestTypeColors } from "@/constants/roles/Colors";

export const UserRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useUser();

  const [request, setRequest] = useState<UserRequest | null>(null);
  const [events, setEvents] = useState<GenericEventLog[]>([]);
  const [comments, setComments] = useState<GenericComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const isSupport = user?.userType?.toUpperCase() === "SUPPORT_AGENT" || isAdmin;
  const isOwner = user?.id === request?.user?.id;

  const fetchData = useCallback(async (showGlobalLoader = true) => {
    if (!id) return;
    try {
      if (showGlobalLoader) setLoading(true);
      const reqRes = await userRequestService.getById(Number(id));
      if (reqRes) setRequest(reqRes);

      const trackRes = await genericTrackingService.getTimeline("USER_REQUEST", Number(id));
      if (trackRes) {
        setEvents((trackRes.events || []).sort((a: { createdAt?: string }, b: { createdAt?: string }) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()) as never);
        setComments((trackRes.comments || []).sort((a: { createdAt?: string }, b: { createdAt?: string }) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()) as never);
      }
    } catch {
      notify({ title: "Error", description: "Failed to load request data", type: "error" });
    } finally {
      if (showGlobalLoader) setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchData(true); }, [fetchData]);

  const formattedAuditEvents: AuditEventItem[] = events.map((event, index) => ({
    id: event.id ?? -(index + 1),
    actorName: event.actor?.name || "System",
    action: event.action || "UPDATE",
    description: event.description ?? undefined,
    createdAt: event.createdAt!
  }));

  const formattedComments: CommentItem[] = comments.map(comment => ({
    id: comment.id!,
    authorId: comment.author?.id || 0,
    authorName: comment.author?.name || "Unknown",
    content: comment.content,
    createdAt: comment.createdAt!,
    updatedAt: comment.updatedAt ?? undefined
  }));

  const handleStatusAction = async (action: UserRequestAction) => {
    if (!user?.id || !request?.id) return;
    setActionLoading(true);
    try {
      let res;
      if (action === UserRequestAction.ASSIGN) res = await userRequestService.assignToAgent(request.id, user.id);
      if (action === UserRequestAction.SOLVE) res = await userRequestService.solveRequest(request.id);
      if (action === UserRequestAction.REJECT) res = await userRequestService.rejectRequest(request.id);

      if (res) {
        notify({ title: "Success", description: "Action completed", type: "success" });
        await fetchData(false);
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddComment = async (content: string) => {
    if (!user?.id || !request?.id) return;
    await genericTrackingService.addComment("USER_REQUEST", request.id, content);
    await fetchData(false);
  };

  const handleEditComment = async (commentId: string | number, content: string) => {
    if (!user?.id) return;
    await genericTrackingService.updateComment(Number(commentId), content);
    await fetchData(false);
  };

  if (loading || !request) return <Center h="50vh"><Spinner size="xl" color="blue.500" /></Center>;

  return (
    <Box p={6} maxW="7xl" mx="auto" w="full">
<Flex justify="space-between" align="center" mb={10} flexWrap="wrap" gap={6}>
        <HStack gap={5}>
          <IconButton
            variant="subtle"
            rounded="full"
            aria-label="Back"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
          </IconButton>

          <VStack align="start" gap={1}>
            <HStack gap={3}>
              <Heading size="lg" color="fg.emphasized">{request.title}</Heading>
              <Badge variant="surface" colorPalette="blue" size="sm" borderRadius="md" px={2}>
                REQ-{request.id}
              </Badge>
            </HStack>
            <Text fontSize="xs" color="fg.muted" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
              User Service Request
            </Text>
          </VStack>
        </HStack>

        <HStack gap={3}>
          {isOwner && request.status === UserRequestStatus.APPROVED && (
            <Button size="sm" variant="surface" colorPalette="red" onClick={() => handleStatusAction(UserRequestAction.SOLVE)} loading={actionLoading} borderRadius="xl">
              <Power size={14} style={{marginRight: '6px'}}/> Close Request
            </Button>
          )}
          <Badge colorPalette={RequestTypeColors[request.type] || "gray"} variant="subtle" borderRadius="full" px={4} py={1.5} textTransform="capitalize" fontWeight="bold">
            {request.type.replace('_', ' ')}
          </Badge>
          <Badge colorPalette={RequestStatusColors[request.status]} variant="solid" borderRadius="full" px={5} py={1.5} fontWeight="bold">
            {request.status}
          </Badge>
        </HStack>
      </Flex>
<Grid templateColumns={{ base: "1fr", lg: "1.2fr 0.8fr" }} gap={10} alignItems="start">
<VStack align="stretch" gap={8}>
          <Box bg="bg.panel" p={8} borderRadius="3xl" borderWidth="1px" shadow="sm" position="relative">
            <HStack mb={5} color="blue.500">
              <Icon size="sm"><FileText/></Icon>
              <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">Description</Text>
            </HStack>
            <Text fontSize="md" lineHeight="relaxed" color="fg.emphasized" whiteSpace="pre-wrap">{request.description}</Text>
          </Box>

          <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={4}>
            <Box p={5} borderRadius="2xl" bg="blue.50/50" _dark={{ bg: "blue.950/20" }} borderWidth="1px" borderColor="blue.100/50">
              <Text fontSize="2xs" fontWeight="black" color="blue.600" textTransform="uppercase" mb={2}>Submitted By</Text>
              <HStack><Icon size="sm" color="blue.500"><User/></Icon><Text fontSize="sm" fontWeight="semibold">{request.user?.name}</Text></HStack>
            </Box>

            <Box p={5} borderRadius="2xl" bg="gray.50" _dark={{ bg: "whiteAlpha.50" }} borderWidth="1px" borderColor="border.subtle">
              <Text fontSize="2xs" fontWeight="black" color="gray.500" textTransform="uppercase" mb={2}>Created At</Text>
              <HStack><Icon size="sm" color="gray.500"><Calendar/></Icon><Text fontSize="sm" fontWeight="semibold">{new Date(request.createdAt!).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</Text></HStack>
            </Box>

            <Box p={5} borderRadius="2xl" bg="purple.50/50" _dark={{ bg: "purple.950/20" }} borderWidth="1px" borderColor="purple.100/50">
              <Text fontSize="2xs" fontWeight="black" color="purple.600" textTransform="uppercase" mb={2}>Assigned To</Text>
              <HStack><Icon size="sm" color="purple.500"><Briefcase/></Icon><Text fontSize="sm" fontWeight="semibold">{request.assignedTo?.name || "Unassigned"}</Text></HStack>
            </Box>
          </Grid>

          {isSupport && request.status !== UserRequestStatus.COMPLETED && request.status !== UserRequestStatus.REJECTED && (
            <Box p={6} bg="bg.panel" borderRadius="2xl" borderWidth="1px" borderStyle="dashed" borderColor="blue.200">
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="bold" color="fg.muted">Agent Administrative Actions</Text>
                <HStack gap={3}>
                  {request.status === UserRequestStatus.PENDING && (
                    <>
                      <Button variant="solid" colorPalette="blue" size="sm" onClick={() => handleStatusAction(UserRequestAction.ASSIGN)} loading={actionLoading} borderRadius="lg">
                        <UserPlus size={16} style={{marginRight: '8px'}} /> Take Ownership
                      </Button>
                      <Button variant="outline" colorPalette="red" size="sm" onClick={() => handleStatusAction(UserRequestAction.REJECT)} loading={actionLoading} borderRadius="lg">
                        <XCircle size={16} style={{marginRight: '8px'}} /> Reject
                      </Button>
                    </>
                  )}
                  {request.status === UserRequestStatus.APPROVED && (
                    <>
                      <Button colorPalette="green" size="sm" onClick={() => handleStatusAction(UserRequestAction.SOLVE)} loading={actionLoading} borderRadius="lg">
                        <CheckCircle size={16} style={{marginRight: '8px'}} /> Resolve
                      </Button>
                      <Button variant="outline" colorPalette="red" size="sm" onClick={() => handleStatusAction(UserRequestAction.REJECT)} loading={actionLoading} borderRadius="lg">
                        <XCircle size={16} style={{marginRight: '8px'}} /> Reject
                      </Button>
                    </>
                  )}
                </HStack>
              </HStack>
            </Box>
          )}

          <AuditLog
            events={formattedAuditEvents}
            title="Activity Timeline"
          />
        </VStack>

        <Box position="sticky" top="24px">
          <CommentSection
            comments={formattedComments}
            currentUserId={user?.id || 0}
            onAddComment={handleAddComment}
            onEditComment={handleEditComment}
            title="Discussion"
            isReadOnly={request.status === UserRequestStatus.COMPLETED || request.status === UserRequestStatus.REJECTED}
          />
        </Box>
      </Grid>
    </Box>
  );
};





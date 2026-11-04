import { useCallback, useEffect, useState } from "react";
import { notify } from "@/components/ui/custom/GenericNotification";
import { UserRequestAction } from "@/enums/user-request/UserRequestAction";
import { UserRequestStatus } from "@/enums/user-request/UserRequestStatus";
import { useUser } from "@/hooks/user/useUser";
import type { AuditEventItem } from "@/interfaces/common/AuditEventItem";
import type { CommentItem } from "@/interfaces/common/CommentItem";
import type { UserRequest } from "@/interfaces/support/UserRequest";
import { genericTrackingService } from "@/services/support/genericTrackingService";
import { userRequestService } from "@/services/support/userRequestService";
import { toAuditEvents, toCommentItems } from "@/utilities/timelineMappers";

const REFERENCE = "USER_REQUEST";

/** One support request with its timeline, workflow actions, and comments. */
export function useUserRequestDetails(id?: string) {
  const { user, isAdmin } = useUser();
  const [request, setRequest] = useState<UserRequest | null>(null);
  const [events, setEvents] = useState<AuditEventItem[]>([]);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      const [req, timeline] = await Promise.all([
        userRequestService.getById(Number(id)),
        genericTrackingService.getTimeline(REFERENCE, Number(id)),
      ]);
      if (req) setRequest(req);
      setEvents(toAuditEvents(timeline?.events ?? []));
      setComments(toCommentItems(timeline?.comments ?? []));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  const runAction = async (action: UserRequestAction) => {
    if (!user?.id || !request?.id) return;
    setActionLoading(true);
    try {
      if (action === UserRequestAction.ASSIGN) await userRequestService.assignToAgent(request.id, user.id);
      if (action === UserRequestAction.SOLVE) await userRequestService.solveRequest(request.id);
      if (action === UserRequestAction.REJECT) await userRequestService.rejectRequest(request.id);
      notify({ title: "Success", description: "Action completed", type: "success" });
      await load();
    } finally {
      setActionLoading(false);
    }
  };

  const addComment = async (content: string) => {
    if (!request?.id) return;
    await genericTrackingService.addComment(REFERENCE, request.id, content);
    await load();
  };

  const editComment = async (commentId: string | number, content: string) => {
    await genericTrackingService.updateComment(Number(commentId), content);
    await load();
  };

  const closed = request?.status === UserRequestStatus.COMPLETED || request?.status === UserRequestStatus.REJECTED;
  return {
    user, request, events, comments, loading, actionLoading, closed,
    isSupport: user?.userType?.toUpperCase() === "SUPPORT_AGENT" || isAdmin,
    isOwner: Boolean(request && user?.id === request.user?.id),
    runAction, addComment, editComment,
  };
}

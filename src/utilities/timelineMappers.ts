import type { AuditEventItem } from "@/interfaces/common/AuditEventItem";
import type { CommentItem } from "@/interfaces/common/CommentItem";
import type { Comment } from "@/interfaces/support/Comment";
import type { EventLog } from "@/interfaces/support/EventLog";

const time = (value?: string | null) => (value ? new Date(value).getTime() : 0);

/** Newest first, for audit logs. */
export const toAuditEvents = (events: EventLog[]): AuditEventItem[] =>
  [...events].sort((a, b) => time(b.createdAt) - time(a.createdAt)).map((event, index) => ({
    id: event.id ?? -(index + 1),
    actorName: event.actor?.name || "System",
    action: event.action || "UPDATE",
    description: event.description ?? undefined,
    createdAt: event.createdAt!,
  }));

/** Oldest first, for discussions. */
export const toCommentItems = (comments: Comment[]): CommentItem[] =>
  [...comments].sort((a, b) => time(a.createdAt) - time(b.createdAt)).map((comment) => ({
    id: comment.id!,
    authorId: comment.author?.id || 0,
    authorName: comment.author?.name || "Unknown",
    content: comment.content,
    createdAt: comment.createdAt!,
    updatedAt: comment.updatedAt ?? undefined,
  }));

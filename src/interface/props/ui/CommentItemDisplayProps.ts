import type { CommentItem } from '@/interface/common/CommentItem';

export interface CommentItemDisplayProps {
  comment: CommentItem;
  isMe: boolean;
  isReadOnly?: boolean;
  onEdit?: (id: number, content: string) => void | Promise<void>;
}

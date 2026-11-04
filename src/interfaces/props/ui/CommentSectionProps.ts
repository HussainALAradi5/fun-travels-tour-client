import type { CommentItem } from '@/interfaces/common/CommentItem';

export interface CommentSectionProps {
  comments: CommentItem[];
  currentUserId: number | string;
  onAddComment: (content: string) => void;
  onEditComment?: (id: number, content: string) => void | Promise<void>;
  title?: string;
  emptyMessage?: string;
  isReadOnly?: boolean;
}

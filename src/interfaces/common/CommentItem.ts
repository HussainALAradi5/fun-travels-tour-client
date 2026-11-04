export interface CommentItem {
  id: number;
  authorId: number | string;
  authorName: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

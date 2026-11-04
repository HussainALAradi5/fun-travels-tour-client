import type { CommentResponseDto } from "@/dtos/support/CommentResponseDto";

/** Comment as the server sends it; the shape is generated from the server DTO. */
export type Comment = CommentResponseDto;

export const DEFAULT_COMMENT: Partial<Comment> = {
  content: "",
};

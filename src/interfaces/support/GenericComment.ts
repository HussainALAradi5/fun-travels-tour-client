import type { CommentResponseDto } from "@/dtos/support/CommentResponseDto";

/** GenericComment as the server sends it; the shape is generated from the server DTO. */
export type GenericComment = CommentResponseDto;

export const DEFAULT_COMMENT: Partial<GenericComment> = {
  content: "",
};

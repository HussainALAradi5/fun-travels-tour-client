import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { CommentResponseDto } from "@/dtos/support/CommentResponseDto";
import type { ReferenceType } from "@/enums/notification/ReferenceType";
import type { CommentRequestDto } from "@/dtos/support/CommentRequestDto";
import type { TimelineResponseDto } from "@/dtos/support/TimelineResponseDto";

export const genericTrackingService = {
  getTimeline: async (refType: ReferenceType, refId: number): Promise<TimelineResponseDto> => {
    const response = await apiClient.get<ApiResponse<TimelineResponseDto>>(
      ENDPOINTS.tracking.timeline(refType, refId)
    );
    return response.data.data;
  },

  addComment: async (refType: ReferenceType, refId: number, content: string): Promise<CommentResponseDto> => {
    const response = await apiClient.post<ApiResponse<CommentResponseDto>>(
      ENDPOINTS.tracking.addComment(refType, refId),
      { content } satisfies CommentRequestDto
    );
    return response.data.data;
  },

  updateComment: async (commentId: number, content: string): Promise<CommentResponseDto> => {
    const response = await apiClient.put<ApiResponse<CommentResponseDto>>(
      ENDPOINTS.tracking.comment(commentId),
      { content } satisfies CommentRequestDto
    );
    return response.data.data;
  },
};

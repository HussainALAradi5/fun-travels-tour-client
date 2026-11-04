import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { Comment } from "@/interfaces/support/Comment";
import type { ReferenceType } from "@/enums/notification/ReferenceType";
import type { CommentRequest } from "@/interfaces/support/CommentRequest";
import type { TimelineResponse } from "@/interfaces/support/TimelineResponse";

export const genericTrackingService = {
  getTimeline: async (refType: ReferenceType, refId: number): Promise<TimelineResponse> => {
    const response = await apiClient.get<ApiResponse<TimelineResponse>>(
      ENDPOINTS.tracking.timeline(refType, refId)
    );
    return response.data.data;
  },

  addComment: async (refType: ReferenceType, refId: number, content: string): Promise<Comment> => {
    const response = await apiClient.post<ApiResponse<Comment>>(
      ENDPOINTS.tracking.addComment(refType, refId),
      { content } satisfies CommentRequest
    );
    return response.data.data;
  },

  updateComment: async (commentId: number, content: string): Promise<Comment> => {
    const response = await apiClient.put<ApiResponse<Comment>>(
      ENDPOINTS.tracking.comment(commentId),
      { content } satisfies CommentRequest
    );
    return response.data.data;
  },
};

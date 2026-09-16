import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Comment } from "@/interface/support/Comment";
import type { ReferenceType } from "@/enums/notification/ReferenceType";
import type { CommentRequest } from "@/interface/support/CommentRequest";
import type { TimelineResponse } from "@/interface/support/TimelineResponse";

export const genericTrackingService = {
  getTimeline: async (refType: ReferenceType, refId: number): Promise<TimelineResponse> => {
    const response = await apiClient.get<ApiResponse<TimelineResponse>>(
      `/tracking/${refType}/${refId}`
    );
    return response.data.data;
  },

  addComment: async (refType: ReferenceType, refId: number, content: string): Promise<Comment> => {
    const response = await apiClient.post<ApiResponse<Comment>>(
      `/tracking/${refType}/${refId}/comments`,
      { content } satisfies CommentRequest
    );
    return response.data.data;
  },

  updateComment: async (commentId: number, content: string): Promise<Comment> => {
    const response = await apiClient.put<ApiResponse<Comment>>(
      `/tracking/comments/${commentId}`,
      { content } satisfies CommentRequest
    );
    return response.data.data;
  },
};

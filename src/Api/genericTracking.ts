import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { CommentResponse } from "@/interface/support/CommentResponse";
import type { EventLogResponse } from "@/interface/support/EventLogResponse";
import type { ReferenceType } from "@/enums/notification/ReferenceType";

export const genericTrackingService = {
  getTimeline: async (refType: ReferenceType, refId: number): Promise<{ events: EventLogResponse[]; comments: CommentResponse[] }> => {
    const response = await apiClient.get<ApiResponse<{ events: EventLogResponse[]; comments: CommentResponse[] }>>(
      `/tracking/${refType}/${refId}`
    );
    return response.data.data;
  },

  addComment: async (refType: ReferenceType, refId: number, authorId: number, content: string): Promise<CommentResponse> => {
    const response = await apiClient.post<ApiResponse<CommentResponse>>(
      `/tracking/${refType}/${refId}/comments`,
      { content },
      { params: { authorId } }
    );
    return response.data.data;
  },

  updateComment: async (commentId: number, editorId: number, content: string): Promise<CommentResponse> => {
    const response = await apiClient.put<ApiResponse<CommentResponse>>(
      `/tracking/comments/${commentId}`,
      { content },
      { params: { editorId } }
    );
    return response.data.data;
  },
};

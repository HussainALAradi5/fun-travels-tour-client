import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Comment } from "@/interface/support/Comment";
import type { EventLog } from "@/interface/support/EventLog";
import type { ReferenceType } from "@/enums/notification/ReferenceType";

export const genericTrackingService = {
  getTimeline: async (refType: ReferenceType, refId: number): Promise<{ events: EventLog[]; comments: Comment[] }> => {
    const response = await apiClient.get<ApiResponse<{ events: EventLog[]; comments: Comment[] }>>(
      `/tracking/${refType}/${refId}`
    );
    return response.data.data;
  },

  addComment: async (refType: ReferenceType, refId: number, authorId: number, content: string): Promise<Comment> => {
    const response = await apiClient.post<ApiResponse<Comment>>(
      `/tracking/${refType}/${refId}/comments`,
      { content },
      { params: { authorId } }
    );
    return response.data.data;
  },

  updateComment: async (commentId: number, editorId: number, content: string): Promise<Comment> => {
    const response = await apiClient.put<ApiResponse<Comment>>(
      `/tracking/comments/${commentId}`,
      { content },
      { params: { editorId } }
    );
    return response.data.data;
  },
};

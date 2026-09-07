import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/utilities/ApiUtility";
import type { GenericComment } from "@/interface/GenericTrackingInterface";
import type { ReferenceType } from "@/enums/notification/ReferenceType";

export const genericTrackingService = {
  getTimeline: async (refType: ReferenceType, refId: number) => {
    const response = await apiClient.get<ApiResponse<{ events: any[], comments: any[] }>>(
      `/tracking/${refType}/${refId}`
    );
    return response.data;
  },

  addComment: async (refType: ReferenceType, refId: number, authorId: number, content: string) => {
    const response = await apiClient.post<ApiResponse<GenericComment>>(
      `/tracking/${refType}/${refId}/comments`,
      { content },
      { params: { authorId } } 
    );
    return response.data;
  },

  updateComment: async (commentId: number, editorId: number, content: string) => {
    const response = await apiClient.put<ApiResponse<GenericComment>>(
      `/tracking/comments/${commentId}`,
      { content },
      { params: { editorId } }
    );
    return response.data;
  }
};
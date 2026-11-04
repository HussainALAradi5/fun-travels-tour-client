import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { PaginationParams } from "@/interfaces/common/PaginationParams";
import type { MediaResponseDto } from "@/dtos/media/MediaResponseDto";
import type { PageResponseDto } from "@/dtos/common/PageResponseDto";
import type { MediaCategory } from "@/enums/media/MediaCategory";
import { extractData } from "@/utilities/apiHelper";

export const mediaService = {
  /** The signed-in user's stored files, newest first. */
  listMine: async (category?: MediaCategory, params: PaginationParams = {}): Promise<PageResponseDto<MediaResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<MediaResponseDto>>>(ENDPOINTS.media.root, {
      params: { ...params, category },
    });
    return extractData(response.data);
  },

  /** The file's bytes; the request carries the user's token, so files are never public links. */
  download: async (id: number): Promise<Blob> => {
    const response = await apiClient.get<Blob>(ENDPOINTS.media.download(id), { responseType: "blob" });
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.media.byId(id));
  },
};

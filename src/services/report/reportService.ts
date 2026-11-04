import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { MediaResponseDto } from "@/dtos/media/MediaResponseDto";
import type { ReportRequestDto } from "@/dtos/report/ReportRequestDto";
import { extractData } from "@/utilities/apiHelper";

export const reportService = {
  /** The server builds the branded file from its own data (scoped to the caller) and stores it as media. */
  generate: async (request: ReportRequestDto): Promise<MediaResponseDto> => {
    const response = await apiClient.post<ApiResponse<MediaResponseDto>>(ENDPOINTS.reports, request);
    return extractData(response.data);
  },
};

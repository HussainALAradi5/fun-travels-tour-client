import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { TicketResponseDto } from "@/dtos/tour-management/TicketResponseDto";
import type { RefundQuoteResponseDto } from "@/dtos/tour-management/RefundQuoteResponseDto";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { TicketFilterParams } from "@/interfaces/tour/TicketFilterParams";
import type { PageResponseDto } from "@/dtos/common/PageResponseDto";
import type { PaginationParams } from "@/interfaces/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";

export const ticketService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponseDto<TicketResponseDto>> => {
    const response =
      await apiClient.get<ApiResponse<PageResponseDto<TicketResponseDto>>>(ENDPOINTS.tickets.root, { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<TicketResponseDto> => {
    const response = await apiClient.get<ApiResponse<TicketResponseDto>>(
      ENDPOINTS.tickets.byId(id),
    );
    return response.data.data as unknown as TicketResponseDto;
  },

  search: async (params: TicketFilterParams = {}): Promise<PageResponseDto<TicketResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<TicketResponseDto>>>(
      ENDPOINTS.tickets.search,
      { params },
    );
    return extractData(response.data);
  },

  updateStatus: async (id: number, status: GenericStatus): Promise<TicketResponseDto> => {
    const response = await apiClient.put<ApiResponse<TicketResponseDto>>(
      ENDPOINTS.tickets.status(id),
      null,
      {
        params: { status },
      },
    );
    return response.data.data as unknown as TicketResponseDto;
  },

  approve: async (id: number): Promise<TicketResponseDto> => {
    const response = await apiClient.put<ApiResponse<TicketResponseDto>>(
      ENDPOINTS.tickets.approve(id),
    );
    return response.data.data as unknown as TicketResponseDto;
  },

  confirm: async (id: number): Promise<TicketResponseDto> => {
    const response = await apiClient.put<ApiResponse<TicketResponseDto>>(
      ENDPOINTS.tickets.confirm(id),
    );
    return response.data.data as unknown as TicketResponseDto;
  },

  /** What cancelling now would refund, from the same rules as the cancellation. */
  refundQuote: async (id: number): Promise<RefundQuoteResponseDto> =>
    (await apiClient.get<ApiResponse<RefundQuoteResponseDto>>(ENDPOINTS.tickets.refundQuote(id))).data.data,

  cancel: async (id: number): Promise<TicketResponseDto> => {
    const response = await apiClient.put<ApiResponse<TicketResponseDto>>(
      ENDPOINTS.tickets.cancel(id),
    );
    return response.data.data as unknown as TicketResponseDto;
  },
};

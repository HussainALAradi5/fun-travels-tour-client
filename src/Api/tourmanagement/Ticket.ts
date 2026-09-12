import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Ticket } from "@/interface/tour/Ticket";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { TicketFilterParams } from "@/interface/tour/TicketFilterParams";
import type { PageResponse } from "@/interface/common/PageResponse";
import type { PaginationParams } from "@/interface/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";

export const ticketService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponse<Ticket>> => {
    const response =
      await apiClient.get<ApiResponse<PageResponse<Ticket>>>("/tickets", { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<Ticket> => {
    const response = await apiClient.get<ApiResponse<Ticket>>(
      `/tickets/${id}`,
    );
    return response.data.data as unknown as Ticket;
  },

  search: async (params: TicketFilterParams = {}): Promise<PageResponse<Ticket>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Ticket>>>(
      "/tickets/search",
      { params },
    );
    return extractData(response.data);
  },

  updateStatus: async (id: number, status: GenericStatus): Promise<Ticket> => {
    const response = await apiClient.put<ApiResponse<Ticket>>(
      `/tickets/${id}/status`,
      null,
      {
        params: { status },
      },
    );
    return response.data.data as unknown as Ticket;
  },

  approve: async (id: number): Promise<Ticket> => {
    const response = await apiClient.put<ApiResponse<Ticket>>(
      `/tickets/${id}/approve`,
    );
    return response.data.data as unknown as Ticket;
  },

  confirm: async (id: number): Promise<Ticket> => {
    const response = await apiClient.put<ApiResponse<Ticket>>(
      `/tickets/${id}/confirm`,
    );
    return response.data.data as unknown as Ticket;
  },

  cancel: async (id: number): Promise<Ticket> => {
    const response = await apiClient.put<ApiResponse<Ticket>>(
      `/tickets/${id}/cancel`,
    );
    return response.data.data as unknown as Ticket;
  },
};

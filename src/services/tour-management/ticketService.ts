import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { Ticket } from "@/interfaces/tour/Ticket";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { TicketFilterParams } from "@/interfaces/tour/TicketFilterParams";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import type { PaginationParams } from "@/interfaces/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";

export const ticketService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponse<Ticket>> => {
    const response =
      await apiClient.get<ApiResponse<PageResponse<Ticket>>>(ENDPOINTS.tickets.root, { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<Ticket> => {
    const response = await apiClient.get<ApiResponse<Ticket>>(
      ENDPOINTS.tickets.byId(id),
    );
    return response.data.data as unknown as Ticket;
  },

  search: async (params: TicketFilterParams = {}): Promise<PageResponse<Ticket>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Ticket>>>(
      ENDPOINTS.tickets.search,
      { params },
    );
    return extractData(response.data);
  },

  updateStatus: async (id: number, status: GenericStatus): Promise<Ticket> => {
    const response = await apiClient.put<ApiResponse<Ticket>>(
      ENDPOINTS.tickets.status(id),
      null,
      {
        params: { status },
      },
    );
    return response.data.data as unknown as Ticket;
  },

  approve: async (id: number): Promise<Ticket> => {
    const response = await apiClient.put<ApiResponse<Ticket>>(
      ENDPOINTS.tickets.approve(id),
    );
    return response.data.data as unknown as Ticket;
  },

  confirm: async (id: number): Promise<Ticket> => {
    const response = await apiClient.put<ApiResponse<Ticket>>(
      ENDPOINTS.tickets.confirm(id),
    );
    return response.data.data as unknown as Ticket;
  },

  cancel: async (id: number): Promise<Ticket> => {
    const response = await apiClient.put<ApiResponse<Ticket>>(
      ENDPOINTS.tickets.cancel(id),
    );
    return response.data.data as unknown as Ticket;
  },
};

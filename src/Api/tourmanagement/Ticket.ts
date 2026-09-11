import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Ticket } from "@/interface/tour/Ticket";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { TicketFilterParams } from "@/interface/tour/TicketFilterParams";

export const ticketService = {
  getAll: async (): Promise<Ticket[]> => {
    const response =
      await apiClient.get<ApiResponse<Ticket[]>>("/tickets");
    return response.data.data as unknown as Ticket[];
  },

  getById: async (id: number): Promise<Ticket> => {
    const response = await apiClient.get<ApiResponse<Ticket>>(
      `/tickets/${id}`,
    );
    return response.data.data as unknown as Ticket;
  },

  create: async (ticket: Partial<Ticket>): Promise<Ticket> => {
    const response = await apiClient.post<ApiResponse<Ticket>>(
      "/tickets",
      ticket,
    );
    return response.data.data as unknown as Ticket;
  },

  filter: async (params: TicketFilterParams): Promise<Ticket[]> => {
    const response = await apiClient.get<ApiResponse<Ticket[]>>(
      "/tickets/filter",
      { params },
    );
    return response.data.data as unknown as Ticket[];
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

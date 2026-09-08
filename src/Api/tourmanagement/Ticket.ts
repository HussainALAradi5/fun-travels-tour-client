import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { TicketResponse, Ticket } from "@/interface";
import type { GenericStatus } from "@/enums/GenericStatus";

export const ticketService = {
  getAll: async (): Promise<Ticket[]> => {
    const response = await apiClient.get<ApiResponse<TicketResponse[]>>("/tickets");
    return response.data.data as unknown as Ticket[];
  },

  getById: async (id: number): Promise<Ticket> => {
    const response = await apiClient.get<ApiResponse<TicketResponse>>(`/tickets/${id}`);
    return response.data.data as unknown as Ticket;
  },

  create: async (ticket: Partial<TicketResponse>): Promise<Ticket> => {
    const response = await apiClient.post<ApiResponse<TicketResponse>>("/tickets", ticket);
    return response.data.data as unknown as Ticket;
  },

  filter: async (params: {
    status?: string;
    customerId?: number;
    tourId?: number;
    sortBy?: 'startDate' | 'endDate' | 'bookingDate' | 'totalPrice';
    sortDir?: 'asc' | 'desc';
  }): Promise<Ticket[]> => {
    const response = await apiClient.get<ApiResponse<TicketResponse[]>>("/tickets/filter", { params });
    return response.data.data as unknown as Ticket[];
  },

  updateStatus: async (id: number, status: GenericStatus): Promise<Ticket> => {
    const response = await apiClient.put<ApiResponse<TicketResponse>>(`/tickets/${id}/status`, null, {
      params: { status }
    });
    return response.data.data as unknown as Ticket;
  },

  approve: async (id: number): Promise<Ticket> => {
    const response = await apiClient.put<ApiResponse<TicketResponse>>(`/tickets/${id}/approve`);
    return response.data.data as unknown as Ticket;
  },

  confirm: async (id: number): Promise<Ticket> => {
    const response = await apiClient.put<ApiResponse<TicketResponse>>(`/tickets/${id}/confirm`);
    return response.data.data as unknown as Ticket;
  },

  cancel: async (id: number): Promise<Ticket> => {
    const response = await apiClient.put<ApiResponse<TicketResponse>>(`/tickets/${id}/cancel`);
    return response.data.data as unknown as Ticket;
  },
};


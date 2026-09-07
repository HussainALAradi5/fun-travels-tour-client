import apiClient from "@/config/BaseApi";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { Ticket } from "@/interface/tourmanagement/TicketInterface";

export const ticketService = {
  getAll: async () => {
    const response = await apiClient.get<Ticket[]>("/tickets");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Ticket>(`/tickets/${id}`);
    return response.data;
  },

  create: async (ticket: Ticket) => {
    const response = await apiClient.post<Ticket>("/tickets", ticket);
    return response.data;
  },


  filter: async (params: { 
    status?: string; 
    customerId?: number; 
    tourId?: number;
    sortBy?: 'startDate' | 'endDate' | 'bookingDate' | 'totalPrice';
    sortDir?: 'asc' | 'desc';
  }) => {
    const response = await apiClient.get<Ticket[]>("/tickets/filter", { params });
    return response.data;
  },

  /**
   * General status update via query param.
   * Path: PUT /api/tickets/{id}/status?status=...
   */
  updateStatus: async (id: number, status: GenericStatus) => {
    const response = await apiClient.put<Ticket>(`/tickets/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  },

  /**
   * Specialized endpoints matching your TicketController.
   * Note: These don't need 'params' because the status is hardcoded in the Java Controller.
   */
  approve: async (id: number) => {
    const response = await apiClient.put<Ticket>(`/tickets/${id}/approve`);
    return response.data;
  },

  confirm: async (id: number) => {
    const response = await apiClient.put<Ticket>(`/tickets/${id}/confirm`);
    return response.data;
  },

  cancel: async (id: number) => {
    const response = await apiClient.put<Ticket>(`/tickets/${id}/cancel`);
    return response.data;
  },
};
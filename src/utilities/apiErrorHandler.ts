import { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/interface/common/ApiErrorResponse";

export const reflectApiError = (error: unknown): string => {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  const body = axiosError.response?.data;

  if (!axiosError.response) {
    return "We could not reach the server. Check your connection and try again.";
  }

  const friendlyMessages: Record<string, string> = {
    RESERVATION_HOLD_EXPIRED: "Your reservation hold expired. Please select your seats again.",
    RESERVATION_NOT_PAYABLE: "This reservation has already been processed and cannot be paid again.",
    TOUR_NOT_BOOKABLE: "This tour is no longer available for booking.",
    SEAT_NOT_AVAILABLE: "That seat was just selected by someone else. Please choose another seat.",
    DUPLICATE_SEAT: "Each traveler must have a different seat.",
    INVALID_SEAT_FOR_TOUR: "The selected seat is not available for this tour.",
    INSUFFICIENT_CAPACITY: "There are not enough places available for this booking.",
    CAPACITY_BELOW_BOOKINGS: "Capacity cannot be lower than the number of existing bookings.",
    PAYMENT_FAILED: "We could not complete your payment. Please try another payment method.",
    VALIDATION_FAILED: "Please review the highlighted information and try again.",
  };

  if (body?.code && friendlyMessages[body.code]) return friendlyMessages[body.code];

  const fieldMessage = body?.fieldErrors && Object.values(body.fieldErrors)[0];
  if (fieldMessage) return fieldMessage;

  if (body?.message) {
    return body.message;
  }

  if (axiosError.message) {
    return axiosError.message;
  }

  return "Something went wrong. Please try again.";
};

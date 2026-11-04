import type { PaymentResponseDto } from "@/dtos/payment/PaymentResponseDto";

/** Payment as the server sends it; the shape is generated from the server DTO. */
export type Payment = PaymentResponseDto;

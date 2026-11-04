import type { TransactionResponseDto } from "@/dtos/payment/TransactionResponseDto";

/** Transaction as the server sends it; the shape is generated from the server DTO. */
export type Transaction = TransactionResponseDto;

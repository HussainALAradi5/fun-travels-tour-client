import type { AgencyPolicyUpdateRequestDto } from "@/dtos/agency/AgencyPolicyUpdateRequestDto";

/** The editable discount and refund rules, in the order the owner fills them in. */
export const POLICY_FIELDS: { key: keyof AgencyPolicyUpdateRequestDto; label: string; hint: string; max: number; unit: string }[] = [
  { key: "kidsDiscountPercent", label: "Kids chair discount", hint: "Taken off the fare for every kids chair", max: 100, unit: "%" },
  { key: "fullRefundDays", label: "Full refund if cancelled more than", hint: "days before the tour starts", max: 365, unit: "days" },
  { key: "partialRefundDays", label: "Partial refund from", hint: "days before the tour (up to the full-refund limit)", max: 365, unit: "days" },
  { key: "partialRefundPercent", label: "Partial refund", hint: "of what was paid; 0 means no partial refund", max: 100, unit: "%" },
];

export const DEFAULT_POLICY: AgencyPolicyUpdateRequestDto = {
  kidsDiscountPercent: 50, fullRefundDays: 14, partialRefundDays: 7, partialRefundPercent: 50,
};

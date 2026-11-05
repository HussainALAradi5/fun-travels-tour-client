import { useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { DEFAULT_POLICY } from "@/constants/agency/policyFields";
import type { AgencyPolicyResponseDto } from "@/dtos/agency/AgencyPolicyResponseDto";
import type { AgencyPolicyUpdateRequestDto } from "@/dtos/agency/AgencyPolicyUpdateRequestDto";
import { agencyService } from "@/services/agency/agencyService";

/** An agency's discount and refund rules: the saved version, the owner's draft, and saving it. */
export function useAgencyPolicy(agencyId: number) {
  const [saved, setSaved] = useState<AgencyPolicyResponseDto | null>(null);
  const [draft, setDraft] = useState<AgencyPolicyUpdateRequestDto>(DEFAULT_POLICY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    agencyService.getPolicy(agencyId).then((p) => {
      if (!active) return;
      setSaved(p);
      setDraft({ kidsDiscountPercent: p.kidsDiscountPercent, fullRefundDays: p.fullRefundDays,
        partialRefundDays: p.partialRefundDays, partialRefundPercent: p.partialRefundPercent });
    });
    return () => { active = false; };
  }, [agencyId]);

  const invalid = draft.partialRefundDays > draft.fullRefundDays
    ? "The partial refund must start no later than the full refund limit." : null;
  const changed = Boolean(saved) && (Object.keys(draft) as (keyof AgencyPolicyUpdateRequestDto)[])
    .some((k) => draft[k] !== saved?.[k]);

  const setField = (key: keyof AgencyPolicyUpdateRequestDto, value: number) =>
    setDraft((d) => ({ ...d, [key]: Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0 }));

  const save = async () => {
    if (invalid) return;
    setSaving(true);
    try {
      setSaved(await agencyService.updatePolicy(agencyId, draft));
      toaster.create({ title: "Rules saved", description: "New bookings and cancellations use them from now on.", type: "success" });
    } finally {
      setSaving(false);
    }
  };

  return { saved, draft, setField, save, saving, invalid, changed };
}

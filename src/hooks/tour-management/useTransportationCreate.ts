import { useCallback, useMemo, useState } from "react";
import { Accessibility, Baby, Star } from "lucide-react";
import { FLEET_PATH } from "@/constants/tour/transportationCreate";
import { transportationTypeOptions } from "@/constants/tour/transportationTypeOptions";
import type { FieldConfig } from "@/interfaces/common/FieldConfig";
import { useNavigate } from "@/lib/navigation";
import { agencyService } from "@/services/agency/agencyService";
import { branchService } from "@/services/agency/branchService";
import type { TransportationFormValues } from "@/types/tour/TransportationFormValues";
import { useTourManagement } from "./useTourManagement";

const EMPTY_PAGE = { content: [], page: 0, size: 20, totalElements: 0, totalPages: 0 };
type Field = FieldConfig<TransportationFormValues>;

/** Vehicle registration: agency/branch search, form fields, and submit. Agency staff are always placed in their own agency by the server. */
export function useTransportationCreate() {
  const navigate = useNavigate();
  const { handleCreateTransportation, isMutating } = useTourManagement();
  const [agencyId, setAgencyId] = useState<number>();

  const searchAgencies = useCallback(async (query: string, page: number) => {
    const res = await agencyService.searchAgencies(query, page);
    return { ...res, content: res.content.flatMap((a) => (a.id ? [{ label: a.agencyName, value: a.id }] : [])) };
  }, []);

  const searchBranches = useCallback(async (query: string, page: number) => {
    if (!agencyId) return EMPTY_PAGE;
    const res = await branchService.searchBranches(agencyId, query, page);
    return { ...res, content: res.content.flatMap((b) => (b.id ? [{ label: b.branchName, value: b.id }] : [])) };
  }, [agencyId]);

  const fields = useMemo<Field[]>(() => [
    { name: "agencyId", label: "Owning Agency", type: "search-select", searchOptions: searchAgencies, placeholder: "Search agencies...",
      isRequired: true, gridSpan: 1, clearFieldsOnChange: ["branchId"] },
    { name: "branchId", label: "Operating Branch", type: "search-select", searchOptions: searchBranches, gridSpan: 1,
      disabled: !agencyId, placeholder: agencyId ? "Search branches..." : "Select an agency first" },
    { name: "code", label: "Internal Serial", type: "text", isRequired: true, gridSpan: 1, placeholder: "e.g. BUS-2026-001" },
    { name: "transportationNumber", label: "Plate / Registration", type: "text", isRequired: true, gridSpan: 1, placeholder: "Plate Number" },
    { name: "providerName", label: "Operating Provider", type: "text", isRequired: true, gridSpan: 1, placeholder: "Agency Name" },
    { name: "type", label: "Vehicle Class", type: "select", options: transportationTypeOptions, isRequired: true, gridSpan: 1 },
    { name: "totalCapacity", label: "Maximum Capacity", type: "number", isRequired: true, gridSpan: 1 },
    { name: "seatConfig.PREMIUM_RECLINER" as keyof TransportationFormValues, label: "Premium Seats", type: "number", icon: Star, gridSpan: 1 },
    { name: "seatConfig.WHEELCHAIR_ACCESSIBLE" as keyof TransportationFormValues, label: "Accessible Spaces", type: "number", icon: Accessibility, gridSpan: 1 },
    { name: "seatConfig.KIDS_CHAIR" as keyof TransportationFormValues, label: "Child Safety Seats", type: "number", icon: Baby, gridSpan: 1 },
  ], [searchAgencies, searchBranches, agencyId]);

  const submit = async (values: TransportationFormValues) => {
    await handleCreateTransportation(values);
    navigate(FLEET_PATH);
  };

  const onFieldChange = (name: keyof TransportationFormValues, value: unknown) => {
    if (name === "agencyId") setAgencyId(Number(value) || undefined);
  };

  return { fields, submit, onFieldChange, isMutating, back: () => navigate(FLEET_PATH) };
}

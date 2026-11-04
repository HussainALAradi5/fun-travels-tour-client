import { useCallback, useEffect, useState } from "react";
import type { Agency } from "@/interfaces/agency/Agency";
import type { AgencyBranch } from "@/interfaces/agency/AgencyBranch";
import type { AgencyBranchCreateRequestDto } from "@/dtos/agency/AgencyBranchCreateRequestDto";
import type { User } from "@/interfaces/user/User";
import { agencyService } from "@/services/agency/agencyService";
import { branchService } from "@/services/agency/branchService";

/** One agency with its branches and employees, plus branch creation. */
export function useAgencyDetail(id?: string) {
  const [agency, setAgency] = useState<Agency | null>(null);
  const [branches, setBranches] = useState<AgencyBranch[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBranchDialogOpen, setIsBranchDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [agencyRes, branchRes, employeeRes] = await Promise.all([
        agencyService.getAgencyById(id), branchService.getBranchesByAgency(Number(id)),
        agencyService.getEmployeesByAgency(Number(id)),
      ]);
      setAgency(agencyRes);
      setBranches(branchRes || []);
      setEmployees(employeeRes || []);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  const createBranch = async (branch: AgencyBranchCreateRequestDto) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await branchService.createBranch(Number(id), branch);
      setIsBranchDialogOpen(false);
      await load();
    } finally {
      setIsSubmitting(false);
    }
  };

  return { agency, branches, employees, loading, load, isBranchDialogOpen, setIsBranchDialogOpen, isSubmitting, createBranch };
}

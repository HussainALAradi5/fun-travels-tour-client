import { useState, useEffect, useCallback } from "react";
import { agencyService } from "@/Api/Agency/Agency";
import { branchService } from "@/Api/Agency/AgencyBranch";
import { toaster } from "@/components/ui/toaster";
import type { Agency } from "@/interface/agency/Agency";
import type { AgencyBranch } from "@/interface/agency/AgencyBranch";

export function useAgencies() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isAgencyDialogOpen, setIsAgencyDialogOpen] = useState(false);
  const [isBranchDialogOpen, setIsBranchDialogOpen] = useState(false);
  const [selectedAgencyId, setSelectedAgencyId] = useState<number | null>(null);

  const fetchAgencies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await agencyService.getAllAgencies();
      setAgencies(res || []);
    } catch {
      toaster.create({ title: "Failed to load agencies", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgencies();
  }, [fetchAgencies]);

  const handleCreateAgency = async (data: Agency) => {
    setIsSubmitting(true);
    try {
      await agencyService.createAgency(data);
      setIsAgencyDialogOpen(false);
      fetchAgencies();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Could not create agency";
      toaster.create({ title: "Error", description: msg, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateBranch = async (data: AgencyBranch) => {
    if (!selectedAgencyId) return;
    setIsSubmitting(true);
    try {
      await branchService.createBranch(selectedAgencyId, data);
      toaster.create({ title: "Branch created successfully", type: "success" });
      setIsBranchDialogOpen(false);
      fetchAgencies();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Could not create branch";
      toaster.create({ title: "Error", description: msg, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    agencies,
    loading,
    isSubmitting,
    isAgencyDialogOpen,
    setIsAgencyDialogOpen,
    isBranchDialogOpen,
    setIsBranchDialogOpen,
    selectedAgencyId,
    setSelectedAgencyId,
    fetchAgencies,
    handleCreateAgency,
    handleCreateBranch,
  };
}



import { useState, useEffect, useCallback } from "react";
import { agencyService } from "@/Api/Agency/Agency";
import { branchService } from "@/Api/Agency/AgencyBranch";
import { toaster } from "@/components/ui/toaster";
import type { Agency } from "@/interface/Agency/AgencyInterface";
import type { AgencyBranch } from "@/interface/Agency/AgencyBranchInterface";

export function useAgencies() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dialog States
  const [isAgencyDialogOpen, setIsAgencyDialogOpen] = useState(false);
  const [isBranchDialogOpen, setIsBranchDialogOpen] = useState(false);
  const [selectedAgencyId, setSelectedAgencyId] = useState<number | null>(null);

  const fetchAgencies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await agencyService.getAllAgencies();
      setAgencies(res.data || []);
    } catch (error) {
      toaster.create({ title: "Failed to load agencies", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgencies();
  }, [fetchAgencies]);

  // Handler for creating a new Agency
  const handleCreateAgency = async (data: Agency) => {
    setIsSubmitting(true);
    try {
      await agencyService.createAgency(data);
      setIsAgencyDialogOpen(false);
      fetchAgencies(); // Refresh the list
    } catch (error: any) {
      toaster.create({
        title: "Error",
        description: error.response?.data?.message || "Could not create agency",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for creating a branch within a specific agency
  const handleCreateBranch = async (data: AgencyBranch) => {
    if (!selectedAgencyId) return;
    setIsSubmitting(true);
    try {
      await branchService.createBranch(selectedAgencyId, data);
      toaster.create({ title: "Branch created successfully", type: "success" });
      setIsBranchDialogOpen(false);
      fetchAgencies(); // Refresh to show new branch counts/data
    } catch (error: any) {
      toaster.create({
        title: "Error",
        description: error.response?.data?.message || "Could not create branch",
        type: "error",
      });
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
    handleCreateAgency,
    isBranchDialogOpen,
    setIsBranchDialogOpen,
    selectedAgencyId,
    setSelectedAgencyId,
    handleCreateBranch,
    refreshAgencies: fetchAgencies,
  };
}

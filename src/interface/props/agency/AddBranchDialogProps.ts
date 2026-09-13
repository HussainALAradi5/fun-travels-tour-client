import type { AgencyBranch } from "@/interface/agency/AgencyBranch";

export interface AddBranchDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AgencyBranch) => Promise<void>;
  loading: boolean;
}

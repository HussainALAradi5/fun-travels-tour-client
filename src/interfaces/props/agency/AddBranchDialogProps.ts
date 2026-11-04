import type { AgencyBranch } from "@/interfaces/agency/AgencyBranch";

export interface AddBranchDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AgencyBranch) => Promise<void>;
  loading: boolean;
}

import type { AgencyBranch } from "../../agency/AgencyBranch";

export interface AddBranchDialogProps {
  open: boolean;
  onClose: () => void;
  agencyId: number;
  onSubmit: (data: AgencyBranch) => Promise<void>;
}

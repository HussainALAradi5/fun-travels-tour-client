import type { Agency } from "@/interface/agency/Agency";

export interface AddAgencyDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Agency) => Promise<void>;
  loading: boolean;
}

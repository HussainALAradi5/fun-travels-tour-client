import type { Agency } from "@/interfaces/agency/Agency";

export interface AddAgencyDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Agency) => Promise<void>;
  loading: boolean;
}

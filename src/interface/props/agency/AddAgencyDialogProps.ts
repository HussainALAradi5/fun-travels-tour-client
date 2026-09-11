import type { Agency } from "../../agency/Agency";

export interface AddAgencyDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Agency) => Promise<void>;
}

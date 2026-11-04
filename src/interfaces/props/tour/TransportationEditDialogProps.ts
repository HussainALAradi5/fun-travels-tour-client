import type { TransportationEditForm } from "@/interfaces/tour/TransportationEditForm";
import type { Transportation } from "@/interfaces/tour/Transportation";

export interface TransportationEditDialogProps {
  open: boolean;
  onClose: () => void;
  transport: Transportation | null;
  onUpdate: (values: TransportationEditForm) => Promise<void>;
  loading: boolean;
}

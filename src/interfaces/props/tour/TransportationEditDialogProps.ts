import type { Transportation } from "@/interfaces/tour/Transportation";

export interface TransportationEditDialogProps {
  open: boolean;
  onClose: () => void;
  transport: Transportation | null;
  onUpdate: (values: Transportation) => Promise<void>;
  loading: boolean;
}

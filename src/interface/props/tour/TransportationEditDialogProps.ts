import type { Transportation } from "@/interface/tour/Transportation";

export interface TransportationEditDialogProps {
  open: boolean;
  onClose: () => void;
  transport: Transportation | null;
  onUpdate: (values: Transportation) => Promise<void>;
  loading: boolean;
}

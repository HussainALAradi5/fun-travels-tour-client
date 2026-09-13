import type { Tour } from "@/interface/tour/Tour";
import type { GenericStatus } from "@/enums/GenericStatus";

export interface TourWorkflowSidebarProps {
  tour: Tour;
  onStatusChange: (status: GenericStatus) => Promise<void>;
  onEdit: () => void;
  onCancel: () => Promise<void> | void;
}



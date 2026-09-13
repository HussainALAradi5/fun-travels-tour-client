import type { ProgressType } from "@/enums/ProgressType";
import type { ProgressVariant } from "@/enums/ProgressVariant";

export interface ProgressTypeGalleryProps {
  types: ProgressType[];
  variant: ProgressVariant;
}

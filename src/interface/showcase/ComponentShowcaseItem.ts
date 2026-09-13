import type { ComponentCategory } from "@/enums/ComponentCategory";
import type { ComponentVariant } from "@/enums/ComponentVariant";
import type { ProgressVariant } from "@/enums/ProgressVariant";
import type { ProgressType } from "@/enums/ProgressType";

export interface ComponentShowcaseItem {
  id: number;
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
  importPath: string;
  features: string[];
  variants?: Array<ComponentVariant | ProgressVariant>;
  progressTypes?: ProgressType[];
}

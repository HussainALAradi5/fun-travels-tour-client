import type { ComponentCategory } from "@/enums/ComponentCategory";
import type { ComponentVariant } from "@/enums/ComponentVariant";

export interface ComponentShowcaseItem {
  id: number;
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
  importPath: string;
  features: string[];
  variants?: ComponentVariant[];
}

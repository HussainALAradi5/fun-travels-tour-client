import { ComponentCategory } from "@/enums/ComponentCategory";
import { ComponentVariant } from "@/enums/ComponentVariant";
import { ProgressVariant } from "@/enums/ProgressVariant";
import { ProgressType } from "@/enums/ProgressType";
import type { ComponentShowcaseItem } from "@/interfaces/showcase/ComponentShowcaseItem";

const visualVariants = [ComponentVariant.SUBTLE, ComponentVariant.OUTLINE, ComponentVariant.SOLID, ComponentVariant.ELEVATED];
const progressVariants = [ProgressVariant.SUBTLE, ProgressVariant.SOLID, ProgressVariant.GRADIENT, ProgressVariant.STRIPED, ProgressVariant.MINIMAL];
const progressTypes = [ProgressType.AUTO, ProgressType.DANGER, ProgressType.WARNING, ProgressType.SUCCESS, ProgressType.INFO, ProgressType.NEUTRAL];

export const componentCatalog: ComponentShowcaseItem[] = [
  { id: 1, slug: "hero", name: "Hero", category: ComponentCategory.LAYOUT, description: "Responsive page header with an optional primary action.", importPath: "@/components/ui/custom/Hero", features: ["Responsive", "Optional image", "Action support"] },
  { id: 2, slug: "content-card", name: "Content Card", category: ComponentCategory.LAYOUT, description: "Consistent bordered container with header and footer slots.", importPath: "@/components/ui/custom/ContentCard", features: ["Composable slots", "Theme aware", "Reusable surface"], variants: visualVariants },
  { id: 3, slug: "alert", name: "Alert", category: ComponentCategory.FEEDBACK, description: "Status feedback with close and action support.", importPath: "@/components/ui/custom/AlertComponent", features: ["Four statuses", "Closable", "Custom actions"], variants: visualVariants },
  { id: 4, slug: "empty-state", name: "Empty State", category: ComponentCategory.FEEDBACK, description: "A friendly reusable fallback for empty lists and search results.", importPath: "@/components/ui/custom/EmptyState", features: ["Custom icon", "Optional action", "Accessible copy"], variants: visualVariants },
  { id: 5, slug: "capacity-progress", name: "Capacity Progress", category: ComponentCategory.DATA_DISPLAY, description: "Capacity, percentage, and availability visualization.", importPath: "@/components/ui/custom/CapacityProgress", features: ["Semantic types", "Automatic status", "Percentage", "Units"], variants: progressVariants, progressTypes },
  { id: 6, slug: "metric-card", name: "Metric Card", category: ComponentCategory.DATA_DISPLAY, description: "Compact KPI card for dashboards and summaries.", importPath: "@/components/ui/custom/MetricCard", features: ["Icon support", "Helper text", "Color palette"], variants: visualVariants },
  { id: 7, slug: "status-legend", name: "Status Legend", category: ComponentCategory.DATA_DISPLAY, description: "Shared status-to-color explanation.", importPath: "@/components/ui/custom/StatusLegend", features: ["Dynamic statuses", "Theme aware", "Optional title"] },
  { id: 8, slug: "selected-tags", name: "Selected Tags", category: ComponentCategory.FORM, description: "Removable tags for multi-value filters and selections.", importPath: "@/components/ui/custom/SelectedTags", features: ["Keyboard support", "Remove action", "Option labels"] },
  { id: 9, slug: "date-picker", name: "Date Picker", category: ComponentCategory.FORM, description: "Single-date and date-range selection with highlighted dates between from and to.", importPath: "@/components/ui/custom/DatePicker", features: ["From/to range", "Range shading", "Minimum date", "Month/year navigation"] },
  { id: 10, slug: "unified-filter-bar", name: "Unified Filter Bar", category: ComponentCategory.FORM, description: "Search, filters, result count, and reset in one toolbar.", importPath: "@/components/ui/custom/UnifiedFilterBar", features: ["Explicit search", "Multiple filters", "Reset"] },
  { id: 11, slug: "status-workflow", name: "Status Workflow", category: ComponentCategory.NAVIGATION, description: "Interactive visualization for ordered status transitions.", importPath: "@/components/ui/custom/StatusWorkflow", features: ["Generic statuses", "Async changes", "Read-only mode"] },
  { id: 12, slug: "guided-steps-dialog", name: "Guided Steps Dialog", category: ComponentCategory.NAVIGATION, description: "Reusable dialog for onboarding, instructions, and step-by-step customer guidance.", importPath: "@/components/ui/custom/dialogs/GuidedStepsDialog", features: ["Configurable steps", "Accessible dialog", "Light and dark themes", "Feature-independent"] },
];

export const getComponentShowcaseItem = (slug: string) => componentCatalog.find((item) => item.slug === slug);

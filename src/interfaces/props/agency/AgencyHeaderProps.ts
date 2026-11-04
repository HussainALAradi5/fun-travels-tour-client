import type { Agency } from "../../agency/Agency";

export interface AgencyHeaderProps {
  agency: Agency;
  onAddBranch: () => void;
}

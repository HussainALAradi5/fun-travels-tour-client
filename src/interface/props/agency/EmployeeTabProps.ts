import type { User } from "../../user/User";

export interface EmployeeTabProps {
  agencyId: number;
  employees: User[];
  onRefresh: () => void;
}

import type { User } from "../../user/User";

export interface EmployeeTabProps {
  agencyId: number;
  agencyName: string;
  employees: User[];
  onRefresh: () => void;
}

import type { EmployeeCreateRequestDto } from "@/dtos/user/EmployeeCreateRequestDto";

export interface AddEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeCreateRequestDto) => Promise<void>;
  loading: boolean;
  agencyName?: string;
}

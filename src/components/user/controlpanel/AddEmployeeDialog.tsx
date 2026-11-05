import { UserPlus } from "lucide-react";
import type { EmployeeCreateRequestDto } from "@/dtos/user/EmployeeCreateRequestDto";
import { UserType } from "@/enums/UserType";
import type { FieldConfig } from "@/interfaces/common/FieldConfig";
import { DynamicFormDialog } from "@/components/ui/custom/dialogs/DynamicFormDialog";

import type { AddEmployeeDialogProps } from "@/interfaces/props/agency/AddEmployeeDialogProps";

export function AddEmployeeDialog({
  open,
  onClose,
  onSubmit,
  loading,
  agencyName,
}: AddEmployeeDialogProps) {
  const fields: FieldConfig<EmployeeCreateRequestDto>[] = [
    { name: "name", label: "Full Name", type: "text", isRequired: true },
    { name: "userName", label: "Username", type: "text", isRequired: true },
    { name: "email", label: "Email Address", type: "email", isRequired: true },
    { name: "password", label: "Password", type: "password", isRequired: true },
    { name: "gender", label: "Gender", type: "gender", isRequired: true },
    { name: "mobileNumber", label: "Mobile Number", type: "mobile", isRequired: true },
    { name: "age", label: "Age", type: "number", isRequired: true },
  ];

  // Gender starts unchosen; the form requires it before submitting.
  const initialValues = {
    userName: "", name: "", email: "", password: "", mobileNumber: "", age: 0, userType: UserType.EMPLOYEE,
  } as EmployeeCreateRequestDto;

  return (
    <DynamicFormDialog<EmployeeCreateRequestDto>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
      title="Add New Employee"
      description={agencyName ? `Registering a new staff member for ${agencyName}` : "Register a new staff member"}
      icon={UserPlus}
      fields={fields}
      initialValues={initialValues}
      submitLabel="Create Account"
      infoMessage="The user will be created with 'Employee' permissions and assigned to this agency."
      size="xl"
      columns={2}
    />
  );
}



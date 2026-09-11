import { UserPlus } from "lucide-react";
import type { User } from "@/interface/user/User";
import { DEFAULT_USER } from "@/interface/user/User";
import { UserType } from "@/enums/UserType";
import type { FieldConfig } from "@/interface/common/FieldConfig";
import { DynamicFormDialog } from "@/components/ui/Custom/Dialogs/DynamicFormDialog";

import type { AddEmployeeDialogProps } from "@/interface/props/agency/AddEmployeeDialogProps";

export function AddEmployeeDialog({
  open,
  onClose,
  onSubmit,
  loading,
  agencyName,
}: AddEmployeeDialogProps) {
  const fields: FieldConfig<User>[] = [
    { name: "name", label: "Full Name", type: "text", isRequired: true },
    { name: "userName", label: "Username", type: "text", isRequired: true },
    { name: "email", label: "Email Address", type: "email", isRequired: true },
    { name: "password", label: "Password", type: "password", isRequired: true },
    { name: "mobileNumber", label: "Mobile Number", type: "text", isRequired: true },
    { name: "age", label: "Age", type: "number", isRequired: true },
  ];

  const initialValues: User = {
    ...DEFAULT_USER,
    userType: UserType.EMPLOYEE,
    active: true,
  };

  return (
    <DynamicFormDialog<User>
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



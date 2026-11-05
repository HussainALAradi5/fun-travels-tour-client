import { DynamicFormDialog } from "@/components/ui/custom/dialogs/DynamicFormDialog";
import type { FieldConfig } from "@/interfaces/common/FieldConfig";
import { UserCircle, Phone, Image as ImageIcon, Trash2 } from "lucide-react";

import type { EditProfileProps } from "@/interfaces/props/ui/EditProfileProps";

export const EditProfile = ({ open, onClose, onSubmit, loading, initialValues }: EditProfileProps) => {
  const fields: FieldConfig<Record<string, unknown>>[] = [
    // Only name, gender, mobile, age, and photo can change here; email and password have their own flows.
    { name: "name", label: "Full Name", type: "text", icon: UserCircle, isRequired: true, gridSpan: 2 },
    { name: "userName", label: "Username", type: "text", disabled: true, gridSpan: 1 },
    { name: "email", label: "Email Address", type: "email", disabled: true, gridSpan: 1 },
    { name: "gender", label: "Gender", type: "gender", isRequired: true, gridSpan: 2 },
    { name: "mobileNumber", label: "Mobile Number", type: "mobile", icon: Phone, isRequired: true, gridSpan: 1 },
    { name: "age", label: "Age", type: "number", isRequired: true, gridSpan: 1 },
    { name: "base64Image", label: "Upload Photo", type: "file", icon: ImageIcon, gridSpan: 1 },
    { name: "removeImage", label: "Remove Profile Picture", type: "checkbox", icon: Trash2, gridSpan: 1 }
  ];

  const formInitialValues = {
    ...initialValues,
    removeImage: false
  };

  return (
    <DynamicFormDialog<Record<string, unknown>>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
      title="Edit Profile"
      description="Update your personal details. To add funds, use the Top-Up button on your profile."
      icon={UserCircle}
      fields={fields}
      initialValues={formInitialValues}
      submitLabel="Save Changes"
      size="lg"
      columns={2}
    />
  );
};


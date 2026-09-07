import { GenericFormDialog } from "@/components/ui/Custom/Dialogs/GenericFormDialog";
import type { User } from "@/interface/UserInterface";
import type { FieldConfig } from "@/utilities/FormTypes";
import { UserCircle, Lock, Phone, Image as ImageIcon, Link, Trash2 } from "lucide-react";

interface EditProfileProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  initialValues: User;
}

export const EditProfile = ({ open, onClose, onSubmit, loading, initialValues }: EditProfileProps) => {
  const fields: FieldConfig<any>[] = [
    { name: "userName", label: "Username", type: "text", disabled: true, gridSpan: 1 },
    { name: "email", label: "Email Address", type: "email", disabled: true, gridSpan: 1 },
    { name: "mobileNumber", label: "Mobile Number", type: "mobile", icon: Phone, isRequired: true, gridSpan: 1 },
    { name: "age", label: "Age", type: "number", isRequired: true, gridSpan: 1 },
    { name: "password", label: "New Password", type: "password", placeholder: "Leave blank to keep current", icon: Lock, gridSpan: 2 },
    { name: "profileImageUrl", label: "Image URL (Link)", type: "text", icon: Link, gridSpan: 2 },
    { name: "base64Image", label: "Upload Photo", type: "file", icon: ImageIcon, gridSpan: 1 },
    { name: "removeImage", label: "Remove Profile Picture", type: "checkbox", icon: Trash2, gridSpan: 1 }
  ];

  const formInitialValues = {
    ...initialValues,
    password: "",
    removeImage: false
  };

  return (
    <GenericFormDialog<any>
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
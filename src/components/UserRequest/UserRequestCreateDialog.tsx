import { GenericFormDialog } from "../ui/Custom/Dialogs/GenericFormDialog";
import { Plus } from "lucide-react";
import type { UserRequest } from "@/interface/support/UserRequest";
import type { UserRequestCreateDialogProps } from "@/interface/props/user/UserRequestCreateDialogProps";

export const UserRequestCreateDialog = ({ open, onClose, onSubmit, loading, currentUserId }: UserRequestCreateDialogProps) => {
  return (
    <GenericFormDialog<UserRequest>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
      title="Create User Request"
      description="Submit a support ticket or a new suggestion for the platform."
      icon={Plus}
      initialValues={{ 
        title: "",
        description: "",
        type: "SUPPORT" as UserRequest["type"],
        status: "PENDING" as UserRequest["status"],
        user: { id: currentUserId } 
      } as UserRequest}
      fields={[
        { name: "title", label: "Subject / Title", type: "text", isRequired: true },
        { 
          name: "type", 
          label: "Request Category", 
          type: "select", 
          options: [
            { label: "Technical Support", value: "SUPPORT" },
            { label: "New Suggestion", value: "SUGGESTION" }
          ], 
          isRequired: true 
        },
        { name: "description", label: "Detailed Information", type: "textarea", isRequired: true },
      ]}
      submitLabel="Submit Request"
    />
  );
};

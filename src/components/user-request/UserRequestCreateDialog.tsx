import { DynamicFormDialog } from "../ui/custom/dialogs/DynamicFormDialog";
import { Plus } from "lucide-react";
import type { UserRequestCreateRequest } from "@/interfaces/support/UserRequestCreateRequest";
import { UserRequestType } from "@/enums/user-request/UserRequestType";
import type { UserRequestCreateDialogProps } from "@/interfaces/props/user/UserRequestCreateDialogProps";

export const UserRequestCreateDialog = ({ open, onClose, onSubmit, loading }: UserRequestCreateDialogProps) => {
  return (
    <DynamicFormDialog<UserRequestCreateRequest>
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
        type: UserRequestType.SUPPORT,
      }}
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

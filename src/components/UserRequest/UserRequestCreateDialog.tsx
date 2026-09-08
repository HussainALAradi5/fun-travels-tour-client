import { DEFAULT_USER_REQUEST, type UserRequest } from "@/interface";
import { Plus } from "lucide-react";
import { GenericFormDialog } from "../ui/Custom/Dialogs/GenericFormDialog";
import { UserRequestType } from "@/enums/UserRequest/UserRequestType";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserRequest) => Promise<void>;
  loading: boolean;
  currentUserId: number;
}

export const UserRequestCreateDialog = ({ open, onClose, onSubmit, loading, currentUserId }: Props) => {
  return (
    <GenericFormDialog<UserRequest>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
      title="Create User Request"
      description="Submit a support ticket or a new suggestion for the platform."
      icon={Plus}
      // Fixed: Explicitly cast to UserRequest and provided fallback for strings
      initialValues={{ 
        ...DEFAULT_USER_REQUEST, 
        title: "",
        description: "",
        user: { id: currentUserId } as any 
      } as UserRequest}
      fields={[
        { name: "title", label: "Subject / Title", type: "text", isRequired: true },
        { 
          name: "type", 
          label: "Request Category", 
          type: "select", 
          options: [
            { label: "Technical Support", value: UserRequestType.SUPPORT },
            { label: "New Suggestion", value: UserRequestType.SUGGESTION }
          ], 
          isRequired: true 
        },
        { name: "description", label: "Detailed Information", type: "textarea", isRequired: true },
      ]}
      submitLabel="Submit Request"
    />
  );
};

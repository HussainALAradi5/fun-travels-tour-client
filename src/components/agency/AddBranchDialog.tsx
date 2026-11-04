import { useMemo } from "react";
import { branchFields } from "@/constants/agency/agencyForms";
import { useRoleOptions } from "@/hooks/user/useRoleOptions";
import type { AgencyBranch } from "@/interfaces/agency/AgencyBranch";
import type { AddBranchDialogProps } from "@/interfaces/props/agency/AddBranchDialogProps";
import { userService } from "@/services/user/userService";
import { DynamicFormDialog } from "../ui/custom/dialogs/DynamicFormDialog";

const INITIAL = { branchName: "", branchAddress: "", contactNumber: "" };

export function AddBranchDialog({ open, onClose, onSubmit, loading }: AddBranchDialogProps) {
  const managers = useRoleOptions(open, userService.getManagers);
  const fields = useMemo(() => branchFields(managers), [managers]);
  return (
    <DynamicFormDialog<Record<string, unknown>> open={open} onClose={onClose} loading={loading} fields={fields} initialValues={INITIAL}
      title="Add New Branch" description="Register a physical location and assign management." submitLabel="Create Branch" size="md"
      infoMessage="The branch uses the agency's country and city."
      onSubmit={async (form) => {
        // Mirrors the server AgencyBranchCreateRequest.
        await onSubmit({
          branchName: form.branchName, branchAddress: form.branchAddress, contactNumber: form.contactNumber,
          branchManagerId: Number(form.branchManagerId) || undefined,
        } as unknown as AgencyBranch);
      }} />
  );
}

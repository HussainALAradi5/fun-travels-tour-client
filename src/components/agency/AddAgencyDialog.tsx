import { useMemo } from "react";
import { agencyFields } from "@/constants/agency/agencyForms";
import { useCountryCityOptions } from "@/hooks/countries-and-cities/useCountryCityOptions";
import { useRoleOptions } from "@/hooks/user/useRoleOptions";
import type { Agency } from "@/interfaces/agency/Agency";
import type { AddAgencyDialogProps } from "@/interfaces/props/agency/AddAgencyDialogProps";
import { userService } from "@/services/user/userService";
import { DynamicFormDialog } from "../ui/custom/dialogs/DynamicFormDialog";

const INITIAL = { agencyName: "", address: "", contactNumber: "", ownerMobileNumber: "" };
const idOrNull = (value: unknown) => Number(value) || null;

export function AddAgencyDialog({ open, onClose, onSubmit, loading }: AddAgencyDialogProps) {
  const location = useCountryCityOptions(open);
  const owners = useRoleOptions(open, userService.getOwners);
  const fields = useMemo(() => agencyFields(location.countries, location.cities, owners, Boolean(location.countryId)),
    [location.countries, location.cities, owners, location.countryId]);
  return (
    <DynamicFormDialog<Record<string, unknown>> open={open} onClose={onClose} loading={loading} fields={fields} initialValues={INITIAL}
      title="Register New Agency" description="Create a new headquarters and assign an owner to manage the network."
      onFieldChange={(name, value) => name === "countryId" && location.selectCountry(value)}
      onSubmit={async (form) => {
        // Mirrors the server AgencyCreateRequest.
        await onSubmit({
          agencyName: form.agencyName, address: form.address, contactNumber: form.contactNumber,
          ownerMobileNumber: form.ownerMobileNumber, countryId: idOrNull(form.countryId), cityId: idOrNull(form.cityId),
          agencyOwnerId: idOrNull(form.agencyOwnerId),
        } as unknown as Agency);
      }} />
  );
}

import { useEffect, useState, useMemo } from "react";
import { Building2 } from "lucide-react";
import { countryService } from "@/Api/Country";
import { cityService } from "@/Api/City";
import { userService } from "@/Api/User";
import { UserType } from "@/enums/UserType";
import type { Agency } from "@/interface/agency/Agency";
import type { User } from "@/interface/user/User";
import type { Country } from "@/interface/geography/Country";
import type { City } from "@/interface/geography/City";

const DEFAULT_AGENCY: Partial<Agency> = {
  agencyName: "",
  address: "",
  contactNumber: "",
  ownerMobileNumber: "",
  active: true,
};
import type { FieldConfig } from "@/interface/common/FieldConfig";
import { GenericFormDialog } from "../ui/Custom/Dialogs/GenericFormDialog";

import type { AgencyPayload } from "@/interface/agency/AgencyPayload";
import type { SelectOption } from "@/interface/common/SelectOption";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Agency) => Promise<void>;
  loading: boolean;
}

export function AddAgencyDialog({ open, onClose, onSubmit, loading }: Props) {
  const [users, setUsers] = useState<SelectOption[]>([]);
  const [countries, setCountries] = useState<SelectOption[]>([]);
  const [cities, setCities] = useState<SelectOption[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(
    null,
  );

  // 1. Fetch Countries and Users (Potential Owners)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [countriesRes, usersRes] = await Promise.all([
          countryService.getAllCountries(),
          userService.getAllUsers(),
        ]);

        const countryData = countriesRes || [];
        if (countryData) {
          setCountries(
            countryData.map((c: Country) => ({
              label: c.famousName || c.officialName || "Unknown Country",
              value: String(c.id),
            })),
          );
        }

        const userData = usersRes || [];
        if (userData) {
          setUsers(
            userData.map((u: User) => ({
              label: u.userName || u.name || "Unnamed User",
              value: String(u.id),
            })),
          );
        }
      } catch (error: unknown) {
        console.error("Failed to fetch initial form data:", error);
      }
    };

    if (open) {
      fetchInitialData();
    }
  }, [open]);

  // 2. Fetch Cities whenever the Country selection changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedCountryId) {
        setCities([]);
        return;
      }

      try {
        const res = await cityService.getCitiesByCountry(
          Number(selectedCountryId),
        );
        const cityData = res || [];
        if (cityData) {
          setCities(
            cityData.map((c: City) => ({
              label: c.name,
              value: String(c.id),
            })),
          );
        }
      } catch (error: unknown) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, [selectedCountryId]);

  const formFields = useMemo<FieldConfig<Agency>[]>(
    () => [
      {
        name: "agencyName",
        label: "Agency Name",
        type: "text",
        placeholder: "e.g. Global Logistics HQ",
        isRequired: true,
      },
      {
        name: "countryId",
        label: "Country",
        type: "search-select",
        options: countries,
        isRequired: true,
        gridSpan: 1,
      },
      {
        name: "cityId",
        label: "City",
        type: "search-select",
        options: cities,
        gridSpan: 1,
        isRequired: true,
        disabled: !selectedCountryId || cities.length === 0,
        placeholder: !selectedCountryId
          ? "Select a country first"
          : "Select city",
      },
      {
        name: "address",
        label: "HQ Address",
        type: "textarea",
        isRequired: true,
        gridSpan: 2,
      },
      {
        name: "agencyOwnerId",
        label: "Agency Owner",
        type: "search-select",
        options: users,
        isRequired: true,
        gridSpan: 1,
      },
      {
        name: "ownerMobileNumber",
        label: "Owner Mobile Number",
        type: "text",
        gridSpan: 1,
      },
    ],
    [countries, cities, users, selectedCountryId],
  );

  const handleLocalSubmit = async (formData: Agency) => {
    // Transform IDs to proper number types before sending to backend
    const payload: AgencyPayload = {
      agencyName: formData.agencyName,
      address: formData.address,
      contactNumber: formData.contactNumber,
      ownerMobileNumber: formData.ownerMobileNumber,
      active: true,
      userType: UserType.OWNER,
      countryId: formData.countryId ? Number(formData.countryId) : undefined,
      cityId: formData.cityId ? Number(formData.cityId) : undefined,
      agencyOwnerId: formData.agencyOwnerId
        ? Number(formData.agencyOwnerId)
        : undefined,
    };

    await onSubmit(payload as Agency);
  };

  return (
    <GenericFormDialog<Agency>
      open={open}
      onClose={onClose}
      onSubmit={handleLocalSubmit}
      loading={loading}
      title="Register New Agency"
      description="Create a new headquarters and assign an owner to manage the network."
      icon={Building2}
      fields={formFields}
      initialValues={DEFAULT_AGENCY as Agency}
      onFieldChange={(name, value) => {
        if (name === "countryId") {
          setSelectedCountryId(value ? String(value) : null);
        }
      }}
    />
  );
}

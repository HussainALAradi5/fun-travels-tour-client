import { useEffect, useState, useMemo } from "react";
import { MapPinHouse } from "lucide-react";
import { countryService } from "@/Api/Country";
import { cityService } from "@/Api/City";
import { userService } from "@/Api/User";
import type { AgencyBranch } from "@/interface/agency/AgencyBranch";

const DEFAULT_BRANCH: Partial<AgencyBranch> = {
  branchName: "",
  branchAddress: "",
  contactNumber: "",
  active: true,
};
import type { FieldConfig } from "@/interface/common/FieldConfig";
import type { Country } from "@/interface/geography/Country";
import type { City } from "@/interface/geography/City";
import type { User } from "@/interface/user/User";
import { GenericFormDialog } from "../ui/Custom/Dialogs/GenericFormDialog";

import type { BranchFormData } from "@/interface/agency/BranchFormData";
import type { SelectOption } from "@/interface/common/SelectOption";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AgencyBranch) => Promise<void>;
  loading: boolean;
}

export function AddBranchDialog({ open, onClose, onSubmit, loading }: Props) {
  const [users, setUsers] = useState<SelectOption[]>([]);
  const [countries, setCountries] = useState<SelectOption[]>([]);
  const [cities, setCities] = useState<SelectOption[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(
    null,
  );

  // 1. Load Initial Data (Users and Countries)
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [uRes, cRes] = await Promise.all([
          userService.getAllUsers(),
          countryService.getAllCountries(),
        ]);

        const userData = uRes || [];
        if (userData) {
          setUsers(
            userData.map((u: User) => ({
              label: u.userName || u.name || "Unnamed User",
              value: String(u.id),
            })),
          );
        }

        const countryData = cRes || [];
        if (countryData) {
          setCountries(
            countryData.map((c: Country) => ({
              label: c.famousName || "Unknown Country",
              value: String(c.id),
            })),
          );
        }
      } catch (error: unknown) {
        console.error("Failed to load branch form data:", error);
      }
    };

    if (open) {
      loadInitialData();
    }
  }, [open]);

  // 2. Load Cities when country changes
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
            cityData.map((city: City) => ({
              label: city.name,
              value: String(city.id),
            })),
          );
        }
      } catch (error: unknown) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, [selectedCountryId]);

  const handleInterceptSubmit = async (data: BranchFormData) => {
    // Reconstructing the object to match AgencyBranch interface (nesting the IDs)
    const formattedData: AgencyBranch = {
      branchName: data.branchName,
      branchAddress: data.branchAddress,
      contactNumber: data.contactNumber,
      ownerMobileNumber: data.ownerMobileNumber,
      active: true,
      country: data.country ? { id: Number(data.country) } : undefined,
      city: data.city ? { id: Number(data.city) } : undefined,
      branchManager: data.branchManager
        ? { id: Number(data.branchManager) }
        : undefined,
    };

    await onSubmit(formattedData);
  };

  const formFields = useMemo<FieldConfig<AgencyBranch>[]>(
    () => [
      {
        name: "branchName",
        label: "Branch Name",
        type: "text",
        isRequired: true,
      },
      {
        name: "branchAddress",
        label: "Address",
        type: "text",
      },
      {
        name: "ownerMobileNumber",
        label: "Contact",
        type: "text",
        gridSpan: 1,
      },
      {
        name: "country" as keyof AgencyBranch,
        label: "Country",
        type: "search-select", // Changed to search-select
        options: countries,
        isRequired: true,
        gridSpan: 1,
      },
      {
        name: "city" as keyof AgencyBranch,
        label: "City",
        type: "search-select", // Changed to search-select
        options: cities,
        isRequired: true,
        disabled: !selectedCountryId || cities.length === 0,
        placeholder: !selectedCountryId
          ? "Select country first"
          : "Select city",
        gridSpan: 1,
      },
      {
        name: "branchManager" as keyof AgencyBranch,
        label: "Manager",
        type: "search-select", // Changed to search-select
        options: users,
        placeholder: "Select a manager",
        gridSpan: 1,
      },
    ],
    [countries, cities, users, selectedCountryId],
  );

  return (
    <GenericFormDialog<AgencyBranch>
      open={open}
      onClose={onClose}
      onSubmit={handleInterceptSubmit}
      loading={loading}
      title="Add New Branch"
      description="Register a physical location and assign management."
      icon={MapPinHouse}
      fields={formFields}
      initialValues={DEFAULT_BRANCH as AgencyBranch}
      onFieldChange={(name, value) => {
        // Match the field name 'country' used in formFields
        if (name === "country") {
          setSelectedCountryId(value ? String(value) : null);
        }
      }}
      infoMessage="Cities will load automatically once you select a country."
      submitLabel="Create Branch"
      size="md"
    />
  );
}

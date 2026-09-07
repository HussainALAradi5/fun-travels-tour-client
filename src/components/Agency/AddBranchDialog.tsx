import { useEffect, useState, useMemo } from "react";
import { MapPinHouse } from "lucide-react";
import { countryService } from "@/Api/Country";
import { cityService } from "@/Api/City";
import { userService } from "@/Api/User";
import {
  DEFAULT_BRANCH,
  type AgencyBranch,
} from "@/interface/Agency/AgencyBranchInterface";
import type { FieldConfig } from "@/utilities/FormTypes";
import type { Country } from "@/interface/CountryInterface";
import type { City } from "@/interface/CityInterface";
import type { User } from "@/interface/UserInterface";
import { GenericFormDialog } from "../ui/Custom/Dialogs/GenericFormDialog";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AgencyBranch) => Promise<void>;
  loading: boolean;
}

interface SelectOption {
  label: string;
  value: string;
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

        // Use the same robust check as AddAgencyDialog
        const userData = Array.isArray(uRes) ? uRes : uRes?.data;
        if (userData) {
          setUsers(
            userData.map((u: User) => ({
              label: u.userName || u.name || "Unnamed User",
              value: String(u.id),
            })),
          );
        }

        const countryData = Array.isArray(cRes) ? cRes : cRes?.data;
        if (countryData) {
          setCountries(
            countryData.map((c: Country) => ({
              label: c.famousName || "Unknown Country",
              value: String(c.id),
            })),
          );
        }
      } catch (error) {
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
        const cityData = Array.isArray(res) ? res : res?.data;
        if (cityData) {
          setCities(
            cityData.map((city: City) => ({
              label: city.name,
              value: String(city.id),
            })),
          );
        }
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, [selectedCountryId]);

  const handleInterceptSubmit = async (data: any) => {
    // Reconstructing the object to match AgencyBranch interface (nesting the IDs)
    const formattedData: any = {
      ...data,
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
        name: "country" as any,
        label: "Country",
        type: "search-select", // Changed to search-select
        options: countries,
        isRequired: true,
        gridSpan: 1,
      },
      {
        name: "city" as any,
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
        name: "branchManager" as any,
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

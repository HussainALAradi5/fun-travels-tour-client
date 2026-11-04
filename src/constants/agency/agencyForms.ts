import type { FieldConfig } from "@/interfaces/common/FieldConfig";
import type { SelectOption } from "@/interfaces/common/SelectOption";

type Form = FieldConfig<Record<string, unknown>>;

export const agencyFields = (countries: SelectOption[], cities: SelectOption[], owners: SelectOption[], hasCountry: boolean): Form[] => [
  { name: "agencyName", label: "Agency Name", type: "text", placeholder: "e.g. Global Logistics HQ", isRequired: true },
  { name: "countryId", label: "Country", type: "search-select", options: countries, isRequired: true, gridSpan: 1 },
  { name: "cityId", label: "City", type: "search-select", options: cities, gridSpan: 1, isRequired: true,
    disabled: !hasCountry || cities.length === 0, placeholder: hasCountry ? "Select city" : "Select a country first" },
  { name: "address", label: "HQ Address", type: "textarea", isRequired: true, gridSpan: 2 },
  { name: "contactNumber", label: "Office Contact Number", type: "mobile", gridSpan: 1 },
  { name: "agencyOwnerId", label: "Agency Owner (OWNER role)", type: "search-select", options: owners, isRequired: true, gridSpan: 1 },
  { name: "ownerMobileNumber", label: "Owner Mobile Number", type: "mobile", gridSpan: 1 },
];

/** A branch inherits its agency's country and city, so the form asks only for branch details. */
export const branchFields = (managers: SelectOption[]): Form[] => [
  { name: "branchName", label: "Branch Name", type: "text", isRequired: true },
  { name: "branchAddress", label: "Address", type: "text" },
  { name: "contactNumber", label: "Contact Number", type: "mobile", gridSpan: 1 },
  { name: "branchManagerId", label: "Manager (MANAGER role)", type: "search-select", options: managers, placeholder: "Select a manager", gridSpan: 1 },
];

import type { FieldConfig } from "@/interfaces/common/FieldConfig";
import type { TourEditOptions } from "@/interfaces/tour/TourEditOptions";
import type { TourFormValues } from "@/types/tour/TourFormValues";


export const tourEditFields = ({ countries, transports, startCities, endCities }: TourEditOptions): FieldConfig<TourFormValues>[] => [
  { name: "title", label: "Tour Title", type: "text", isRequired: true, gridSpan: 1 },
  { name: "tourNumber", label: "Tour Code", type: "text", isRequired: true, gridSpan: 1 },
  { name: "basePrice", label: "Base Price ($)", type: "number", isRequired: true, gridSpan: 1 },
  { name: "discountPrice", label: "Sale Discount ($)", type: "number", gridSpan: 1 },
  { name: "totalPrice", label: "Current Total ($)", type: "number", disabled: true, gridSpan: 1 },
  { name: "startDate", label: "Start Date", type: "date", isRequired: true, gridSpan: 1 },
  { name: "numberOfDays", label: "Duration", type: "number", isRequired: true, gridSpan: 1 },
  { name: "maxCapacity", label: "Max Capacity", type: "number", isRequired: true, gridSpan: 1 },
  { name: "transportation", label: "Assigned Transport", type: "search-select", options: transports, gridSpan: 1 },
  { name: "startCountry", label: "Start Country", type: "search-select", options: countries, isRequired: true, gridSpan: 1 },
  { name: "startCity", label: "Start City", type: "search-select", options: startCities, isRequired: true, gridSpan: 1 },
  { name: "endCountry", label: "End Country", type: "search-select", options: countries, isRequired: true, gridSpan: 1 },
  { name: "endCity", label: "End City", type: "search-select", options: endCities, isRequired: true, gridSpan: 1 },
  { name: "destinationCountries", label: "Regional Coverage", type: "multi-select", options: countries, gridSpan: 2 },
  { name: "description", label: "Description", type: "textarea", gridSpan: 2 },
];

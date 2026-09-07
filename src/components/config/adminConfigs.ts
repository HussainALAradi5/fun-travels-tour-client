import type { FieldConfig } from "@/utilities/FormTypes";

// Meal Plan Form Config
export const mealPlanFields: FieldConfig<any>[] = [
  { name: "mealName", label: "Meal Name", type: "text", isRequired: true },
  { name: "mealPrice", label: "Price ($)", type: "number", isRequired: true },
  { name: "mealDescription", label: "Description", type: "textarea" },
  { name: "isVegetarian", label: "Vegetarian", type: "checkbox" },
  { name: "isVegan", label: "Vegan", type: "checkbox" },
  { name: "status", label: "Status", type: "select", options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" }
  ]}
];

// Transportation Form Config
export const transportFields: FieldConfig<any>[] = [
  { name: "transportationNumber", label: "Tracking Number", type: "text", isRequired: true },
  { name: "providerName", label: "Provider (e.g. Qatar Airways)", type: "text", isRequired: true },
  { name: "type", label: "Type", type: "select", options: [
      { label: "Bus", value: "BUS" },
      { label: "Flight", value: "FLIGHT" },
      { label: "Ferry", value: "FERRY" }
  ]},
  { name: "totalCapacity", label: "Capacity", type: "number", isRequired: true }
];
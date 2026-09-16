import type { FieldConfig } from "@/interface/common/FieldConfig";
import type { Transportation } from "@/interface/tour/Transportation";
import type { MealPlan } from "@/interface/tour/MealPlan";

export const mealPlanFields: FieldConfig<MealPlan>[] = [
  { name: "mealName", label: "Meal Name", type: "text", isRequired: true },
  { name: "mealPrice", label: "Price ($)", type: "number", isRequired: true },
  { name: "mealDescription", label: "Description", type: "textarea" },
  { name: "dietaryTypes", label: "Dietary Classifications", type: "multi-select" },
  { name: "status", label: "Status", type: "select", options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" }
  ]}
];

export const transportFields: FieldConfig<Transportation>[] = [
  { name: "transportationNumber", label: "Tracking Number", type: "text", isRequired: true },
  { name: "providerName", label: "Provider (e.g. Qatar Airways)", type: "text", isRequired: true },
  { name: "type", label: "Type", type: "select", options: [
      { label: "Bus", value: "BUS" },
      { label: "Flight", value: "FLIGHT" },
      { label: "Ferry", value: "FERRY" }
  ]},
  { name: "totalCapacity", label: "Capacity", type: "number", isRequired: true }
];

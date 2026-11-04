import type { FieldConfig } from "@/interfaces/common/FieldConfig";
import type { MealPlanFormValues } from "@/interfaces/tour/MealPlanFormValues";
import { MealDietaryType } from "@/enums/tour-management/MealDietaryType";
import { SpiceLevel } from "@/enums/tour-management/SpiceLevel";

const toOptions = (values: string[]) => values.map((value) => ({ value, label: value.replaceAll("_", " ") }));

/** Fields of the add and edit meal dialog. */
export const MEAL_PLAN_FIELDS: FieldConfig<MealPlanFormValues>[] = [
  { name: "mealName", label: "Meal Name", type: "text", isRequired: true, gridSpan: 1 },
  { name: "mealPrice", label: "Price", type: "number", isRequired: true, gridSpan: 1 },
  { name: "mealDescription", label: "Description", type: "textarea", gridSpan: 1 },
  { name: "dietaryTypes", label: "Dietary Classifications", type: "multi-select", gridSpan: 2,
    options: toOptions(Object.values(MealDietaryType)) },
  { name: "spiceLevel", label: "Spice Level", type: "select", gridSpan: 1, isRequired: true,
    options: toOptions(Object.values(SpiceLevel)) },
];

/** Starting values of the add meal dialog. */
export const NEW_MEAL_PLAN: MealPlanFormValues = {
  mealName: "", mealPrice: 0, mealDescription: "", dietaryTypes: [MealDietaryType.STANDARD], spiceLevel: SpiceLevel.NONE,
};

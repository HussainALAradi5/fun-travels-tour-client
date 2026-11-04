import { useCallback, useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { NEW_MEAL_PLAN } from "@/constants/tour/mealPlanFields";
import type { MealPlanCreateRequestDto } from "@/dtos/tour-management/MealPlanCreateRequestDto";
import { GenericStatus } from "@/enums/GenericStatus";
import { MealDietaryType } from "@/enums/tour-management/MealDietaryType";
import type { MealPlan } from "@/interfaces/tour/MealPlan";
import type { MealPlanFormValues } from "@/interfaces/tour/MealPlanFormValues";
import { mealPlanService } from "@/services/tour-management/mealPlanService";

const MEAL_PAGE_SIZE = 100;

const toRequest = (values: MealPlanFormValues): MealPlanCreateRequestDto => ({
  mealName: values.mealName,
  mealPrice: Number(values.mealPrice),
  mealDescription: values.mealDescription,
  dietaryTypes: (values.dietaryTypes.length > 0 ? values.dietaryTypes : [MealDietaryType.STANDARD]) as MealPlanCreateRequestDto["dietaryTypes"],
  spiceLevel: values.spiceLevel as MealPlanCreateRequestDto["spiceLevel"],
});

const toForm = (meal: MealPlan): MealPlanFormValues => ({
  mealName: meal.mealName, mealPrice: meal.mealPrice, mealDescription: meal.mealDescription ?? "",
  dietaryTypes: meal.dietaryTypes, spiceLevel: meal.spiceLevel,
});

/** Meal list with add, edit, and activate/deactivate. */
export function useMealPlans() {
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState<MealPlan | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setMeals((await mealPlanService.getAll({ size: MEAL_PAGE_SIZE })).content);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const openNew = () => { setEditing(null); setDialogOpen(true); };
  const openEdit = (meal: MealPlan) => { setEditing(meal); setDialogOpen(true); };
  const closeDialog = () => setDialogOpen(false);

  const save = async (values: MealPlanFormValues) => {
    setSubmitting(true);
    try {
      if (editing?.id) await mealPlanService.update(editing.id, toRequest(values));
      else await mealPlanService.create(toRequest(values));
      toaster.create({ title: editing ? "Meal updated" : "Meal added", type: "success" });
      setDialogOpen(false);
      await refresh();
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (meal: MealPlan) => {
    const next = meal.status === GenericStatus.ACTIVE ? GenericStatus.INACTIVE : GenericStatus.ACTIVE;
    await mealPlanService.updateStatus(meal.id, next);
    await refresh();
  };

  return {
    meals, loading, submitting, dialogOpen, editing, openNew, openEdit, closeDialog, save, toggleStatus,
    formValues: editing ? toForm(editing) : NEW_MEAL_PLAN,
  };
}

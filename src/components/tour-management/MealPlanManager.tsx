import { Heading, Stack, Box, Text, Group, Button } from "@chakra-ui/react";
import { Utensils, Plus } from "lucide-react";
import { ContentCard } from "../ui/custom/ContentCard";
import { DataTable } from "../ui/custom/DataTable";
import { DynamicFormDialog } from "../ui/custom/dialogs/DynamicFormDialog";
import { MEAL_PLAN_FIELDS } from "@/constants/tour/mealPlanFields";
import { useMealPlans } from "@/hooks/tour-management/useMealPlans";
import { useMealPlanColumns } from "@/hooks/tour-management/useMealPlanColumns";
import type { MealPlan } from "@/interfaces/tour/MealPlan";
import type { MealPlanFormValues } from "@/interfaces/tour/MealPlanFormValues";

export const MealPlanManager = () => {
  const m = useMealPlans();
  const columns = useMealPlanColumns(m.openEdit, m.toggleStatus);

  return (
    <Stack gap={8}>
      <ContentCard
        header={
          <Group justify="space-between" width="full">
            <Box>
              <Heading size="md">Cuisine & Dining</Heading>
              <Text fontSize="sm" color="fg.muted">Define meal packages for your tours</Text>
            </Box>
            <Button size="sm" colorPalette="blue" onClick={m.openNew}>
              <Plus size={16} /> Add Meal
            </Button>
          </Group>
        }
      >
        <DataTable<MealPlan> data={m.meals} loading={m.loading} columns={columns} exportFileName="Meals" enableExport />
      </ContentCard>

      <DynamicFormDialog<MealPlanFormValues>
        key={m.editing?.id ?? "new"}
        open={m.dialogOpen}
        onClose={m.closeDialog}
        title={m.editing ? `Edit ${m.editing.mealName}` : "New Meal Plan"}
        icon={Utensils}
        fields={MEAL_PLAN_FIELDS}
        initialValues={m.formValues}
        onSubmit={m.save}
        loading={m.submitting}
      />
    </Stack>
  );
};

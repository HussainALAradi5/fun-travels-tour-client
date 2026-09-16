import { useState } from "react";
import { mealPlanService } from "@/Api/tourmanagement/MealPlan";
import { Heading, Stack, Badge, Box, Text, Group, Button, useDisclosure } from "@chakra-ui/react";
import { ContentCard } from "../ui/Custom/ContentCard";
import { DataTable } from "../ui/Custom/DataTable";
import { Utensils, Plus } from "lucide-react";
import { useTourManagement } from "@/hooks/tourManagement/useTourManagement";
import { DynamicFormDialog } from "../ui/Custom/Dialogs/DynamicFormDialog";
import type { MealPlan } from "@/interface/tour/MealPlan";
import type { FieldConfig } from "@/interface/common/FieldConfig";

import type { MealPlanFormValues } from "@/interface/tour/MealPlanFormValues";

export const MealPlanManager = () => {
  const { data, loading, refresh } = useTourManagement(mealPlanService.getAll);
  const { open, onOpen, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const fields: FieldConfig<MealPlanFormValues>[] = [
    { name: "mealName", label: "Meal Name", type: "text", isRequired: true, gridSpan: 1},
    { name: "mealPrice", label: "Price", type: "number", isRequired: true, gridSpan: 1 },
    { name: "mealDescription", label: "Description", type: "textarea", gridSpan: 1 },
    { name: "isVegetarian", label: "Vegetarian", type: "checkbox", gridSpan: 1 },
    { name: "isVegan", label: "Vegan", type: "checkbox", gridSpan: 1 },
    { name: "isGlutenFree", label: "Gluten Free", type: "checkbox", gridSpan: 1 },
  ];

  const handleCreate = async (values: MealPlanFormValues) => {
    setSubmitting(true);
    try {
      const payload: MealPlan = {
        mealName: values.mealName,
        mealPrice: values.mealPrice,
        mealDescription: values.mealDescription,
        isVegetarian: values.isVegetarian,
        isVegan: values.isVegan,
        isGlutenFree: values.isGlutenFree,
        status: "ACTIVE",
      };
      await mealPlanService.create(payload);
      await refresh();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack gap={8}>

      <ContentCard
        header={
          <Group justify="space-between" width="full">
            <Box>
              <Heading size="md">Cuisine & Dining</Heading>
              <Text fontSize="sm" color="fg.muted">Define meal packages for your tours</Text>
            </Box>
            <Button size="sm" colorPalette="blue" onClick={onOpen}>
              <Plus size={16} /> Add Meal
            </Button>
          </Group>
        }
      >
        <DataTable<MealPlan>
          data={Array.isArray(data) ? (data as unknown as MealPlan[]).flat() : []}
          loading={loading}
          columns={[
            { header: "Meal Name", key: "mealName" },
            {
              header: "Dietary",
              key: "isVegetarian",
              render: (m) => (
                <Group gap={2}>
                  {m.isVegetarian && <Badge colorPalette="green" variant="surface">Veg</Badge>}
                  {m.isVegan && <Badge colorPalette="purple" variant="surface">Vegan</Badge>}
                  {m.isGlutenFree && <Badge colorPalette="orange" variant="surface">Gluten Free</Badge>}
                  {!m.isVegetarian && !m.isVegan && !m.isGlutenFree && (
                    <Badge colorPalette="gray" variant="surface">Standard</Badge>
                  )}
                </Group>
              )
            },
            { header: "Price", key: "mealPrice", render: (m) => <Text fontWeight="bold">${m.mealPrice}</Text> },
            {
              header: "Status",
              key: "status",
              render: (m) => <Badge colorPalette={m.status === "ACTIVE" ? "blue" : "red"}>{m.status}</Badge>
            }
          ]}
          exportFileName="Meals"
          enableExport
        />
      </ContentCard>

      <DynamicFormDialog<MealPlanFormValues>
        open={open}
        onClose={onClose}
        title="New Meal Plan"
        icon={Utensils}
        fields={fields}
        initialValues={{ isVegetarian: false, isVegan: false, isGlutenFree: false, mealName: "", mealPrice: 0, mealDescription: "" }}
        onSubmit={handleCreate}
        loading={submitting}
      />
    </Stack>
  );
};

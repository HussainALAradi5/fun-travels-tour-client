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
import { MealDietaryType, MealDietaryTypeColor } from "@/enums/tourmanagement/MealDietaryType";
import type { MealPlanCreateRequest } from "@/interface/tour/MealPlanCreateRequest";
import { SpiceLevel, SpiceLevelColor } from "@/enums/tourmanagement/SpiceLevel";

export const MealPlanManager = () => {
  const { data, loading, refresh } = useTourManagement(mealPlanService.getAll);
  const { open, onOpen, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const fields: FieldConfig<MealPlanFormValues>[] = [
    { name: "mealName", label: "Meal Name", type: "text", isRequired: true, gridSpan: 1},
    { name: "mealPrice", label: "Price", type: "number", isRequired: true, gridSpan: 1 },
    { name: "mealDescription", label: "Description", type: "textarea", gridSpan: 1 },
    {
      name: "dietaryTypes",
      label: "Dietary Classifications",
      type: "multi-select",
      gridSpan: 2,
      options: Object.values(MealDietaryType).map((value) => ({
        value,
        label: value.replaceAll("_", " "),
      })),
    },
    {
      name: "spiceLevel",
      label: "Spice Level",
      type: "select",
      gridSpan: 1,
      isRequired: true,
      options: Object.values(SpiceLevel).map((value) => ({
        value,
        label: value.replaceAll("_", " "),
      })),
    },
  ];

  const handleCreate = async (values: MealPlanFormValues) => {
    setSubmitting(true);
    try {
      const selectedTypes = values.dietaryTypes.length > 0
        ? values.dietaryTypes
        : [MealDietaryType.STANDARD];
      const payload: MealPlanCreateRequest = {
        mealName: values.mealName,
        mealPrice: values.mealPrice,
        mealDescription: values.mealDescription,
        dietaryTypes: selectedTypes as MealPlanCreateRequest["dietaryTypes"],
        spiceLevel: values.spiceLevel as MealPlanCreateRequest["spiceLevel"],
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
              key: "dietaryTypes",
              render: (m) => (
                <Group gap={2}>
                  {m.dietaryTypes.map((type) => (
                    <Badge
                      key={type}
                      colorPalette={MealDietaryTypeColor[type]}
                      variant="surface"
                    >
                      {type.replaceAll("_", " ")}
                    </Badge>
                  ))}
                </Group>
              )
            },
            { header: "Price", key: "mealPrice", render: (m) => <Text fontWeight="bold">${m.mealPrice}</Text> },
            {
              header: "Spice",
              key: "spiceLevel",
              render: (m) => (
                <Badge
                  colorPalette={SpiceLevelColor[m.spiceLevel]}
                  variant="surface"
                >
                  {m.spiceLevel.replaceAll("_", " ")}
                </Badge>
              ),
            },
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
        initialValues={{ dietaryTypes: [MealDietaryType.STANDARD], spiceLevel: SpiceLevel.NONE, mealName: "", mealPrice: 0, mealDescription: "" }}
        onSubmit={handleCreate}
        loading={submitting}
      />
    </Stack>
  );
};

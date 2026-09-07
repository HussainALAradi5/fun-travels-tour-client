import { useState } from "react";
import { mealPlanService } from "@/Api/tourmanagement/MealPlan";
import { Heading, Stack, Badge, Box, Text, Group, Button, useDisclosure } from "@chakra-ui/react";
import { GenericCard } from "../ui/Custom/GenericCard";
import { GenericTable } from "../ui/Custom/GenericTable";
import { Utensils, Plus } from "lucide-react";
import type { MealPlan } from "@/interface/tourmanagement/MealPlanInterface";
import { useTourManagement } from "@/hooks/tourManagement/useTourManagement";
import { GenericFormDialog } from "../ui/Custom/Dialogs/GenericFormDialog";

export const MealPlanManager = () => {
  const { data, loading, refresh } = useTourManagement<MealPlan[]>(mealPlanService.getAll);
  const { open, onOpen, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const fields = [
    { name: "mealName", label: "Meal Name", type: "text", required: true, gridSpan: 1},
    { name: "mealPrice", label: "Price", type: "number", required: true, gridSpan: 1 },
    { name: "mealDescription", label: "Description", type: "textarea", gridSpan: 1 },
    { name: "isVegetarian", label: "Vegetarian", type: "checkbox", gridSpan: 1 },
    { name: "isVegan", label: "Vegan", type: "checkbox", gridSpan: 1 },
    
  ] as const;

  const handleCreate = async (values: MealPlan) => {
    setSubmitting(true);
    try {
      await mealPlanService.create(values);
      refresh();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack gap={8}>
      
      <GenericCard 
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
        <GenericTable<MealPlan> 
          data={Array.isArray(data) ? data.flat() : []} 
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
      </GenericCard>

      <GenericFormDialog<MealPlan>
        open={open}
        onClose={onClose}
        title="New Meal Plan"
        icon={Utensils}
        fields={fields as any}
        initialValues={{ isVegetarian: false, isVegan: false, status: "ACTIVE" } as any}
        onSubmit={handleCreate}
        loading={submitting}
      />
    </Stack>
  );
};
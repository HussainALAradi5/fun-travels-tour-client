import { Badge, Button, Group, Text } from "@chakra-ui/react";
import { Pencil, Power } from "lucide-react";
import { GenericStatus } from "@/enums/GenericStatus";
import { MealDietaryTypeColor } from "@/enums/tour-management/MealDietaryType";
import { SpiceLevelColor } from "@/enums/tour-management/SpiceLevel";
import type { Column } from "@/interfaces/common/Column";
import type { MealPlan } from "@/interfaces/tour/MealPlan";
import { formatCurrency } from "@/utilities/formatHelper";

/** Columns of the meals table, with edit and activate/deactivate actions. */
export function useMealPlanColumns(onEdit: (meal: MealPlan) => void, onToggle: (meal: MealPlan) => void): Column<MealPlan>[] {
  return [
    { header: "Meal Name", key: "mealName" },
    { header: "Dietary", key: "dietaryTypes", render: (m) => (
      <Group gap={2}>
        {m.dietaryTypes.map((type) => (
          <Badge key={type} colorPalette={MealDietaryTypeColor[type]} variant="surface">{type.replaceAll("_", " ")}</Badge>
        ))}
      </Group>
    ) },
    { header: "Price", key: "mealPrice", render: (m) => <Text fontWeight="bold">{formatCurrency(m.mealPrice)}</Text> },
    { header: "Spice", key: "spiceLevel", render: (m) => (
      <Badge colorPalette={SpiceLevelColor[m.spiceLevel]} variant="surface">{m.spiceLevel.replaceAll("_", " ")}</Badge>
    ) },
    { header: "Status", key: "status", render: (m) => (
      <Badge colorPalette={m.status === GenericStatus.ACTIVE ? "blue" : "red"}>{m.status}</Badge>
    ) },
    { header: "Actions", key: "actions", render: (m) => (
      <Group gap={1}>
        <Button size="xs" variant="ghost" aria-label={`Edit ${m.mealName}`} onClick={() => onEdit(m)}><Pencil size={14} /> Edit</Button>
        <Button size="xs" variant="ghost" colorPalette={m.status === GenericStatus.ACTIVE ? "red" : "green"}
          aria-label={`${m.status === GenericStatus.ACTIVE ? "Deactivate" : "Activate"} ${m.mealName}`} onClick={() => onToggle(m)}>
          <Power size={14} /> {m.status === GenericStatus.ACTIVE ? "Deactivate" : "Activate"}
        </Button>
      </Group>
    ) },
  ];
}

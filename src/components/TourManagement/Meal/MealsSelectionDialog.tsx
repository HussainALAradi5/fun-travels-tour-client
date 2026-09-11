import { VStack, Button } from "@chakra-ui/react";
import { Utensils } from "lucide-react";
import { GenericDialog } from "@/components/ui/Custom/Dialogs/GenericDialog";
import { MealSelectionList } from "./MealSelectionList";
import type { MealsSelectionDialogProps } from "@/interface/props/tour/MealsSelectionDialogProps";

export const MealsSelectionDialog = ({
  open,
  onClose,
  availableMeals,
  selectedMeals,
  onToggleMeal
}: MealsSelectionDialogProps) => {
  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      title="Dietary Preferences & Meals"
      description="Select add-on meals for this passenger during the tour."
      icon={Utensils}
      colorPalette="green"
      size="lg"
    >
      <VStack align="stretch" gap={6}>
        <MealSelectionList
          availableMeals={availableMeals}
          selectedMeals={selectedMeals}
          onToggleMeal={onToggleMeal}
        />
        <Button
          size="lg"
          colorPalette="green"
          onClick={onClose}
          borderRadius="xl"
        >
          Done
        </Button>
      </VStack>
    </GenericDialog>
  );
};


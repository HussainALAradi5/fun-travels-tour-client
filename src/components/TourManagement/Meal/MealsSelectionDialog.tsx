import { VStack, Button } from "@chakra-ui/react";
import { Utensils } from "lucide-react";
import { GenericDialog } from "@/components/ui/Custom/Dialogs/GenericDialog";
import { MealSelectionList } from "./MealSelectionList";
import type { MealPlan } from "@/interface/tourmanagement/MealPlanInterface";

interface MealsSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  availableMeals: MealPlan[];
  selectedMeals: MealPlan[];
  onToggleMeal: (meal: MealPlan) => void;
}

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
      colorPalette="green" // Using green to differentiate from the blue seat picker
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
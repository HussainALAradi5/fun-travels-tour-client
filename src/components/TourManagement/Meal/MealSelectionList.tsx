import { Box, Heading, HStack, Stack, Text, Badge, Icon, Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import { Utensils, Info } from "lucide-react";
import { CollapsibleContainer } from "@/components/ui/Custom/CollapsibleContainer";
import type { MealPlan } from "@/interface/tourmanagement/MealPlanInterface";

interface MealSelectionListProps {
  availableMeals: MealPlan[];
  selectedMeals: MealPlan[];
  onToggleMeal: (meal: MealPlan) => void;
}

export const MealSelectionList = ({ availableMeals, selectedMeals, onToggleMeal }: MealSelectionListProps) => {
  if (availableMeals.length === 0) return null;

  return (
    <Box>
      <Heading size="md" mb={6} display="flex" alignItems="center" gap={3}>
        <Icon as={Utensils} color="blue.fg" /> Enhance Your Journey
      </Heading>
      
      <Stack gap={4}>
        {availableMeals.map((meal) => {
          const isChecked = selectedMeals.some((m) => m.id === meal.id);
          
          return (
            <Box 
              key={meal.id} 
              p={5} 
              borderWidth="1.5px" 
              borderRadius="2xl" 
              borderColor={isChecked ? "blue.emphasized" : "border.subtle"}  
              bg={isChecked ? "blue.subtle" : "bg.panel"}
              transition="all 0.2s"
              onClick={() => onToggleMeal(meal)}
              cursor="pointer"
              _hover={{ 
                borderColor: isChecked ? "blue.emphasized" : "blue.subtle",
                bg: isChecked ? "blue.muted" : "bg.muted" 
              }}
            >
              <HStack gap={4} align="center">
                <ChakraCheckbox.Root 
                  colorPalette="blue"
                  checked={isChecked}
                  onCheckedChange={() => {}} 
                >
                  <ChakraCheckbox.HiddenInput />
                  <ChakraCheckbox.Control borderRadius="full">
                    <ChakraCheckbox.Indicator />
                  </ChakraCheckbox.Control>
                </ChakraCheckbox.Root>

                <Stack gap={0} flex={1}>
                  <Text fontWeight="bold" fontSize="md" color="fg">
                    {meal.mealName}
                  </Text>
                  <HStack gap={1}>
                    <Icon as={Info} size="sm" color="fg.subtle"/>
                    <Text fontSize="xs" color="fg.subtle">
                      Included in onboard service
                    </Text>
                  </HStack>
                </Stack>
                
                <Badge 
                  variant="subtle" 
                  colorPalette="blue" 
                  size="lg" 
                  borderRadius="lg" 
                  px={4}
                >
                  ${meal.mealPrice}
                </Badge>
              </HStack>

              <CollapsibleContainer isOpen={isChecked} mt={4}>
                {/* Border color uses semantic blue.subtle */}
                <Box pt={2} borderTopWidth="1px" borderColor="blue.subtle">
                   <Text fontSize="sm" color="fg.muted" fontStyle="italic">
                     "{meal.mealDescription}"
                   </Text>
                </Box>
              </CollapsibleContainer>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
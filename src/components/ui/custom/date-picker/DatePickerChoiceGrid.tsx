import { Button, SimpleGrid } from "@chakra-ui/react";
import type { DatePickerChoiceGridProps } from "@/interfaces/props/ui/DatePickerChoiceGridProps";

/** Month or year chooser. */
export const DatePickerChoiceGrid = ({ labels, selectedIndex, onSelect }: DatePickerChoiceGridProps) => (
  <SimpleGrid columns={3} gap={3} pt={2}>
    {labels.map((label, index) => (
      <Button key={label} height="60px" variant={index === selectedIndex ? "solid" : "ghost"} colorPalette="blue"
        onClick={() => onSelect(index)}>
        {label}
      </Button>
    ))}
  </SimpleGrid>
);

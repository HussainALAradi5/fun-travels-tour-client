import { HStack, IconButton, Text } from "@chakra-ui/react";
import { BookOpen, LayoutGrid, List } from "lucide-react";
import { GuidedStepsDialog } from "@/components/ui/custom/dialogs/GuidedStepsDialog";
import { customerTourGuide } from "@/constants/tour/customerTourGuide";
import type { CatalogToolbarProps } from "@/interfaces/props/tour/CatalogToolbarProps";

export const CatalogToolbar = ({ count, viewMode, onViewMode }: CatalogToolbarProps) => (
  <HStack justify="space-between" mb={viewMode === "grid" ? 8 : 4} bg="bg.panel" p={4} borderRadius="xl" shadow="sm" borderWidth="1px">
    <Text fontWeight="bold" fontSize="lg">Available Tours ({count})</Text>
    <HStack gap={2}>
      <GuidedStepsDialog title="How to book a tour" triggerLabel="Booking guide" triggerIcon={BookOpen} steps={customerTourGuide}
        description="Follow these steps to choose a tour and complete your reservation safely."
        finalMessage="Your confirmed reservation and boarding details will be available under My Expeditions." />
      <IconButton aria-label="Grid view" variant={viewMode === "grid" ? "solid" : "ghost"} colorPalette="blue" onClick={() => onViewMode("grid")}>
        <LayoutGrid size={20} />
      </IconButton>
      <IconButton aria-label="Table view" variant={viewMode === "table" ? "solid" : "ghost"} colorPalette="blue" onClick={() => onViewMode("table")}>
        <List size={20} />
      </IconButton>
    </HStack>
  </HStack>
);

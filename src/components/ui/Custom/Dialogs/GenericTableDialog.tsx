// src/components/ui/Custom/Dialogs/GenericTableDialog.tsx
import { Box, VStack } from "@chakra-ui/react";
import type { LucideIcon } from "lucide-react";
import React from "react";
import { GenericDialog } from "./GenericDialog";
import { GenericTable, type GenericTableProps } from "../GenericTable";

interface GenericTableDialogProps<T> {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon: LucideIcon;
  tableProps: GenericTableProps<T>;
  topContent?: React.ReactNode; 
  size?: "md" | "lg" | "xl" | "full";
  colorPalette?: string;
}

export function GenericTableDialog<T extends { id?: number | string | null }>({
  open,
  onClose,
  title,
  description,
  icon,
  tableProps,
  topContent,
  size = "xl",
  colorPalette = "blue",
}: GenericTableDialogProps<T>) {
  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      icon={icon}
      size={size}
      colorPalette={colorPalette}
      scrollBehavior="inside"
    >
      <VStack w="full" align="stretch" gap={6}>
        {/* Render custom filters or metrics above the table */}
        {topContent && <Box w="full">{topContent}</Box>}
        
        {/* The Table Wrapper */}
        <Box 
          borderRadius="2xl" 
          borderWidth="1px" 
          borderColor="border.subtle" 
          shadow="sm" 
          overflow="hidden"
          bg="bg.panel"
        >
          <GenericTable {...tableProps} />
        </Box>
      </VStack>
    </GenericDialog>
  );
}
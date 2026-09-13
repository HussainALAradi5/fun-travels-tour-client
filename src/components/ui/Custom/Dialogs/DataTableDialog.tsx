import { Box, VStack } from "@chakra-ui/react";
import { AppDialog } from "./AppDialog";
import { DataTable } from "../DataTable";
import type { DataTableDialogProps } from "@/interface/props/ui/DataTableDialogProps";

export function DataTableDialog<T extends { id?: number | string | null }>({
  open,
  onClose,
  title,
  description,
  icon,
  tableProps,
  topContent,
  size = "xl",
  colorPalette = "blue",
}: DataTableDialogProps<T>) {
  return (
    <AppDialog
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
{topContent && <Box w="full">{topContent}</Box>}
<Box
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="border.subtle"
          shadow="sm"
          overflow="hidden"
          bg="bg.panel"
        >
          <DataTable {...tableProps} />
        </Box>
      </VStack>
    </AppDialog>
  );
}




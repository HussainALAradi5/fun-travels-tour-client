import { Box } from "@chakra-ui/react";
import type { CollapsibleContainerProps } from "@/interface/props/ui/CollapsibleContainerProps";

export const CollapsibleContainer = ({ isOpen, children, ...props }: CollapsibleContainerProps) => {
  if (!isOpen) return null;

  return (
    <Box
      animation="expand-height 0.3s ease-out forwards"
      overflow="hidden"
      {...props}
    >
      {children}
    </Box>
  );
};
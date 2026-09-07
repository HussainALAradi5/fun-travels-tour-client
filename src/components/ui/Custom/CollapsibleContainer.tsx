import { slideDown } from "@/utilities/Animations";
import { Box, type BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export const CollapsibleContainer = ({ isOpen, children, ...props }: Props) => {
  // We return null when closed to keep the DOM clean
  if (!isOpen) return null;

  return (
    <Box
      animationName={slideDown}
      animationDuration="0.3s"
      animationTimingFunction="ease-out"
      animationFillMode="forwards"
      overflow="hidden"
      {...props}
    >
      {children}
    </Box>
  );
};
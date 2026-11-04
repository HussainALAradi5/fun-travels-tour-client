import { Center, HStack, Icon, Text } from "@chakra-ui/react";
import { Armchair } from "lucide-react";
import type { LegendItemProps } from "@/interfaces/props/tour/LegendItemProps";

export const LegendItem = ({ colorPalette, bg, color, label, icon: IconCmp, fill, opacity = 1 }: LegendItemProps) => {
  const outline = Boolean(colorPalette);
  return (
    <HStack gap={2} opacity={opacity}>
      <Center w={6} h={6} bg={bg || "transparent"} border={outline ? "1px solid" : "none"} borderColor={outline ? `${colorPalette}.400` : "transparent"}
        borderRadius="md" color={color || `${colorPalette}.600`} position="relative">
        {IconCmp && <Icon as={IconCmp} w="10px" h="10px" position="absolute" top="2px" right="2px"
          color={colorPalette ? `${colorPalette}.500` : "inherit"} fill={fill ? "currentColor" : "none"} />}
        <Icon as={Armchair} w="12px" h="12px" />
      </Center>
      <Text fontSize="xs" fontWeight="semibold" color="fg.muted">{label}</Text>
    </HStack>
  );
};

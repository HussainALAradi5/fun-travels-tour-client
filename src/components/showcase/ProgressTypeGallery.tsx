import { Badge, Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { CapacityProgress } from "@/components/ui/Custom/CapacityProgress";
import { ProgressType } from "@/enums/ProgressType";
import type { ProgressTypeGalleryProps } from "@/interface/props/showcase/ProgressTypeGalleryProps";

const progressValues: Record<ProgressType, number> = {
  [ProgressType.AUTO]: 34,
  [ProgressType.DANGER]: 15,
  [ProgressType.WARNING]: 40,
  [ProgressType.SUCCESS]: 82,
  [ProgressType.INFO]: 65,
  [ProgressType.NEUTRAL]: 55,
};

export const ProgressTypeGallery = ({ types, variant }: ProgressTypeGalleryProps) => (
  <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={4}>
    {types.map((type) => (
      <VStack key={type} align="stretch" gap={4} borderWidth="1px" borderRadius="xl" p={4} bg="bg.panel">
        <Box><Badge colorPalette={type === ProgressType.DANGER ? "red" : type === ProgressType.WARNING ? "orange" : type === ProgressType.SUCCESS ? "green" : type === ProgressType.INFO ? "blue" : "gray"}>{type}</Badge></Box>
        <CapacityProgress type={type} variant={variant} value={progressValues[type]} total={100} unit="%" showPercentage showStatusText />
      </VStack>
    ))}
  </SimpleGrid>
);

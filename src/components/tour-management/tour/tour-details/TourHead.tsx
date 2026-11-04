import { Box, Heading, Text, HStack, Icon, Badge, Stack } from "@chakra-ui/react";
import { MapPin, Calendar, Users } from "lucide-react";
import type { TourHeaderProps } from "@/interfaces/props/tour/TourHeadProps";

export const TourHeader = ({ tour }: TourHeaderProps) => {
  return (
    <Box w="full" pb={4}>
      <Stack gap={4}>
        <HStack gap={3}>
          <Badge colorPalette="blue" variant="solid" px={3} borderRadius="full">
            {tour?.status}
          </Badge>
          <Text color="fg.muted" fontSize="sm">
            {tour?.tourNumber}
          </Text>
        </HStack>
<Heading size="3xl" letterSpacing="tight">
          {tour?.title || "Loading Tour..."}
        </Heading>

        <HStack gap={6} color="fg.muted" flexWrap="wrap">
          <HStack gap={1.5}>
            <Icon as={MapPin} size="sm" />
            <Text fontSize="sm">
              {tour?.startCity?.name} to {tour?.endCity?.name}
            </Text>
          </HStack>
          <HStack gap={1.5}>
            <Icon as={Calendar} size="sm" />
            <Text fontSize="sm">{tour?.numberOfDays} Days Trip</Text>
          </HStack>
          <HStack gap={1.5}>
            <Icon as={Users} size="sm" />
            <Text fontSize="sm">{tour?.availableSlots} Slots left</Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  );
};


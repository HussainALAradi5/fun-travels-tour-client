// src/components/TourManagement/Tour/TourDetails/TourHead.tsx
import { Box, Heading, Text, HStack, Icon, Badge, Stack } from "@chakra-ui/react";
import { MapPin, Calendar, Users } from "lucide-react";
import type { Tour } from "@/interface/tourmanagement/TourInterface";

interface TourHeaderProps {
  tour: Tour | null;
}

export const TourHeader = ({ tour }: TourHeaderProps) => {
  return (
    <Box w="full" pb={4}>
      <Stack gap={4}>
        <HStack gap={3}>
          <Badge colorPalette="blue" variant="solid" px={3} borderRadius="full">
            Reservation
          </Badge>
          <Text color="fg.muted" fontSize="sm">
            Step 1: Choose your comfort
          </Text>
        </HStack>

        {/* Property 'tracking' fixed to 'letterSpacing' for V3 */}
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
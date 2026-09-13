import { Box, VStack, Text, Heading, Icon, Circle, Separator, HStack } from "@chakra-ui/react";
import { MapPin, Navigation, Clock } from "lucide-react";
import type { BookingTourOverviewProps } from "@/interface/props/booking/BookingTourOverviewProps";

export const BookingTourOverview = ({ tour }: BookingTourOverviewProps) => (
  <Box p={6} borderRadius="3xl" bg="blue.600" color="white" h="full">
    <VStack align="start" gap={8}>
      <VStack align="start" gap={1}>
        <Text fontSize="xs" fontWeight="black" opacity={0.6} letterSpacing="widest">TOUR DETAILS</Text>
        <Heading size="lg" letterSpacing="tight">{tour?.title}</Heading>
      </VStack>

      <Separator opacity={0.3} />

      <VStack align="start" gap={6} w="full">
        <HStack gap={4}>
          <Circle size="8" bg="white/10"><Icon as={MapPin} size="sm" /></Circle>
          <VStack align="start" gap={0}>
            <Text fontSize="2xs" opacity={0.6}>DEPARTURE</Text>
            <Text fontWeight="bold" fontSize="sm">{tour?.startCity?.name}</Text>
          </VStack>
        </HStack>

        <HStack gap={4}>
          <Circle size="8" bg="white/10"><Icon as={Navigation} size="sm" /></Circle>
          <VStack align="start" gap={0}>
            <Text fontSize="2xs" opacity={0.6}>DESTINATION</Text>
            <Text fontWeight="bold" fontSize="sm">{tour?.endCity?.name}</Text>
          </VStack>
        </HStack>

        <HStack gap={4}>
          <Circle size="8" bg="white/10"><Icon as={Clock} size="sm" /></Circle>
          <VStack align="start" gap={0}>
            <Text fontSize="2xs" opacity={0.6}>DURATION</Text>
            <Text fontWeight="bold" fontSize="sm">{tour?.numberOfDays} Adventure Days</Text>
          </VStack>
        </HStack>
      </VStack>

      <Box bg="white/10" p={4} borderRadius="2xl" w="full">
        <Text fontSize="xs" fontWeight="medium">
          "Experience the finest route through the heart of the region. Selection of seats allows for panoramic views."
        </Text>
      </Box>
    </VStack>
  </Box>
);





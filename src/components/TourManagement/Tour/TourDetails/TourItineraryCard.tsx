import { Box, Flex, HStack, VStack, Heading, Text, Icon, Separator, Circle, Button } from "@chakra-ui/react";
import { Navigation, ArrowRight, Bus, LayoutDashboard } from "lucide-react";
import { GenericCard } from "@/components/ui/Custom/GenericCard";
import { GenericTracking, type TrackingItem } from "@/components/ui/Custom/GenericTracking";
import { glowPulse } from "@/utilities/Animations";
import type { Tour } from "@/interface";

interface TourItineraryCardProps {
  tour: Tour;
  itinerarySteps: TrackingItem[];
  onSeatOpen: () => void;
}

export const TourItineraryCard = ({ tour, itinerarySteps, onSeatOpen }: TourItineraryCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <GenericCard 
      header={
        <HStack gap="3">
          <Icon as={Navigation} color="blue.500" animation={`${glowPulse} 2s infinite`} />
          <VStack align="start" gap="0">
            <Heading size="md">Itinerary Tracker</Heading>
            <Text fontSize="xs" color="fg.muted">Dynamic Route Management</Text>
          </VStack>
        </HStack>
      }
    >
      <Flex direction={{ base: "column", md: "row" }} gap="10">
        <Box flex="1.2">
          <GenericTracking items={itinerarySteps} initialVisibleMiddle={2} animate={true} />
        </Box>
        <Separator orientation="vertical" display={{ base: "none", md: "block" }} />
        <VStack align="start" gap="6" flex="1">
          <Box w="full">
            <Text fontSize="xs" fontWeight="black" color="fg.muted" mb="2">PERIOD</Text>
            <HStack justify="space-between" bg="bg.muted" p="3" borderRadius="lg">
              <VStack align="start" gap="0">
                <Text fontSize="2xs">FROM</Text>
                <Text fontSize="xs" fontWeight="bold">{formatDate(tour.startDate)}</Text>
              </VStack>
              <Icon as={ArrowRight} size="xs" />
              <VStack align="end" gap={0}>
                <Text fontSize="2xs">TO</Text>
                <Text fontSize="xs" fontWeight="bold">{formatDate(tour.endDate)}</Text>
              </VStack>
            </HStack>
          </Box>
          <Box w="full">
            <Text fontSize="xs" fontWeight="black" color="fg.muted" mb="2">LOGISTICS</Text>
            <HStack p="3" borderRadius="xl" borderWidth="1px" bg="bg.panel" mb={4}>
              <Circle size="8" bg="orange.500/10"><Icon as={Bus} color="orange.500" size="sm" /></Circle>
              <VStack align="start" gap={0}>
                <Text fontSize="xs" fontWeight="bold">{tour.transportation?.type || 'Standard Coach'}</Text>
                <Text fontSize="2xs" color="fg.muted">{tour.transportation?.code || 'TR-UNASSIGNED'}</Text>
              </VStack>
            </HStack>
            {tour.transportation?.id && (
              <GenericCard border="1px dashed" borderColor="blue.500/30" p="3" _hover={{ bg: "blue.500/5", cursor: "pointer" }} onClick={onSeatOpen}>
                <HStack justify="space-between">
                  <VStack align="start" gap="0">
                    <Text fontSize="2xs" fontWeight="black" color="blue.600">INVENTORY</Text>
                    <Text fontSize="xs" fontWeight="bold">Seat Mapping</Text>
                  </VStack>
                  <Button size="xs" colorPalette="blue" variant="ghost"><Icon as={LayoutDashboard} /></Button>
                </HStack>
              </GenericCard>
            )}
          </Box>
        </VStack>
      </Flex>
    </GenericCard>
  );
};

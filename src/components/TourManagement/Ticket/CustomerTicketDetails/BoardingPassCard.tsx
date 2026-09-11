import { Box, HStack, VStack, Text, Heading, Icon, Circle, Badge, Flex, Image } from "@chakra-ui/react";
import { Plane, Calendar, Armchair, Ticket as TicketIcon } from "lucide-react";
import { ticketDropIn } from "@/utilities/Animations";
import type { Ticket } from "@/interface/tour/Ticket";

export const BoardingPassCard = ({ ticket }: { ticket: Ticket }) => {
  const tour = ticket.tour;

  const formatDisplayDate = (dateString?: string) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Box 
      animation={`${ticketDropIn} 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)`}
      maxW="4xl" 
      mx="auto"
      w="full"
    >
      <Flex 
        direction={{ base: "column", md: "row" }}
        bg="bg.panel"
        borderRadius="3xl"
        shadow="2xl"
        borderWidth="1px"
        borderColor="whiteAlpha.200"
        position="relative"
        overflow="hidden"
        backdropFilter="blur(10px)"
      >
        {/* Left Section: Main Info */}
        <Box flex="2" p={8} borderRight={{ md: "2px dashed" }} borderColor="border.subtle">
          
          {/* Header */}
          <HStack justify="space-between" mb={10} wrap="wrap" gap={4}>
            <HStack gap={4}>
              <Circle size="12" bg="blue.600" shadow="0 0 15px rgba(37, 99, 235, 0.4)">
                <Icon as={Plane} color="white" />
              </Circle>
              <VStack align="start" gap={0}>
                <Text fontSize="xs" fontWeight="black" color="blue.500" letterSpacing="0.2em">BOARDING PASS</Text>
                <Heading size="md" lineClamp={1}>{tour?.title}</Heading>
              </VStack>
            </HStack>
            <Badge colorPalette="green" variant="solid" px={3} py={1} borderRadius="full">
              {ticket.ticketStatus}
            </Badge>
          </HStack>

          {/* Route Section */}
          <HStack justify="space-between" mb={8} align="center">
            {/* Origin */}
            <VStack align="start" gap={1} flex="1">
              <Text fontSize="2xs" color="fg.muted" fontWeight="black" letterSpacing="wider">DEPARTURE</Text>
              <Heading size="xl" letterSpacing="tight" lineClamp={1} mb={1}>{tour?.startCity?.name || "TBD"}</Heading>
              
              {/* DEPARTURE BADGE - BLUE */}
              <Badge colorPalette="blue" variant="surface" borderRadius="full" px={2} py={0.5}>
                <HStack gap={1.5}>
                  {tour?.startCountry?.flagPngUrl && (
                    <Image src={tour.startCountry.flagPngUrl} h="10px" w="15px" borderRadius="xs" alt="" />
                  )}
                  <Text fontSize="xs" fontWeight="bold">
                    {tour?.startCountry?.officialName || "TBD"}
                  </Text>
                </HStack>
              </Badge>
              
              <Badge colorPalette="gray" variant="subtle" mt={1} size="sm">
                {formatDisplayDate(tour?.startDate)}
              </Badge>
            </VStack>
            
            {/* Flight Path */}
            <VStack flex="1" px={4} position="relative" align="center" justify="center">
               <Box w="full" h="2px" borderTop="2px dashed" borderColor="blue.300" />
               <Icon as={Plane} color="blue.500" position="absolute" bg="bg.panel" px={1} boxSize={8} />
            </VStack>

            {/* Destination */}
            <VStack align="end" gap={1} flex="1">
              <Text fontSize="2xs" color="fg.muted" fontWeight="black" letterSpacing="wider">ARRIVAL</Text>
              <Heading size="xl" letterSpacing="tight" lineClamp={1} mb={1}>{tour?.endCity?.name || "TBD"}</Heading>
              
              {/* ARRIVAL BADGE - GREEN */}
              <Badge colorPalette="green" variant="surface" borderRadius="full" px={2} py={0.5}>
                <HStack gap={1.5}>
                  <Text fontSize="xs" fontWeight="bold">
                    {tour?.endCountry?.officialName || "TBD"}
                  </Text>
                  {tour?.endCountry?.flagPngUrl && (
                    <Image src={tour.endCountry.flagPngUrl} h="10px" w="15px" borderRadius="xs" alt="" />
                  )}
                </HStack>
              </Badge>
              
              <Badge colorPalette="gray" variant="subtle" mt={1} size="sm">
                {formatDisplayDate(tour?.endDate)}
              </Badge>
            </VStack>
          </HStack>

          {/* Bottom Details */}
          <HStack gap={10} pt={4} borderTop="1px solid" borderColor="border.subtle">
            <HStack gap={3}>
              <Circle size="8" bg="blue.50" color="blue.600">
                <Icon as={Calendar} size="sm" />
              </Circle>
              <VStack align="start" gap={0}>
                <Text fontSize="10px" color="fg.muted" fontWeight="bold">BOOKED ON</Text>
                <Text fontSize="sm" fontWeight="bold">{formatDisplayDate(ticket.bookingDate)}</Text>
              </VStack>
            </HStack>
            <HStack gap={3}>
              <Circle size="8" bg="blue.50" color="blue.600">
                <Icon as={Armchair} size="sm" />
              </Circle>
              <VStack align="start" gap={0}>
                <Text fontSize="10px" color="fg.muted" fontWeight="bold">SEAT</Text>
                <Text fontSize="sm" fontWeight="bold">{ticket.assignedSeat?.seatCode || "TBD"}</Text>
              </VStack>
            </HStack>
          </HStack>
        </Box>

        {/* Right Section: The Stub */}
        <Box flex="1" bg="blue.600" p={8} color="white" display="flex" flexDirection="column" justifyContent="space-between" position="relative">
          <Circle size="6" bg="bg.panel" position="absolute" top="-3" left="-3" display={{ base: "none", md: "block" }} />
          <Circle size="6" bg="bg.panel" position="absolute" bottom="-3" left="-3" display={{ base: "none", md: "block" }} />

          <VStack align="start" gap={6} h="full" justify="center" zIndex={1}>
            <VStack align="start" gap={0} w="full">
              <Text fontSize="10px" opacity={0.8} fontWeight="bold" letterSpacing="widest">PASSENGER</Text>
              <Text fontWeight="black" fontSize="lg" lineClamp={1}>{ticket.customer?.name || "Guest"}</Text>
            </VStack>
            
            <VStack align="start" gap={0} w="full">
              <Text fontSize="10px" opacity={0.8} fontWeight="bold" letterSpacing="widest">TICKET NUMBER</Text>
              <Text fontFamily="monospace" fontSize="md" fontWeight="bold" bg="whiteAlpha.200" px={2} py={1} borderRadius="md" mt={1}>
                {ticket.ticketNumber}
              </Text>
            </VStack>
          </VStack>

          <Box pt={6} borderTop="1px dashed" borderColor="whiteAlpha.400" mt={6} zIndex={1}>
             <HStack justify="space-between" align="flex-end">
                <Icon as={TicketIcon} size="2xl" opacity={0.2} transform="rotate(-15deg)" />
                <VStack align="end" gap={0}>
                   <Text fontSize="xs" opacity={0.8} fontWeight="bold">TOTAL PAID</Text>
                   <Text fontSize="3xl" fontWeight="black">${ticket.totalPrice?.toFixed(2)}</Text>
                </VStack>
             </HStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};


// src/components/TourManagement/Ticket/CustomerTicketDetails/TicketVerification.tsx
import { Box, Flex, Heading, Text, VStack, Badge, HStack } from "@chakra-ui/react";
import { ScanLine } from "lucide-react";
import type { Ticket } from "@/interface/tourmanagement/TicketInterface";

export const TicketVerification = ({ ticket }: { ticket: Ticket }) => {
  if (!ticket.qrCode && !ticket.barcode) return null;

  const endCountry = ticket.tour?.endCountry;

  return (
    <Box 
      bg="bg.panel" 
      p={{ base: 6, md: 8 }} 
      borderRadius="3xl" 
      shadow="md" 
      borderWidth="1px"
      borderColor="border.subtle"
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md" display="flex" alignItems="center" gap={3} color="fg">
          <ScanLine size={24} color="var(--chakra-colors-blue-500)" /> 
          Digital Verification
        </Heading>
        
        {endCountry && (
          <Badge colorPalette="purple" variant="surface" borderRadius="full" px={3} py={1}>
            <HStack gap={2}>
              {/* Normal Chakra Image is fine here because it's a standard URL */}
              <img 
                src={endCountry.flagPngUrl} 
                alt={endCountry.officialName} 
                style={{ height: "12px", width: "18px", borderRadius: "2px", objectFit: "cover" }} 
              />
              <Text fontSize="xs" fontWeight="bold">
                {endCountry.officialName}
              </Text>
            </HStack>
          </Badge>
        )}
      </Flex>
      
      <Flex 
        direction={{ base: "column", md: "row" }} 
        align="center" 
        justify="center" 
        gap={{ base: 8, md: 12 }}
        bg="white" 
        p={8}
        borderRadius="2xl"
        borderWidth="1px"
        borderColor="gray.200"
      >
        {ticket.qrCode && (
          <VStack gap={3}>
            {/* FIX: Using native HTML img for Base64 Data */}
            <img 
              src={ticket.qrCode} 
              alt="QR Code" 
              width="160" 
              height="160" 
              style={{ display: "block", objectFit: "contain", backgroundColor: "white" }} 
            />
            <Badge colorPalette="gray" variant="subtle" px={3} py={1} borderRadius="full">
              Scan to Verify
            </Badge>
          </VStack>
        )}

        {ticket.qrCode && ticket.barcode && (
          <Box w={{ base: "80%", md: "1px" }} h={{ base: "1px", md: "120px" }} bg="gray.200" />
        )}

        {ticket.barcode && (
          <VStack gap={4}>
            {/* FIX: Using native HTML img for Base64 Data */}
            <img 
              src={ticket.barcode} 
              alt="Barcode" 
              width="280" 
              height="80" 
              style={{ display: "block", objectFit: "contain", backgroundColor: "white" }} 
            />
            <Text fontSize="sm" color="gray.600" fontWeight="bold" letterSpacing="widest" fontFamily="monospace">
              {ticket.ticketNumber}
            </Text>
          </VStack>
        )}
      </Flex>
    </Box>
  );
};
import { Badge, Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { ChevronLeft, Rocket } from "lucide-react";
import type { TransportationCreateHeaderProps } from "@/interfaces/props/tour/TransportationCreateHeaderProps";

export const TransportationCreateHeader = ({ onBack }: TransportationCreateHeaderProps) => (
  <>
    <HStack justify="space-between" w="full">
      <Button variant="ghost" size="sm" onClick={onBack} borderRadius="full"><ChevronLeft size={16} /> Back to Inventory</Button>
      <Badge variant="subtle" colorPalette="blue" size="lg" borderRadius="full">Step 1: Resource Initialization</Badge>
    </HStack>
    <VStack align="start" gap={2}>
      <HStack gap={3}>
        <Box p={2} bg="blue.500" color="white" borderRadius="xl" shadow="0 0 20px rgba(0,0,255,0.3)"><Rocket size={24} /></Box>
        <Heading size="2xl" fontWeight="black" letterSpacing="tight">Register Fleet Asset</Heading>
      </HStack>
      <Text color="fg.muted" fontSize="md" maxW="2xl">
        Define the technical specifications and seating layout for your new unit. Seats will be auto-generated based on the capacity provided.
      </Text>
    </VStack>
  </>
);

import { Badge, Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { formatPlace } from "@/utilities/formatHelper";
import { Building2, Plus } from "lucide-react";
import type { AgencyHeaderProps } from "@/interfaces/props/agency/AgencyHeaderProps";

export const AgencyHeader = ({ agency, onAddBranch }: AgencyHeaderProps) => (
  <HStack justify="space-between" align="center">
    <HStack gap={5}>
      <Box p={4} bg="blue.600" color="white" borderRadius="2xl" shadow="lg"><Building2 size={32} /></Box>
      <VStack align="start" gap={0}>
        <HStack>
          <Heading size="2xl" letterSpacing="tight">{agency.agencyName}</Heading>
          <Badge colorPalette={agency.active ? "green" : "red"} variant="surface">{agency.active ? "HQ Active" : "Inactive"}</Badge>
        </HStack>
        <Text color="fg.muted" fontSize="lg">{formatPlace(agency.city?.name, agency.country?.famousName)}</Text>
      </VStack>
    </HStack>
    <Button colorPalette="blue" px={6} onClick={onAddBranch} variant="ghost"><Plus size={18} /> Add New Branch</Button>
  </HStack>
);

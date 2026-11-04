import { Box, Button, Heading, HStack, Icon, Separator, Text } from "@chakra-ui/react";
import { ChevronLeft, Globe, LayoutDashboard, MapPin } from "lucide-react";
import type { TourEditHeaderProps } from "@/interfaces/props/tour/TourEditHeaderProps";

const TRAIL = [{ icon: LayoutDashboard, text: "ADMIN" }, { icon: Globe, text: "TOUR" }, { icon: MapPin, text: "LOGISTICS" }];

export const TourEditHeader = ({ tourNumber, onBack }: TourEditHeaderProps) => (
  <>
    <HStack w="full" justify="space-between">
      <Button variant="ghost" onClick={onBack} size="sm"><Icon as={ChevronLeft} mr={1} /> Return to Summary</Button>
      <HStack gap={4} color="fg.muted">
        {TRAIL.map((item, idx) => (
          <HStack key={item.text} gap={1}>
            <Icon as={item.icon} size="xs" />
            <Text fontSize="xs" fontWeight="bold">{item.text}</Text>
            {idx < TRAIL.length - 1 && <Separator orientation="vertical" h="12px" />}
          </HStack>
        ))}
      </HStack>
    </HStack>
    <Box w="full">
      <Heading size="xl" fontWeight="black" letterSpacing="tight">Edit Expedition</Heading>
      <Text color="fg.muted">Modifying configuration for <b>{tourNumber}</b></Text>
      <Separator mt={4} />
    </Box>
  </>
);

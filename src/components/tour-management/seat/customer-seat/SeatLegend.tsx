import { HStack } from "@chakra-ui/react";
import { Accessibility, Baby, Star } from "lucide-react";
import { ChairTypeColor } from "@/enums/tour-management/ChairType";
import { SeatStatusTheme } from "@/enums/tour-management/SeatStatus";
import { LegendItem } from "./LegendItem";

export const SeatLegend = () => (
  <HStack gap={4} wrap="wrap" justify="center" pt={6} borderTopWidth="1px" borderColor="border.subtle" w="full">
    <LegendItem bg="blue.500" color="white" label="Selected" />
    <LegendItem colorPalette={ChairTypeColor.STANDARD} label="Standard" />
    <LegendItem colorPalette={ChairTypeColor.PREMIUM_RECLINER} label="Premium" icon={Star} fill />
    <LegendItem colorPalette={ChairTypeColor.WHEELCHAIR_ACCESSIBLE} label="Accessible" icon={Accessibility} />
    <LegendItem colorPalette={ChairTypeColor.KIDS_CHAIR} label="Kids" icon={Baby} />
    <LegendItem bg={SeatStatusTheme.BOOKED.light} color={SeatStatusTheme.BOOKED.text} label="Unavailable" opacity={0.6} />
  </HStack>
);

import { Box, Button, Center, Grid, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { Armchair, Star, Accessibility, Baby } from "lucide-react";
import { AppDialog } from "@/components/ui/Custom/Dialogs/AppDialog";
import type { Seat } from "@/interface/tour/Seat";
import type { JSX } from "react";
import { ChairTypeColors, SeatStatusColors } from "@/constants/roles/Colors";
import type { SeatPickerDialogProps } from "@/interface/props/tour/SeatPickerDialogProps";

export const SeatPickerDialog = ({ open, onClose, seats, selectedId, onSelect, loading }: SeatPickerDialogProps) => {
  const resolveSeatStyles = (seat: Seat) => {
    const isSelected = selectedId === seat.id;
    const isAvailable = seat.status === "AVAILABLE";
    if (isSelected) {
      return {
        bg: "blue.500",
        color: "white",
        border: "none",
        _hover: { bg: "blue.600" },
      };
    }
    if (!isAvailable) {
      const statusTheme = SeatStatusColors[seat.status] || SeatStatusColors.MAINTENANCE;
      return {
        bg: statusTheme.light,
        _dark: { bg: statusTheme.dark },
        color: statusTheme.text,
        border: "none",
        opacity: 0.5,
        cursor: "not-allowed",
        _hover: {},
      };
    }
    const typePalette = ChairTypeColors[seat.chairType] || ChairTypeColors.STANDARD;
    return {
      bg: "transparent",
      color: `${typePalette}.600`,
      _dark: { color: `${typePalette}.300` },
      border: "1px solid",
      borderColor: `${typePalette}.400`,
      _hover: {
        transform: "translateY(-4px)",
        shadow: "md",
        bg: `${typePalette}.50`,
        _dark: { bg: `${typePalette}.900` },
      },
    };
  };
  const renderChairIcon = (chairType: string) => {
    const color = `${ChairTypeColors[chairType] || ChairTypeColors.STANDARD}.500`;
    const iconProps = { w: "12px", h: "12px", position: "absolute", top: "1.5", right: "1.5", color } as const;

    switch (chairType) {
      case "PREMIUM_RECLINER": return <Icon as={Star} {...iconProps} fill="currentColor" />;
      case "WHEELCHAIR_ACCESSIBLE": return <Icon as={Accessibility} {...iconProps} />;
      case "KIDS_CHAIR": return <Icon as={Baby} {...iconProps} />;
      default: return null;
    }
  };

  const renderLayout = () => {
    const items: JSX.Element[] = [];

    seats.forEach((seat, idx) => {
      const isAvailable = seat.status === "AVAILABLE";
      const styles = resolveSeatStyles(seat);

      items.push(
        <Button
          key={seat.id}
          disabled={!isAvailable || loading}
          onClick={() => onSelect(seat)}
          h="64px"
          borderRadius="xl"
          flexDirection="column"
          gap={1}
          position="relative"
          transition="all 0.2s"
          {...styles}
        >
          {renderChairIcon(seat.chairType)}
          <Icon as={Armchair} size="sm" />
          <Text fontSize="10px" fontWeight="black">{seat.seatCode}</Text>
        </Button>
      );
      if (idx % 4 === 1) items.push(<Box key={`aisle-${idx}`} w="full" h="full" />);
    });

    return items;
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Select Your Seat"
      description="Choose your preferred cabin location"
      icon={Armchair}
      size="lg"
    >
      <VStack gap={8} py={4}>
<Box w="full" position="relative" mt={2}>
          <Box h="2px" bg="border.subtle" w="full" />
          <Center position="absolute" top="-10px" w="full">
            <Text fontSize="xs" fontWeight="black" letterSpacing="widest" px={4} bg="bg.panel" color="fg.muted" borderRadius="full" border="1px solid" borderColor="border.subtle">
              FRONT OF CABIN
            </Text>
          </Center>
        </Box>
<Grid templateColumns="repeat(5, 1fr)" gap={3} w="full" px={4}>
          {renderLayout()}
        </Grid>
<HStack gap={4} wrap="wrap" justify="center" pt={6} borderTopWidth="1px" borderColor="border.subtle" w="full">
          <LegendItem bg="blue.500" color="white" label="Selected" />
<LegendItem colorPalette={ChairTypeColors.STANDARD} label="Standard" />
          <LegendItem colorPalette={ChairTypeColors.PREMIUM_RECLINER} label="Premium" icon={Star} fill />
          <LegendItem colorPalette={ChairTypeColors.WHEELCHAIR_ACCESSIBLE} label="Accessible" icon={Accessibility} />
          <LegendItem colorPalette={ChairTypeColors.KIDS_CHAIR} label="Kids" icon={Baby} />
<LegendItem
            bg={SeatStatusColors.BOOKED.light}
            color={SeatStatusColors.BOOKED.text}
            label="Unavailable"
            opacity={0.6}
          />
        </HStack>

        <Button colorPalette="blue" w="full" size="xl" borderRadius="xl" onClick={onClose} mt={2} disabled={!selectedId}>
          {selectedId ? "Confirm Selection" : "Please select a seat"}
        </Button>
      </VStack>
    </AppDialog>
  );
};
import type { LegendItemProps } from "@/interface/props/tour/LegendItemProps";

const LegendItem = ({ colorPalette, bg, color, label, icon: IconCmp, fill, opacity = 1 }: LegendItemProps) => {
  const isOutline = !!colorPalette;
  const boxBg = bg || "transparent";
  const boxBorder = isOutline ? `1px solid` : "none";
  const boxBorderColor = isOutline ? `${colorPalette}.400` : "transparent";
  const boxTextColor = color || `${colorPalette}.600`;
  const iconColor = colorPalette ? `${colorPalette}.500` : "inherit";

  return (
    <HStack gap={2} opacity={opacity}>
      <Center w={6} h={6} bg={boxBg} border={boxBorder} borderColor={boxBorderColor} borderRadius="md" color={boxTextColor} position="relative">
        {IconCmp && (
          <Icon as={IconCmp} w="10px" h="10px" position="absolute" top="2px" right="2px" color={iconColor} fill={fill ? "currentColor" : "none"} />
        )}
        <Icon as={Armchair} w="12px" h="12px" />
      </Center>
      <Text fontSize="xs" fontWeight="semibold" color="fg.muted">{label}</Text>
    </HStack>
  );
};

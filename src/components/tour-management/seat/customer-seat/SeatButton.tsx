import { Button, Icon, Text } from "@chakra-ui/react";
import { Armchair } from "lucide-react";
import { CHAIR_ICONS } from "@/constants/tour/chairIcons";
import { ChairTypeColor } from "@/enums/tour-management/ChairType";
import { SeatStatus } from "@/enums/tour-management/SeatStatus";
import type { SeatButtonProps } from "@/interfaces/props/tour/SeatButtonProps";
import { seatPickerStyles } from "@/utilities/seatPickerStyles";

export const SeatButton = ({ seat, selected, disabled, onSelect }: SeatButtonProps) => {
  const ChairIcon = CHAIR_ICONS[seat.chairType];
  const available = seat.status === SeatStatus.AVAILABLE;
  return (
    <Button disabled={!available || disabled} onClick={() => onSelect(seat)} h="64px" borderRadius="xl" flexDirection="column"
      gap={1} position="relative" transition="all 0.2s" aria-pressed={selected}
      aria-label={`Seat ${seat.seatCode}, ${seat.chairType.replace(/_/g, " ").toLowerCase()}${available ? "" : ", unavailable"}`}
      {...seatPickerStyles(seat, selected)}>
      {ChairIcon && <Icon as={ChairIcon} w="12px" h="12px" position="absolute" top="1.5" right="1.5" color={`${ChairTypeColor[seat.chairType]}.500`} />}
      <Icon as={Armchair} size="sm" />
      <Text fontSize="10px" fontWeight="black">{seat.seatCode}</Text>
    </Button>
  );
};

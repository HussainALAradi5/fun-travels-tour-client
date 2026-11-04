import { Fragment } from "react";
import { Box, Button, Center, Grid, Text, VStack } from "@chakra-ui/react";
import { Armchair } from "lucide-react";
import { AppDialog } from "@/components/ui/custom/dialogs/AppDialog";
import { SEATS_BEFORE_AISLE, SEATS_PER_ROW } from "@/constants/tour/chairIcons";
import type { SeatPickerDialogProps } from "@/interfaces/props/tour/SeatPickerDialogProps";
import { SeatButton } from "./SeatButton";
import { SeatLegend } from "./SeatLegend";

export const SeatPickerDialog = ({ open, onClose, seats, selectedId, onSelect, loading }: SeatPickerDialogProps) => (
  <AppDialog open={open} onClose={onClose} title="Select Your Seat" description="Choose your preferred cabin location" icon={Armchair} size="lg">
    <VStack gap={8} py={4}>
      <Box w="full" position="relative" mt={2}>
        <Box h="2px" bg="border.subtle" w="full" />
        <Center position="absolute" top="-10px" w="full">
          <Text fontSize="xs" fontWeight="black" letterSpacing="widest" px={4} bg="bg.panel" color="fg.muted" borderRadius="full" border="1px solid" borderColor="border.subtle">
            FRONT OF CABIN
          </Text>
        </Center>
      </Box>
      <Grid templateColumns={`repeat(${SEATS_PER_ROW + 1}, 1fr)`} gap={3} w="full" px={4}>
        {seats.map((seat, idx) => (
          <Fragment key={seat.id}>
            <SeatButton seat={seat} selected={selectedId === seat.id} disabled={Boolean(loading)} onSelect={onSelect} />
            {idx % SEATS_PER_ROW === SEATS_BEFORE_AISLE - 1 && <Box aria-hidden w="full" h="full" />}
          </Fragment>
        ))}
      </Grid>
      <SeatLegend />
      <Button colorPalette="blue" w="full" size="xl" borderRadius="xl" onClick={onClose} mt={2} disabled={!selectedId}>
        {selectedId ? "Confirm Selection" : "Please select a seat"}
      </Button>
    </VStack>
  </AppDialog>
);

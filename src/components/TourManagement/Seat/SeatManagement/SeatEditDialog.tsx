// src/components/TourManagement/Seat/SeatEditDialog.tsx
import { useState, useEffect } from "react";
import { VStack, Text, Button, Grid, Box, Separator } from "@chakra-ui/react";
import { Settings2, Save } from "lucide-react";
import { GenericDialog } from "@/components/ui/Custom/Dialogs/GenericDialog";
import { ChairType } from "@/enums/tourmanagement/ChirType";
import { SeatStatus } from "@/enums/tourmanagement/SeatStatus";
import { ChairTypeColors } from "@/constants/roles/Colors";
import type { Seat } from "@/interface/tour/Seat";
import type { SeatEditDialogProps } from "@/interface/props/tour/SeatEditDialogProps";

// Helper to map status to Chakra color palettes for buttons
const getStatusPalette = (status: string) => {
  switch (status) {
    case SeatStatus.AVAILABLE: return "green";
    case SeatStatus.BOOKED: return "red";
    case SeatStatus.RESERVED: return "orange";
    case SeatStatus.MAINTENANCE: return "yellow";
    default: return "gray";
  }
};

export const SeatEditDialog = ({ open, onClose, seat, onSave, loading }: SeatEditDialogProps) => {
  const [localSeat, setLocalSeat] = useState<Seat | null>(null);

  useEffect(() => {
    setLocalSeat(seat);
  }, [seat]);

  if (!localSeat) return null;

  return (
    <GenericDialog 
      open={open} 
      onClose={onClose} 
      title={`Configure Seat: ${localSeat.seatCode}`} 
      icon={Settings2} 
      size="md"
      colorPalette="blue"
    >
      <VStack w="full" align="stretch" gap={6} py={2}>
        
        {/* Chair Classification Section */}
        <Box>
          <Text fontSize="xs" fontWeight="bold" mb={3} color="fg.muted" letterSpacing="widest">
            CHAIR CLASSIFICATION
          </Text>
          <Grid templateColumns="1fr 1fr" gap={3}>
            {Object.values(ChairType).map((type) => {
              const color = ChairTypeColors[type] || "gray";
              const isSelected = localSeat.chairType === type;
              return (
                <Button
                  key={type} 
                  size="sm" 
                  h="12" 
                  whiteSpace="normal"
                  variant={isSelected ? "solid" : "outline"}
                  colorPalette={color}
                  onClick={() => setLocalSeat({ ...localSeat, chairType: type })}
                  borderRadius="xl"
                >
                  {type.split("_").join(" ")}
                </Button>
              );
            })}
          </Grid>
        </Box>

        <Separator />

        {/* Operational Status Section */}
        <Box>
          <Text fontSize="xs" fontWeight="bold" mb={3} color="fg.muted" letterSpacing="widest">
            OPERATIONAL STATUS
          </Text>
          <Grid templateColumns="1fr 1fr" gap={3}>
            {Object.values(SeatStatus).map((status) => {
              const color = getStatusPalette(status);
              const isSelected = localSeat.status === status;
              return (
                <Button
                  key={status} 
                  size="sm" 
                  h="12" 
                  whiteSpace="normal"
                  variant={isSelected ? "solid" : "outline"}
                  colorPalette={color}
                  onClick={() => setLocalSeat({ ...localSeat, status: status })}
                  borderRadius="xl"
                >
                  {status}
                </Button>
              );
            })}
          </Grid>
        </Box>

        <Button 
          w="full" colorPalette="blue" size="lg" borderRadius="2xl" 
          onClick={() => onSave(localSeat)} loading={loading}
          mt={4}
        >
          <Save size={18} style={{ marginRight: '8px' }} /> Confirm Configuration
        </Button>
      </VStack>
    </GenericDialog>
  );
};


// src/components/TourManagement/Seat/SeatManagerTable.tsx
import React from "react";
import { Box, HStack, Text, Badge, Button, Circle } from "@chakra-ui/react";
import { Armchair, Settings2 } from "lucide-react";
import type { Seat } from "@/interface/tourmanagement/SeatInterface";
import type { SeatStatus } from "@/enums/tourmanagement/SeatStatus";
import { SeatStatusColors, ChairTypeColors } from "@/constants/roles/Colors";
import { GenericTable } from "@/components/ui/Custom/GenericTable";

interface SeatColumn {
  header: string;
  key: keyof Seat | "actions";
  render: (s: Seat) => React.ReactNode;
}

interface Props {
  data: Seat[];
  loading: boolean;
  onEdit: (item: Seat) => void;
}

export const SeatManagerTable = ({ data, loading, onEdit }: Props) => {
  // Helper to map complex SeatStatusColors to Chakra colorPalettes for the Badge
  const getStatusPalette = (status: string) => {
    switch (status) {
      case "AVAILABLE": return "green";
      case "BOOKED": return "red";
      case "RESERVED": return "orange";
      case "MAINTENANCE": return "yellow";
      default: return "gray";
    }
  };

  const columns: SeatColumn[] = [
    {
      header: "Seat Identity",
      key: "seatCode",
      render: (s) => {
        const config = SeatStatusColors[s.status as SeatStatus] || { text: "gray.500", light: "gray.100" };
        return (
          <HStack gap={3}>
            <Box p={2} bg={config.light} _dark={{ bg: "white/5" }} borderRadius="xl">
              <Armchair size={18} color={config.text} />
            </Box>
            <Text fontWeight="black" fontSize="sm">{s.seatCode}</Text>
          </HStack>
        );
      }
    },
    {
      header: "Classification",
      key: "chairType",
      render: (s) => {
        const colorPalette = ChairTypeColors[s.chairType as keyof typeof ChairTypeColors] || "gray";
        return (
          <Badge 
            variant="surface" 
            colorPalette={colorPalette} 
            borderRadius="full" 
            px={3} 
            py={0.5}
            textTransform="capitalize"
          >
            {s.chairType.replace("_", " ").toLowerCase()}
          </Badge>
        );
      }
    },
    {
      header: "Operational Status",
      key: "status",
      render: (s) => {
        const palette = getStatusPalette(s.status);
        const config = SeatStatusColors[s.status as SeatStatus] || { text: "gray.500" };
        
        return (
          <Badge 
            variant="subtle" 
            colorPalette={palette} 
            borderRadius="lg" 
            px={3} 
            py={1}
            display="flex"
            alignItems="center"
            gap={2}
            width="fit-content"
          >
            {/* Modern status dot indicator */}
            <Circle size="6px" bg={`${palette}.500`} />
            <Text fontSize="xs" fontWeight="bold" color={config.text === "white" ? undefined : config.text}>
              {s.status}
            </Text>
          </Badge>
        );
      }
    },
    {
      header: "Actions",
      key: "actions",
      render: (s) => (
        <Button 
          size="sm" 
          variant="ghost" 
          colorPalette="blue" 
          borderRadius="xl" 
          onClick={() => onEdit(s)}
        >
          <Settings2 size={14} /> 
          <Text fontSize="xs" fontWeight="bold" ml={1}>Configure</Text>
        </Button>
      )
    }
  ];

  return (
    <Box 
      p={1} 
      bg="bg.panel" 
      borderRadius="3xl" 
      overflow="hidden"
    >
      <GenericTable<Seat>
        data={data}
        loading={loading}
        columns={columns}
        searchDisabled 
      />
    </Box>
  );
};
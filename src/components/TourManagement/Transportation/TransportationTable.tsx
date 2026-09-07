// src/components/TourManagement/Transportation/TransportationTable.tsx
import React from "react";
import { Box, HStack, Text, Badge, Button, Icon, VStack, Float } from "@chakra-ui/react";
import { 
  Bus, 
  Plane, 
  Ship, 
  Car, 
  Fingerprint, 
  Hash, 
  Settings2, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  Gauge, 
  CircleSlash, 
  Activity, 
  Building2 
} from "lucide-react";
import { GenericTable } from "../../ui/Custom/GenericTable";
import { TransportationType } from "@/enums/tourmanagement/TransportationType";
import { TransportationStatus } from "@/enums/tourmanagement/TransportationStatus";
import type { Transportation } from "@/interface/tourmanagement/TransportationInterface";
import { TransportationColors } from "@/constants/roles/Colors";

/**
 * Strictly typed column definition for GenericTable
 */
interface TransportationColumn {
  header: string;
  key: keyof Transportation | "actions";
  render: (t: Transportation) => React.ReactNode;
}

interface Props {
  data: Transportation[];
  loading: boolean;
  onEdit: (item: Transportation) => void;
  onView: (id: string) => void;
}

const STATUS_CONFIG: Record<TransportationStatus, { color: string; icon: typeof CheckCircle2; label: string }> = {
  [TransportationStatus.AVAILABLE]: { color: "green", icon: CheckCircle2, label: "Available" },
  [TransportationStatus.PARTIAL]: { color: "yellow", icon: Gauge, label: "Partial" },
  [TransportationStatus.FULL]: { color: "orange", icon: AlertTriangle, label: "At Capacity" },
  [TransportationStatus.MAINTENANCE]: { color: "red", icon: Wrench, label: "Maintenance" },
  [TransportationStatus.INACTIVE]: { color: "gray", icon: CircleSlash, label: "Inactive" },
};

const VehicleIcon = ({ type, size = 16 }: { type: TransportationType; size?: number }) => {
  switch (type) {
    case TransportationType.BUS: return <Bus size={size} />;
    case TransportationType.FLIGHT: return <Plane size={size} />;
    case TransportationType.FERRY: return <Ship size={size} />;
    case TransportationType.PRIVATE_CAR: return <Car size={size} />;
    default: return <Bus size={size} />;
  }
};

export const TransportationTable = ({ data, loading, onEdit, onView }: Props) => {
  const columns: TransportationColumn[] = [
    {
      header: "Internal Code",
      key: "code",
      render: (t) => (
        <HStack gap={3}>
          <Box position="relative">
            <Box 
              p={2.5} 
              bg={`${TransportationColors[t.type] || "blue"}.500/10`} 
              color={`${TransportationColors[t.type] || "blue"}.600`} 
              borderRadius="2xl"
            >
              <VehicleIcon type={t.type} size={20} />
            </Box>
            <Float placement="bottom-end" offset="1">
              <Box p={1} bg="bg.panel" borderRadius="full" border="1px solid" borderColor="border.subtle" shadow="xs">
                <Fingerprint size={10} color="var(--chakra-colors-blue-500)" />
              </Box>
            </Float>
          </Box>
          <Text fontSize="sm" fontWeight="black" letterSpacing="tight" color="fg.emphasized">
            {t.code}
          </Text>
        </HStack>
      ),
    },
    {
      header: "Category",
      key: "type",
      render: (t) => (
        <Badge 
          variant="surface" 
          colorPalette={TransportationColors[t.type] || "blue"} 
          size="md" 
          borderRadius="full" 
          px={3}
        >
          <HStack gap={1.5}>
            <VehicleIcon type={t.type} size={12} />
            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">{t.type}</Text>
          </HStack>
        </Badge>
      ),
    },
    {
      header: "Tracking Number",
      key: "transportationNumber",
      render: (t) => (
        <HStack gap={2}>
          <Box p={1.5} bg="gray.100" _dark={{ bg: "white/5" }} borderRadius="md" color="fg.muted">
            <Hash size={14} />
          </Box>
          <Text fontSize="sm" fontWeight="bold" fontFamily="mono" letterSpacing="widest">
            {t.transportationNumber}
          </Text>
        </HStack>
      ),
    },
    {
      header: "Provider",
      key: "providerName",
      render: (t) => (
        <HStack gap={2}>
          <Box p={1.5} bg="blue.50" _dark={{ bg: "blue.950" }} borderRadius="md" color="blue.500">
            <Building2 size={14} />
          </Box>
          <VStack align="start" gap={0}>
            <Text fontSize="sm" fontWeight="bold" color="fg.emphasized">
              {t.providerName || "none"}
            </Text>
            
          </VStack>
        </HStack>
      ),
    },
    {
      header: "Operational Health",
      key: "unitStatus",
      render: (t) => {
        const config = STATUS_CONFIG[t.unitStatus as TransportationStatus] || STATUS_CONFIG[TransportationStatus.INACTIVE];
        return (
          <Badge variant="surface" colorPalette={config.color} size="md" borderRadius="full" px={3} py={1}>
            <HStack gap={1.5}>
              <Icon as={config.icon} size="xs" />
              <Text fontSize="xs" fontWeight="extrabold">{config.label}</Text>
            </HStack>
          </Badge>
        );
      },
    },
    {
      header: "Utilization",
      key: "totalCapacity",
      render: (t) => {
        const percent = Math.round(((t.remainingSeats || 0) / (t.totalCapacity || 1)) * 100);
        const isLow = percent < 15;
        return (
          <VStack align="start" gap={1.5} minW="140px">
            <HStack justify="space-between" w="full">
              <HStack gap={1} color={isLow ? "red.500" : "blue.500"}>
                <Activity size={10} />
                <Text fontSize="10px" fontWeight="black">{percent}% FREE</Text>
              </HStack>
              <Text fontSize="10px" fontWeight="bold" color="fg.muted">
                {t.remainingSeats}/{t.totalCapacity}
              </Text>
            </HStack>
            <Box w="full" h="2" bg="bg.muted" borderRadius="full" overflow="hidden" border="1px solid" borderColor="border.subtle">
              <Box h="full" bg={isLow ? "red.500" : "blue.500"} w={`${percent}%`} transition="width 0.8s ease-in-out" />
            </Box>
          </VStack>
        );
      },
    },
    {
      header: "Actions",
      key: "actions",
      render: (t) => (
        <HStack gap={2}>
          <Button 
            size="sm" 
            variant="subtle" 
            colorPalette="blue" 
            borderRadius="xl" 
            onClick={() => onView(String(t.id))}
            _hover={{ transform: "translateY(-1px)", shadow: "md" }}
          >
            <Eye size={14} /> <Text fontSize="xs" fontWeight="bold" ml={1}>View</Text>
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            colorPalette="gray" 
            borderRadius="xl" 
            onClick={() => onEdit(t)}
          >
            <Settings2 size={14} /> <Text fontSize="xs" fontWeight="bold" ml={1}>Manage</Text>
          </Button>
        </HStack>
      ),
    },
  ];

  return (
    <Box p={1} bg="bg.panel" borderRadius="3xl" border="1px solid" borderColor="border.subtle" shadow="xl" overflow="hidden">
      <GenericTable<Transportation>
        data={data}
        loading={loading}
        enableExport
        searchDisabled
        columns={columns}
      />
    </Box>
  );
};
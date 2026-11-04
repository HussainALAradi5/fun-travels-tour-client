import { Badge, Box, Button, Float, HStack, Icon, Text } from "@chakra-ui/react";
import { Building2, Eye, Fingerprint, Hash, Settings2, Users } from "lucide-react";
import { VehicleIcon } from "@/components/tour-management/transportation/VehicleIcon";
import { TRANSPORTATION_STATUS_DISPLAY } from "@/constants/tour/transportationStatus";
import { TransportationStatus } from "@/enums/tour-management/TransportationStatus";
import { TransportationTypeColor } from "@/enums/tour-management/TransportationType";
import type { Column } from "@/interfaces/common/Column";
import type { Transportation } from "@/interfaces/tour/Transportation";

/** Fleet table columns. Seat availability is per tour, so the fleet view shows capacity only. */
export function useTransportationColumns(onView: (id: string) => void, onEdit: (t: Transportation) => void): Column<Transportation>[] {
  return [
    { header: "Internal Code", key: "code", render: (t) => (
      <HStack gap={3}>
        <Box position="relative">
          <Box p={2.5} bg={`${TransportationTypeColor[t.type]}.500/10`} color={`${TransportationTypeColor[t.type]}.600`} borderRadius="2xl">
            <VehicleIcon type={t.type} size={20} />
          </Box>
          <Float placement="bottom-end" offset="1">
            <Box p={1} bg="bg.panel" borderRadius="full" border="1px solid" borderColor="border.subtle" shadow="xs">
              <Fingerprint size={10} color="var(--chakra-colors-blue-500)" />
            </Box>
          </Float>
        </Box>
        <Text fontSize="sm" fontWeight="black" letterSpacing="tight" color="fg.emphasized">{t.code}</Text>
      </HStack>
    ) },
    { header: "Category", key: "type", render: (t) => (
      <Badge variant="surface" colorPalette={TransportationTypeColor[t.type]} size="md" borderRadius="full" px={3}>
        <HStack gap={1.5}><VehicleIcon type={t.type} size={12} /><Text fontSize="xs" fontWeight="bold" textTransform="uppercase">{t.type}</Text></HStack>
      </Badge>
    ) },
    { header: "Tracking Number", key: "transportationNumber", render: (t) => (
      <HStack gap={2}>
        <Box p={1.5} bg="gray.100" _dark={{ bg: "white/5" }} borderRadius="md" color="fg.muted"><Hash size={14} /></Box>
        <Text fontSize="sm" fontWeight="bold" fontFamily="mono" letterSpacing="widest">{t.transportationNumber}</Text>
      </HStack>
    ) },
    { header: "Provider", key: "providerName", render: (t) => (
      <HStack gap={2}>
        <Box p={1.5} bg="blue.50" _dark={{ bg: "blue.950" }} borderRadius="md" color="blue.500"><Building2 size={14} /></Box>
        <Text fontSize="sm" fontWeight="bold" color="fg.emphasized">{t.providerName || "none"}</Text>
      </HStack>
    ) },
    { header: "Operational Health", key: "unitStatus", render: (t) => {
      const config = TRANSPORTATION_STATUS_DISPLAY[t.unitStatus as TransportationStatus] ?? TRANSPORTATION_STATUS_DISPLAY[TransportationStatus.INACTIVE];
      return (
        <Badge variant="surface" colorPalette={config.color} size="md" borderRadius="full" px={3} py={1}>
          <HStack gap={1.5}><Icon as={config.icon} size="xs" /><Text fontSize="xs" fontWeight="extrabold">{config.label}</Text></HStack>
        </Badge>
      );
    } },
    { header: "Capacity", key: "totalCapacity", render: (t) => (
      <HStack gap={1.5} color="fg.muted"><Users size={14} /><Text fontSize="sm" fontWeight="bold">{t.totalCapacity} seats</Text></HStack>
    ) },
    { header: "Actions", key: "actions", render: (t) => (
      <HStack gap={2}>
        <Button size="sm" variant="subtle" colorPalette="blue" borderRadius="xl" onClick={() => onView(String(t.id))}
          _hover={{ transform: "translateY(-1px)", shadow: "md" }}>
          <Eye size={14} /> <Text fontSize="xs" fontWeight="bold" ml={1}>View</Text>
        </Button>
        <Button size="sm" variant="ghost" colorPalette="gray" borderRadius="xl" onClick={() => onEdit(t)}>
          <Settings2 size={14} /> <Text fontSize="xs" fontWeight="bold" ml={1}>Manage</Text>
        </Button>
      </HStack>
    ) },
  ];
}

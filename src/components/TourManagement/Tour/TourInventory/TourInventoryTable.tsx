import { VStack, HStack, Text, Badge, Icon, Circle } from "@chakra-ui/react";
import { Calendar, Clock } from "lucide-react";
import { GenericTable } from "@/components/ui/Custom/GenericTable";
import { CapacityProgress } from "@/components/ui/Custom/CapacityProgress";
import { StatusColors } from "@/constants/roles/Colors";
import { formatTourRange } from "@/utilities/DateUtils";
import type { Tour, TourTableProps } from "@/interface";

export const TourInventoryTable = ({ data, isLoading, onViewDetails }: TourTableProps) => {
  return (
    <GenericTable 
      data={data}
      loading={isLoading}
      searchDisabled
      columns={[
        { 
          header: "Tour Details", 
          key: "title", 
          render: (row: Tour) => (
            <VStack align="start" gap={2} py={2}>
              <Text 
                fontWeight="bold" fontSize="sm" cursor="pointer" 
                _hover={{ color: "blue.600" }} 
                // FIXED: Wrapped row.id in String() to resolve TS2345
                onClick={() => onViewDetails(String(row.id))}
              >
                {row.title}
              </Text>
              <Badge variant="outline" colorPalette="blue" size="xs" fontFamily="mono">
                {row.tourNumber || 'DRAFT'}
              </Badge>
            </VStack>
          ) 
        },
        { 
          header: "Timeline", 
          key: "startDate", 
          render: (row: Tour) => (
            <VStack align="start" gap={1}>
              <HStack gap={1.5}>
                <Icon as={Calendar} size="sm" color="blue.500" />
                <Text fontSize="xs">{formatTourRange(row.startDate, row.endDate)}</Text>
              </HStack>
              <HStack gap={1.5}>
                <Icon as={Clock} size="sm" color="orange.500" />
                <Badge size="xs" variant="surface" colorPalette="orange">{row.numberOfDays} Days</Badge>
              </HStack>
            </VStack>
          )
        },
        { 
          header: "Capacity", 
          key: "availableSlots",
          render: (row: Tour) => (
            <CapacityProgress value={row.availableSlots} total={row.maxCapacity} unit="Seats" />
          )
        },
        { 
          header: "Status", 
          key: "status",
          render: (row: Tour) => {
            const color = StatusColors[row.status as keyof typeof StatusColors] || "gray";
            return (
              <Badge variant="subtle" colorPalette={color} borderRadius="full" px={4} size="sm">
                <HStack gap={2}>
                  <Circle size="6px" bg={`${color}.600`} />
                  <Text fontSize="2xs" fontWeight="bold" textTransform="uppercase">{row.status}</Text>
                </HStack>
              </Badge>
            );
          }
        }
      ]}
      enableExport
      exportFileName="Tour_Inventory_Master"
    />
  );
};

import { useMemo } from "react";
import { Box, HStack, Text, Badge, IconButton, VStack } from "@chakra-ui/react";
import { Plus, MapPin, Globe, Building2 } from "lucide-react";
import { DataTable } from "@/components/ui/Custom/DataTable";
import type { Agency } from "@/interface/agency/Agency";
import type { AgencyTableProps } from "@/interface/props/agency/AgencyTableProps";

export function AgencyTable({
  data,
  loading,
  onAddBranch,
  onViewDetail,
}: AgencyTableProps) {
  const columns = useMemo(
    () => [
      {
        header: "Agency Name",
        key: "agencyName",
        render: (item: Agency) => (
          <HStack
            gap={3}
            cursor="pointer"
            onClick={() => onViewDetail(item.id!)}
            _hover={{ color: "blue.500" }}
          >
            <Box
              p={1.5}
              bg="blue.50"
              borderRadius="md"
              _dark={{ bg: "blue.900/30" }}
            >
              <Building2 size={16} color="var(--chakra-colors-blue-500)" />
            </Box>
            <Text fontWeight="bold">{item.agencyName}</Text>
          </HStack>
        ),
      },
      {
        header: "Location",
        key: "location",
        render: (item: Agency) => (
          <VStack align="start" gap={0}>
            <HStack gap={1} color="fg.muted" fontSize="xs">
              <MapPin size={12} />
              <Text truncate maxW="150px">
                {item.address}
              </Text>
            </HStack>
            <HStack gap={1} fontSize="xs" color="blue.500">
              <Globe size={12} />
              <Text>
                {item.city?.name}, {item.country?.famousName}
              </Text>
            </HStack>
          </VStack>
        ),
      },
      {
        header: "Status",
        key: "active",
        render: (item: Agency) => (
          <Badge colorPalette={item.active ? "green" : "red"} variant="surface">
            {item.active ? "ACTIVE" : "INACTIVE"}
          </Badge>
        ),
      },
      {
        header: "Actions",
        key: "id",
        render: (item: Agency) => (
          <HStack gap={2} justify="flex-end">
            <IconButton
              size="sm"
              variant="ghost"
              colorPalette="blue"
              onClick={(e) => {
                e.stopPropagation();
                onAddBranch(item.id!);
              }}
            >
              <Plus size={16} />
            </IconButton>
          </HStack>
        ),
      },
    ],
    [onAddBranch, onViewDetail]
  );

  return (
    <Box
      bg="bg.panel"
      p={4}
      borderRadius="xl"
      border="1px solid"
      borderColor="border.subtle"
      shadow="sm"
    >
      <DataTable
        data={data}
        columns={columns}
        loading={loading}
        searchKey="agencyName"
      />
    </Box>
  );
}



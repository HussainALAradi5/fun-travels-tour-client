import { useMemo } from "react";
import { Text, HStack, Badge, Box, VStack } from "@chakra-ui/react";
import { Globe, User as UserIcon, MapPinned, Phone } from "lucide-react";
import { GenericTable } from "@/components/ui/Custom/GenericTable";
import type { AgencyBranch } from "@/interface/Agency/AgencyBranchInterface";

interface BranchTableProps {
  branches: AgencyBranch[];
  loading?: boolean;
  agencyName?: string;
}

export function BranchTable({
  branches,
  loading,
}: BranchTableProps) {
  const columns = useMemo(
    () => [
      {
        header: "Branch Info",
        key: "branchName",
        render: (item: AgencyBranch) => (
          <HStack gap={3}>
            <Box
              p={2}
              bg="blue.50"
              _dark={{ bg: "blue.950" }}
              color="blue.600"
              borderRadius="lg"
            >
              <MapPinned size={18} />
            </Box>
            <VStack align="start" gap={0}>
              <Text fontWeight="bold" fontSize="sm">
                {item.branchName}
              </Text>
              <Text fontSize="xs" color="fg.muted">
                {item.branchAddress}
              </Text>
            </VStack>
          </HStack>
        ),
      },
      {
        header: "Location",
        key: "location",
        render: (item: AgencyBranch) => (
          <HStack gap={2} fontSize="sm">
            <Globe size={14} className="text-gray-400" />
            <Text>
              {item.city?.name}, {item.country?.famousName}
            </Text>
          </HStack>
        ),
      },
      {
        header: "Management",
        key: "branchManager",
        render: (item: AgencyBranch) => (
          <VStack align="start" gap={0}>
            <HStack gap={2}>
              <UserIcon size={14} />
              <Text fontSize="sm" fontWeight="medium">
                {item.branchManager?.name || "Unassigned"}
              </Text>
            </HStack>
            {item.ownerMobileNumber && (
              <HStack gap={2} color="fg.muted">
                <Phone size={12} />
                <Text fontSize="xs">{item.ownerMobileNumber}</Text>
              </HStack>
            )}
          </VStack>
        ),
      },
      {
        header: "Status",
        key: "active",
        render: (item: AgencyBranch) => (
          <Badge
            colorPalette={item.active ? "green" : "red"}
            variant="surface"
            size="sm"
            borderRadius="full"
            px={3}
          >
            {item.active ? "Active" : "Inactive"}
          </Badge>
        ),
      },
    ],
    []
  );

  return (
    <Box mt={2}>
      <GenericTable data={branches} columns={columns} loading={loading} />
    </Box>
  );
}

import { Badge, HStack, Text, IconButton, Box, Icon } from "@chakra-ui/react";
import { DataTable } from "@/components/ui/Custom/DataTable";
import type { Column } from "@/interface/common/Column";
import type { UserRequest } from "@/interface/support/UserRequest";
import { UserRequestStatusColor } from "@/enums/UserRequest/UserRequestStatus";
import { UserRequestTypeColor } from "@/enums/UserRequest/UserRequestType";
import { User, Eye } from "lucide-react";
import type { UserRequestListProps } from "@/interface/props/user/UserRequestListProps";

export const UserRequestList = ({ data, loading, onView }: UserRequestListProps) => {
  const columns: Column<UserRequest>[] = [
    {
      header: "Type",
      key: "type",
      render: (item) => (
        <Badge colorPalette={UserRequestTypeColor[item.type]} variant="subtle" borderRadius="full" px={3} py={1}>
          {item.type}
        </Badge>
      )
    },
    {
      header: "Title",
      key: "title",
      render: (item) => (
        <Text fontWeight="bold" fontSize="sm" lineClamp={1}>
          {item.title}
        </Text>
      )
    },
    {
      header: "Description",
      key: "description",
      render: (item) => (
        <Box maxW="300px">
          <Text fontSize="xs" color="fg.muted" lineClamp={2}>
            {item.description}
          </Text>
        </Box>
      )
    },
    {
      header: "Requester",
      key: "user",
      render: (item) => (
<HStack gap={2}>
          <Badge
            variant="subtle"
            colorPalette="blue"
            borderRadius="full"
            px={3}
            py={1}
            display="inline-flex"
            alignItems="center"
          >
            <HStack gap={1.5}>
              <Icon size="xs" as={User} />
              <Text fontSize="xs" fontWeight="medium" textTransform="capitalize">
                {item.user?.name || "User"}
              </Text>
            </HStack>
          </Badge>
        </HStack>
      )
    },
    {
      header: "Status",
      key: "status",
      render: (item) => (
        <Badge colorPalette={UserRequestStatusColor[item.status]} variant="subtle" borderRadius="full" px={3} py={1}>
          {item.status}
        </Badge>
      )
    },
    {
      header: "Actions",
      key: "id",
      render: (item) => (
        <IconButton
          variant="ghost"
          size="sm"
          colorPalette="blue"
          onClick={() => onView(item)}
          aria-label="View Details"
          borderRadius="md"
        >
          <Eye size={16} />
        </IconButton>
      )
    }
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
      searchDisabled={true}
    />
  );
};



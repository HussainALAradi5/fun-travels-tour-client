import { Badge, HStack, Text, IconButton, Box, Icon } from "@chakra-ui/react";
import { GenericTable, type Column } from "@/components/ui/Custom/GenericTable";
import type { UserRequest } from "@/interface";
import { RequestStatusColors, RequestTypeColors } from "@/constants/roles/Colors";
import { User, Eye } from "lucide-react";

interface Props {
  data: UserRequest[];
  loading: boolean;
  onView: (req: UserRequest) => void;
}

export const UserRequestList = ({ data, loading, onView }: Props) => {
  const columns: Column<UserRequest>[] = [
    {
      header: "Type",
      key: "type",
      render: (item) => (
        <Badge colorPalette={RequestTypeColors[item.type]} variant="subtle" borderRadius="full" px={3} py={1}>
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
        /* Using HStack for perfect alignment of Icon and Text */
        <HStack gap={2}>
          <Badge 
            variant="subtle" 
            colorPalette="blue" // Changed to Blue for a nicer look
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
        <Badge colorPalette={RequestStatusColors[item.status]} variant="subtle" borderRadius="full" px={3} py={1}>
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
    <GenericTable 
      data={data} 
      columns={columns} 
      loading={loading} 
      searchDisabled={true} 
    />
  );
};
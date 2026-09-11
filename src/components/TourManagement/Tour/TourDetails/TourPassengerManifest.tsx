import { Box, HStack, Heading, Badge, Text, Circle, Icon, VStack } from "@chakra-ui/react";
import { User as UserIcon } from "lucide-react";
import { GenericTable } from "@/components/ui/Custom/GenericTable";
import type { Ticket } from "@/interface/tour/Ticket";

export const TourPassengerManifest = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <Box
      bg="bg.panel"
      p="6"
      borderRadius="3xl"
      borderWidth="1px"
      borderColor="border.subtle"
      shadow="sm"
    >
      <HStack mb="6" justify="space-between">
        <Heading size="md" letterSpacing="tight">Passenger Manifest</Heading>
        <Badge variant="subtle" colorPalette="blue" px={3} borderRadius="full" size="sm">
          {tickets.length} {tickets.length === 1 ? 'Ticket' : 'Tickets'}
        </Badge>
      </HStack>

      <GenericTable
        data={tickets}
        enableExport
        searchDisabled
        columns={[
          {
            header: "Customer",
            key: "customer",
            render: (row: Ticket) => {
              const displayName = row.customer?.name || "Guest";

              return (
                <HStack gap={3}>
                  <Circle
                    size="9"
                    bg="blue.100"
                    color="blue.600"
                    _dark={{ bg: "blue.950", color: "blue.400" }}
                  >
                    <Icon as={UserIcon} size="sm" />
                  </Circle>
                  <VStack align="start" gap={0}>
                    <Text fontSize="sm" fontWeight="bold" color="fg.emphasized">
                      {displayName}
                    </Text>
                  </VStack>
                </HStack>
              );
            }
          },
          {
            header: "Ticket Number",
            key: "ticketNumber",
            render: (row: Ticket) => (
<Badge
                variant="outline"
                colorPalette="blue"
                fontFamily="mono"
                size="sm"
                borderRadius="md"
                px={2.5}
                py={0.5}
                fontWeight="bold"
                fontSize="xs"
                letterSpacing="wider"
                bg="blue.50"
                _dark={{
                  bg: "blue.950/30",
                  borderColor: "blue.800",
                  color: "blue.300"
                }}
              >
                <HStack gap={1}>
                  <Text>{row.ticketNumber}</Text>
                </HStack>
              </Badge>
            )
          },
          {
            header: "Status",
            key: "ticketStatus",
            render: (row: Ticket) => (
              <Badge
                size="sm"
                variant="surface"
                colorPalette={row.ticketStatus === 'CONFIRMED' ? "green" : "orange"}
                borderRadius="lg"
                textTransform="capitalize"
              >
                {row.ticketStatus?.toLowerCase()}
              </Badge>
            )
          },
          {
            header: "Paid Amount",
            key: "totalPrice",
            render: (row: Ticket) => (
              <Text
                fontWeight="black"
                color="blue.600"
                _dark={{ color: "blue.400" }}
                fontSize="sm"
              >
                ${row.totalPrice?.toFixed(2)}
              </Text>
            )
          }
        ]}
      />
    </Box>
  );
};



import { Badge, Box, Button, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import { Calendar, PlaneLanding, PlaneTakeoff } from "lucide-react";
import { useMemo } from "react";
import { PlaceCell } from "@/components/tour-management/customer-tour-catalog/cells/PlaceCell";
import { RouteCell } from "@/components/tour-management/customer-tour-catalog/cells/RouteCell";
import { CATALOG_PLACEHOLDER_IMAGE } from "@/constants/tour/catalog";
import type { Column } from "@/interfaces/common/Column";
import type { Tour } from "@/interfaces/tour/Tour";
import { useNavigate } from "@/lib/navigation";
import { formatCatalogDate, formatPrice } from "@/utilities/catalogFormat";

/** Column definitions for the public tour catalog table. */
export function useCustomerTourColumns(isAuthenticated: boolean): Column<Tour>[] {
  const navigate = useNavigate();
  return useMemo(() => [
    { header: "Expedition", key: "title", render: (tour) => (
      <HStack gap={3}>
        <Image src={CATALOG_PLACEHOLDER_IMAGE} alt="" w="10" h="10" rounded="lg" objectFit="cover" />
        <VStack align="start" gap={0}>
          <Text fontWeight="bold" fontSize="sm" lineClamp={1}>{tour.title}</Text>
          <Text fontSize="xs" color="fg.subtle" fontFamily="mono">{tour.tourNumber}</Text>
        </VStack>
      </HStack>
    ) },
    { header: "Origin", key: "startCountry", render: (tour) => (
      <PlaceCell country={tour.startCountry} cityName={tour.startCity?.name} icon={PlaneTakeoff} color="blue.fg" />
    ) },
    { header: "Destination", key: "endCountry", render: (tour) => (
      <PlaceCell country={tour.endCountry} cityName={tour.endCity?.name} icon={PlaneLanding} color="green.fg" />
    ) },
    { header: "Route", key: "destinationCountries", render: (tour) => <RouteCell tour={tour} /> },
    { header: "Schedule", key: "startDate", render: (tour) => (
      <VStack align="start" gap={0}>
        <HStack gap={1}>
          <Icon as={Calendar} size="md" color="fg.subtle" />
          <Text fontSize="md" fontWeight="medium">{formatCatalogDate(tour.startDate)}</Text>
        </HStack>
        <Text fontSize="xs" color="fg.subtle" pl={4}>to {formatCatalogDate(tour.endDate)}</Text>
      </VStack>
    ) },
    { header: "Slots", key: "availableSlots", render: (tour) => (
      <Badge variant="subtle" colorPalette={(tour.availableSlots ?? 0) > 0 ? "green" : "red"} size="sm">{tour.availableSlots} Left</Badge>
    ) },
    { header: "Price", key: "totalPrice", render: (tour) => (
      <Box textAlign="end" w="full"><Text fontWeight="extrabold" color="blue.fg">{formatPrice(tour.totalPrice ?? tour.basePrice)}</Text></Box>
    ) },
    { header: "Action", key: "id", render: (tour) => {
      const canBook = (tour.availableSlots ?? 0) > 0 && tour.status === "ACTIVE";
      return (
        <Box textAlign="end">
          <Button size="sm" disabled={!canBook} colorPalette="blue" rounded="md"
            onClick={() => navigate(isAuthenticated ? `/reserve/${tour.id}` : "/login")}>
            {isAuthenticated ? (canBook ? "Book" : "Full") : "Login"}
          </Button>
        </Box>
      );
    } },
  ], [isAuthenticated, navigate]);
}

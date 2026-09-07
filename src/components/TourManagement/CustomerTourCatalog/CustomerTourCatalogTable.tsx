import {
  HStack,
  VStack,
  Text,
  Image,
  Badge,
  Icon,
  Box,
  Button,
} from "@chakra-ui/react";
import { PlaneTakeoff, PlaneLanding, MapPin, Calendar } from "lucide-react";
import { GenericTable, type Column } from "@/components/ui/Custom/GenericTable";
import type { Tour } from "@/interface/tourmanagement/TourInterface";
import { useNavigate } from "react-router-dom";

interface Props {
  tours: Tour[];
  isAuthenticated: boolean;
  loading?: boolean;
}

export const CustomerTourCatalogTable = ({
  tours,
  isAuthenticated,
  loading,
}: Props) => {
  const navigate = useNavigate();

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "TBD";

  const columns: Column<Tour>[] = [
    {
      header: "Expedition",
      key: "title",
      render: (tour) => (
        <HStack gap={3}>
          <Image
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80"
            w="10"
            h="10"
            rounded="lg"
            objectFit="cover"
          />
          <VStack align="start" gap={0}>
            <Text fontWeight="bold" fontSize="sm" lineClamp={1}>
              {tour.title}
            </Text>
            <Text fontSize="2m" color="fg.subtle" fontFamily="mono">
              {tour.tourNumber}
            </Text>
          </VStack>
        </HStack>
      ),
    },
    {
      header: "Origin",
      key: "startCountry",
      render: (tour) => (
        <VStack align="start" gap={0}>
          <HStack gap={1.5} color="blue.fg">
            {tour.startCountry?.flagPngUrl && (
              <Image
                src={tour.startCountry.flagPngUrl}
                w="16px"
                h="12px"
                borderRadius="md"
              />
            )}
            <Text fontSize="md" fontWeight="bold">
              {tour.startCountry?.officialName || tour.startCountry?.famousName}
            </Text>
          </HStack>
          <HStack gap={1} pl={1}>
            <Icon as={PlaneTakeoff} size="md" color="fg.muted" />
            <Text fontSize="2m" color="fg.muted">
              {tour.startCity?.name}
            </Text>
          </HStack>
        </VStack>
      ),
    },
    {
      header: "Destination",
      key: "endCountry",
      render: (tour) => (
        <VStack align="start" gap={0}>
          <HStack gap={1.5} color="green.fg">
            {tour.endCountry?.flagPngUrl && (
              <Image
                src={tour.endCountry.flagPngUrl}
                w="16px"
                h="12px"
                borderRadius="md"
              />
            )}
            <Text fontSize="md" fontWeight="bold">
              {tour.endCountry?.officialName || tour.endCountry?.famousName}
            </Text>
          </HStack>
          <HStack gap={1} pl={1}>
            <Icon as={PlaneLanding} size="md" color="fg.muted" />
            <Text fontSize="2m" color="fg.muted">
              {tour.endCity?.name}
            </Text>
          </HStack>
        </VStack>
      ),
    },
    {
      header: "Route",
      key: "destinationCountries",
      render: (tour) => {
        const countries = tour.destinationCountries || [];

        // If there are no countries in the array, show "Direct"
        if (countries.length === 0) {
          return (
            <HStack gap={1}>
              <Icon as={MapPin} size="md" color="fg.muted" />
              <Text fontSize="2m" color="fg.muted" fontStyle="italic">
                Direct
              </Text>
            </HStack>
          );
        }

        // Otherwise, render the flags/names
        return (
          <HStack gap={1.5} maxW="200px" flexWrap="wrap">
            {countries.map((c, idx) => (
              <Box key={idx} title={c.officialName || c.famousName}>
                {c.flagPngUrl ? (
                  <Image
                    src={c.flagPngUrl}
                    w="16px"
                    h="12px"
                    borderRadius="2m"
                    border="1px solid"
                    borderColor="border.subtle"
                  />
                ) : (
                  <Icon as={MapPin} size="md" color="fg.subtle" />
                )}
              </Box>
            ))}
          </HStack>
        );
      },
    },
    {
      header: "Schedule",
      key: "startDate",
      render: (tour) => (
        <VStack align="start" gap={0}>
          <HStack gap={1}>
            <Icon as={Calendar} size="md" color="fg.subtle" />
            <Text fontSize="md" fontWeight="medium">
              {formatDate(tour.startDate)}
            </Text>
          </HStack>
          <Text fontSize="2m" color="fg.subtle" pl={4}>
            to {formatDate(tour.endDate)}
          </Text>
        </VStack>
      ),
    },
    {
      header: "Slots",
      key: "availableSlots",
      render: (tour) => {
        const hasSlots = (tour.availableSlots ?? 0) > 0;
        return (
          <Badge
            variant="subtle"
            colorPalette={hasSlots ? "green" : "red"}
            size="sm"
          >
            {tour.availableSlots} Left
          </Badge>
        );
      },
    },
    {
      header: "Price",
      key: "totalPrice",
      render: (tour) => (
        <Box textAlign="end" w="full">
          <Text fontWeight="extrabold" color="blue.fg">
            ${(tour.totalPrice ?? tour.basePrice ?? 0).toFixed(2)}
          </Text>
        </Box>
      ),
    },
    {
      header: "Action",
      key: "id",
      render: (tour) => {
        const canBook =
          (tour.availableSlots ?? 0) > 0 && tour.status === "ACTIVE";
        return (
          <Box textAlign="end">
            <Button
              size="sm"
              disabled={!canBook}
              colorPalette="blue"
              rounded="md"
              onClick={() =>
                navigate(isAuthenticated ? `/reserve/${tour.id}` : "/login")
              }
            >
              {isAuthenticated ? (canBook ? "Book" : "Full") : "Login"}
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <GenericTable
      data={tours}
      columns={columns}
      loading={loading}
      searchDisabled
      colorPalette="blue"
      exportFileName="Customer Tour Catalog"
      enableExport
    />
  );
};

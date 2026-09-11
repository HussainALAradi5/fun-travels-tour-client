import { 
  Box, Heading, Text, Button, Image, Stack, Badge, Flex, HStack, Card 
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import type { Tour } from "@/interface/tour/Tour";

interface Props {
  tour: Tour;
  isAuthenticated: boolean;
}

export const CustomerTourCatalogCard = ({ tour, isAuthenticated }: Props) => {
  const navigate = useNavigate();
  const hasSlots = (tour.availableSlots ?? 0) > 0;
  const canBook = hasSlots && tour.status === "ACTIVE";
  const displayPrice = tour.totalPrice ?? tour.basePrice ?? 0;

  return (
    <Card.Root 
      variant="elevated"
      bg="bg.surface"
      overflow="hidden"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
      borderRadius="2xl"
    >
      <Image 
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80" 
        alt={tour.title} 
        h="48" 
        w="full" 
        objectFit="cover" 
      />

      <Card.Body p={6}>
        <Stack gap={4}>
          <HStack justify="space-between" align="start" w="full">
            <Stack gap={1}>
              <Badge variant="subtle" colorPalette="blue" borderRadius="md" alignSelf="start">
                {tour.startCountry?.officialName} / {tour.startCity?.name}
              </Badge>
              <Badge variant="subtle" colorPalette="green" borderRadius="md" alignSelf="start">
                {tour.endCountry?.officialName} / {tour.endCity?.name}
              </Badge>
            </Stack>

            <Text fontSize="xs" color="fg.muted" fontWeight="bold">
              {tour.startDate ? new Date(tour.startDate).toLocaleDateString() : "TBD"}
            </Text>
          </HStack>
          
          <Heading size="md" color="fg">{tour.title}</Heading>
          
          <Text color="fg.muted" fontSize="sm" lineClamp={2}>
            {tour.description || "Join us for an incredible journey through the most beautiful landscapes."}
          </Text>
          
          <Flex gap={2} mt={2}>
             <Badge variant="outline" colorPalette={hasSlots ? "green" : "red"}>
               {tour.availableSlots} slots left
             </Badge>
             {hasSlots && <Badge variant="outline" colorPalette="blue">Instant Booking</Badge>}
          </Flex>
        </Stack>
      </Card.Body>

      <Card.Footer p={6} pt={0}>
        <Flex justify="space-between" align="center" w="full">
          <Box>
            <Text fontSize="xs" color="fg.muted" fontWeight="bold">FROM</Text>
            <Text fontSize="xl" fontWeight="bold" color="blue.fg">${displayPrice.toFixed(2)}</Text>
          </Box>

          {isAuthenticated ? (
            <Button 
              disabled={!canBook}
              colorPalette={canBook ? "blue" : "gray"} 
              rounded="lg"
              onClick={() => navigate(`/reserve/${tour.id}`)}
            >
              {canBook ? "Book Now" : (hasSlots ? "Coming Soon" : "Full")}
            </Button>
          ) : (
            <Badge 
              variant="surface" 
              colorPalette="orange" 
              p={2} 
              borderRadius="md"
              cursor="pointer"
              onClick={() => navigate("/login")}
            >
              Login to Book
            </Badge>
          )}
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};






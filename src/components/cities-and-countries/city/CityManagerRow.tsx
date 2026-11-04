import { Badge, Box, Button, HStack, IconButton, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import { Plus, Trash2 } from "lucide-react";
import { useCityManager } from "@/hooks/countries-and-cities/useCityManager";
import type { CityManagerRowProps } from "@/interfaces/props/geography/CityManagerRowProps";
import { ConfirmDeleteCityDialog } from "./ConfirmDeleteCityDialog";

export default function CityManagerRow({ countryId, countryName }: CityManagerRowProps) {
  const m = useCityManager(countryId);
  return (
    <Box p={6} bg="gray.50" _dark={{ bg: "gray.900/40" }} borderBottomRadius="md" borderTop="1px solid" borderColor="border">
      <Text fontWeight="bold" mb={4} fontSize="sm" color="fg.muted">CITIES IN {countryName.toUpperCase()}:</Text>
      <VStack align="stretch" gap={4}>
        <HStack flexWrap="wrap" gap={3}>
          {m.fetching ? <Spinner size="xs" color="blue.500" /> : m.cities.map((city) => (
            <Badge key={city.id} variant="surface" colorPalette="blue" px={3} py={1} borderRadius="full">
              <HStack gap={2}>
                <Text>{city.name}</Text>
                {m.isAdmin && (
                  <IconButton aria-label={`Delete ${city.name}`} size="xs" variant="ghost" colorPalette="red" onClick={() => m.setPendingDelete(city)}>
                    <Trash2 size={12} />
                  </IconButton>
                )}
              </HStack>
            </Badge>
          ))}
        </HStack>
        <HStack mt={2} maxW="md">
          <Input size="sm" placeholder={m.isAdmin ? "Enter city name..." : "Admin access required"} bg="white" _dark={{ bg: "gray.800" }}
            aria-label="New city name" value={m.newCity} onChange={(e) => m.setNewCity(e.target.value)} disabled={!m.isAdmin} />
          <Button size="sm" colorPalette="blue" onClick={m.add} loading={m.adding} disabled={!m.isAdmin || !m.newCity.trim()}>
            <Plus size={14} /> Add
          </Button>
        </HStack>
      </VStack>
      <ConfirmDeleteCityDialog city={m.pendingDelete} countryName={countryName} onCancel={() => m.setPendingDelete(null)} onConfirm={m.confirmDelete} />
    </Box>
  );
}

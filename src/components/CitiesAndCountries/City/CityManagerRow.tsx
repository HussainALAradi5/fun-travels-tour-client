import { useState, useEffect } from "react";
import {
  HStack,
  Input,
  Button,
  Text,
  VStack,
  Badge,
  IconButton,
  Box,
  Spinner,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import { Plus, Trash2, AlertTriangle } from "lucide-react";
import type { City } from "@/interface/geography/City";
import { cityService } from "@/Api/City";
import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/utilities/AuthContext";

export default function CityManagerRow({
  countryId,
  countryName,
}: {
  countryId: number;
  countryName: string;
}) {
  const [cities, setCities] = useState<City[]>([]);
  const [newCity, setNewCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchCities();
  }, [countryId]);

  const fetchCities = async () => {
    setFetching(true);
    try {
      const res = await cityService.getCitiesByCountry(countryId);
      setCities(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleAdd = async () => {
    if (!newCity.trim() || !isAdmin) return;
    setLoading(true);
    try {
      await cityService.createCity({
        name: newCity.trim(),
        country: { id: countryId },
      });
      setNewCity("");
      await fetchCities();
      toaster.create({ title: "City added successfully", type: "success" });
    } catch (error: unknown) {
      const serverMessage = error instanceof Error ? error.message : "Internal Server Error";

      toaster.create({
        title: "Cannot Add City",
        description: serverMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCity?.id) return;
    try {
      await cityService.deleteCity(selectedCity.id);
      setCities((prev) => prev.filter((c) => c.id !== selectedCity.id));
      toaster.create({ title: "City removed", type: "info" });
    } catch (error: unknown) {
      const serverMessage = error instanceof Error ? error.message : "Delete failed";
      toaster.create({ title: serverMessage, type: "error" });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedCity(null);
    }
  };

  return (
    <Box
      p={6}
      bg="gray.50"
      _dark={{ bg: "gray.900/40" }}
      borderBottomRadius="md"
      borderTop="1px solid"
      borderColor="border"
    >
      <Text fontWeight="bold" mb={4} fontSize="sm" color="fg.muted">
        CITIES IN {countryName.toUpperCase()}:
      </Text>

      <VStack align="stretch" gap={4}>
        <HStack flexWrap="wrap" gap={3}>
          {fetching ? (
            <Spinner size="xs" color="blue.500" />
          ) : (
            cities.map((city) => (
              <Badge
                key={city.id}
                variant="surface"
                colorPalette="blue"
                px={3}
                py={1}
                borderRadius="full"
              >
                <HStack gap={2}>
                  <Text>{city.name}</Text>
                  {isAdmin && (
                    <IconButton
                      size="xs"
                      variant="ghost"
                      colorPalette="red"
                      onClick={() => {
                        setSelectedCity(city);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 size={12} />
                    </IconButton>
                  )}
                </HStack>
              </Badge>
            ))
          )}
        </HStack>

        <HStack mt={2} maxW="md">
          <Input
            size="sm"
            placeholder={
              isAdmin ? "Enter city name..." : "Admin access required"
            }
            bg="white"
            _dark={{ bg: "gray.800" }}
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            disabled={!isAdmin}
          />
          <Button
            size="sm"
            colorPalette="blue"
            onClick={handleAdd}
            loading={loading}
            disabled={!isAdmin || !newCity.trim()}
          >
            <Plus size={14} /> Add
          </Button>
        </HStack>
      </VStack>

      <Dialog.Root
        open={isDeleteDialogOpen}
        onOpenChange={(e) => setIsDeleteDialogOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <HStack color="red.500">
                  <AlertTriangle size={20} />
                  <Dialog.Title>Confirm Delete</Dialog.Title>
                </HStack>
              </Dialog.Header>
              <Dialog.Body>
                {/* Are you sure you want to remove <b>{selectedCity?.name}</b>? */}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button colorPalette="red" onClick={handleDelete}>
                  Delete
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}



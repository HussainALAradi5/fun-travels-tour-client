import { useEffect, useState, useMemo } from "react";
import { 
  Box, Text, Container, Center, Spinner, Stack, SimpleGrid, IconButton, HStack, Separator, Input, VStack, Button, Image
} from "@chakra-ui/react";
import { LayoutGrid, List } from "lucide-react";

import { useTourManagement } from "@/hooks/tourManagement/useTourManagement";
import { useAuth } from "@/utilities/AuthContext";
import apiClient from "@/config/BaseApi";

import { Hero } from "@/components/ui/Custom/Hero";
import { UnifiedFilterBar, type FilterGroup } from "@/components/ui/Custom/UnifiedFilterBar";
import type { Country } from "@/interface/CountryInterface";
import { CustomerTourCatalogCard } from "./CustomerTourCatalog/CustomerTourCatalogCard";
import { CustomerTourCatalogTable } from "./CustomerTourCatalog/CustomerTourCatalogTable";

export const CustomerTourCatalog = () => {
  const { tours, isLoading, fetchCatalog } = useTourManagement();
  const { isAuthenticated } = useAuth();
  
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  
  // State for countries list with proper typing for Searchable Combobox
  const [countries, setCountries] = useState<{ label: React.ReactNode; value: string; searchText: string }[]>([]);

  const [filters, setFilters] = useState({
    searchTerm: "",
    startCountryId: "",
    endCountryId: "",
    startDate: "",
    endDate: "",
  });

  // 1. Fetch Countries and map them using Official Name for the Searchable Combobox
  useEffect(() => {
    apiClient.get<Country[]>("/countries").then((res) => {
      const options = res.data.map((c: Country) => {
        const name = c.officialName || c.famousName; 
        return {
          label: (
            <HStack gap={2}>
              {c.flagPngUrl && (
                <Image 
                  src={c.flagPngUrl} 
                  alt={name} 
                  w="20px" 
                  h="14px" 
                  borderRadius="xs" 
                  objectFit="cover"
                />
              )}
              <Text fontSize="xs">{name}</Text>
            </HStack>
          ),
          value: String(c.id),
          searchText: name // Critical for the internal filter logic in the Combobox
        };
      });
      setCountries(options);
    }).catch(console.error);
  }, []);

  // 2. Fetch data using the tourService.getCatalog API
  useEffect(() => {
    fetchCatalog({ 
      startCountryId: filters.startCountryId ? Number(filters.startCountryId) : undefined,
      endCountryId: filters.endCountryId ? Number(filters.endCountryId) : undefined,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
    });
  }, [filters.startCountryId, filters.endCountryId, filters.startDate, filters.endDate, fetchCatalog]);

  // 3. Client-side search for the tour title/expedition name
  const filteredTours = useMemo(() => {
    if (!filters.searchTerm) return tours;
    return tours.filter(t => t.title.toLowerCase().includes(filters.searchTerm.toLowerCase()));
  }, [tours, filters.searchTerm]);

  // 4. Configure Filter Bar groups with Official Names and Combobox variant
  const filterGroups: FilterGroup[] = [
    {
      label: "Origin",
      value: filters.startCountryId,
      options: countries,
      onChange: (val) => setFilters(prev => ({ ...prev, startCountryId: val })),
      variant: "combobox",
      placeholder: "Search Origin..." 
    },
    {
      label: "Destination",
      value: filters.endCountryId,
      options: countries,
      onChange: (val) => setFilters(prev => ({ ...prev, endCountryId: val })),
      variant: "combobox",
      placeholder: "Search Destination..." 
    }
  ];

  const handleReset = () => {
    setFilters({ 
        searchTerm: "", 
        startCountryId: "", 
        endCountryId: "", 
        startDate: "", 
        endDate: "" 
    });
  };

  if (isLoading && tours.length === 0) {
    return (
      <Center p={20} bg="bg.canvas" minH="100vh">
        <Stack align="center" gap={4}>
          <Spinner size="xl" color="blue.fg" />
          <Text color="fg.muted" fontWeight="medium">Loading Expeditions...</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Box pb={20} bg="bg.canvas" minH="100vh">
      <Hero 
        title="Explore the World" 
        subtitle="Discover hand-picked tours and exclusive travel deals." 
        imageUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80" 
      />

      <Container maxW="7xl" mt={-10}>
        
        {/* View Toggle Toolbar */}
        <HStack justify="space-between" mb={viewMode === "grid" ? 8 : 4} bg="bg.panel" p={4} borderRadius="xl" shadow="sm" borderWidth="1px">
          <Text fontWeight="bold" fontSize="lg">Available Tours ({filteredTours.length})</Text>
          <HStack gap={2}>
            <IconButton
              aria-label="Grid view"
              variant={viewMode === "grid" ? "solid" : "ghost"}
              colorPalette="blue"
              onClick={() => { setViewMode("grid"); handleReset(); }}
            >
              <LayoutGrid size={20} />
            </IconButton>
            <IconButton
              aria-label="Table view"
              variant={viewMode === "table" ? "solid" : "ghost"}
              colorPalette="blue"
              onClick={() => setViewMode("table")}
            >
              <List size={20} />
            </IconButton>
          </HStack>
        </HStack>

        {/* Filters visible only in Table mode */}
        {viewMode === "table" && (
          <Stack gap={4} bg="bg.panel" p={5} borderRadius="2xl" shadow="sm" borderWidth="1px" mb={8}>
            <UnifiedFilterBar
              searchLabel="Expedition Search"
              searchPlaceholder="Filter by tour title..."
              searchValue={filters.searchTerm}
              onSearchTrigger={(val) => setFilters(prev => ({ ...prev, searchTerm: val }))}
              filters={filterGroups}
              onReset={handleReset}
            />
            
            <Separator />

            <HStack gap={4} flexWrap="wrap">
              <VStack align="start" gap={1.5}>
                <Text fontSize="2xs" fontWeight="bold" color="fg.muted" textTransform="uppercase">Depart After</Text>
                <Input 
                  type="date" size="sm" borderRadius="xl" h="10" bg="bg.surface" 
                  value={filters.startDate} 
                  onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))} 
                />
              </VStack>
              <VStack align="start" gap={1.5}>
                <Text fontSize="2xs" fontWeight="bold" color="fg.muted" textTransform="uppercase">Return Before</Text>
                <Input 
                  type="date" size="sm" borderRadius="xl" h="10" bg="bg.surface" 
                  value={filters.endDate} 
                  onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))} 
                />
              </VStack>
            </HStack>
          </Stack>
        )}

        {/* Content Render */}
        {viewMode === "grid" ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
            {filteredTours.map((tour) => (
              <CustomerTourCatalogCard key={tour.id} tour={tour} isAuthenticated={isAuthenticated} />
            ))}
          </SimpleGrid>
        ) : (
          <CustomerTourCatalogTable 
            tours={filteredTours} 
            isAuthenticated={isAuthenticated} 
            loading={isLoading} 
          />
        )}

        {/* No Results Fallback */}
        {filteredTours.length === 0 && !isLoading && (
          <Center p={20} flexDirection="column" gap={4}>
            <Text color="fg.muted" fontSize="xl">No tours match your current selection.</Text>
            {viewMode === "table" && (
              <Button variant="outline" colorPalette="blue" onClick={handleReset}>Clear All Filters</Button>
            )}
          </Center>
        )}
      </Container>
    </Box>
  );
};
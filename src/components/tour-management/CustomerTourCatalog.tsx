import { useState } from "react";
import { Box, Button, Center, Container, SimpleGrid, Spinner, Stack, Text } from "@chakra-ui/react";
import { Hero } from "@/components/ui/custom/Hero";
import { useCatalogFilters } from "@/hooks/tour-management/useCatalogFilters";
import { useTourManagement } from "@/hooks/tour-management/useTourManagement";
import type { CatalogViewMode } from "@/types/tour/CatalogViewMode";
import { useAuth } from "@/utilities/AuthContext";
import { CatalogTableFilters } from "./customer-tour-catalog/CatalogTableFilters";
import { CatalogToolbar } from "./customer-tour-catalog/CatalogToolbar";
import { CustomerTourCatalogCard } from "./customer-tour-catalog/CustomerTourCatalogCard";
import { CustomerTourCatalogTable } from "./customer-tour-catalog/CustomerTourCatalogTable";
import { IMAGES } from "@/constants/ui/images";

const HERO_IMAGE = IMAGES.catalogHero;

export const CustomerTourCatalog = () => {
  const { tours, isLoading, fetchCatalog } = useTourManagement();
  const { isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<CatalogViewMode>("grid");
  const catalog = useCatalogFilters(tours, fetchCatalog);
  // The grid has no filter controls, so switching to it clears filters.
  const changeView = (mode: CatalogViewMode) => { setViewMode(mode); if (mode === "grid") catalog.reset(); };

  if (isLoading && tours.length === 0) {
    return (
      <Center p={20} bg="bg.canvas" minH="100vh">
        <Stack align="center" gap={4}><Spinner size="xl" color="blue.fg" /><Text color="fg.muted" fontWeight="medium">Loading Expeditions...</Text></Stack>
      </Center>
    );
  }
  const list = catalog.filteredTours;
  return (
    <Box pb={20} bg="bg.canvas" minH="100vh">
      <Hero title="Explore the World" subtitle="Discover hand-picked tours and exclusive travel deals." imageUrl={HERO_IMAGE} />
      <Container maxW="7xl" mt={-10}>
        <CatalogToolbar count={list.length} viewMode={viewMode} onViewMode={changeView} />
        {viewMode === "table" && (
          <CatalogTableFilters filters={catalog.filters} filterGroups={catalog.filterGroups} onChange={catalog.set} onReset={catalog.reset} />
        )}
        {viewMode === "grid" ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
            {list.map((tour) => <CustomerTourCatalogCard key={tour.id} tour={tour} isAuthenticated={isAuthenticated} />)}
          </SimpleGrid>
        ) : <CustomerTourCatalogTable tours={list} isAuthenticated={isAuthenticated} loading={isLoading} />}
        {list.length === 0 && !isLoading && (
          <Center p={20} flexDirection="column" gap={4}>
            <Text color="fg.muted" fontSize="xl">No tours match your current selection.</Text>
            {viewMode === "table" && <Button variant="outline" colorPalette="blue" onClick={catalog.reset}>Clear All Filters</Button>}
          </Center>
        )}
      </Container>
    </Box>
  );
};

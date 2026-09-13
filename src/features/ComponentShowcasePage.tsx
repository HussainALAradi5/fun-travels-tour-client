"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Box, Badge, Container, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { AlertComponent } from "@/components/ui/Custom/AlertComponent";
import { ContentCard } from "@/components/ui/Custom/ContentCard";
import { Hero } from "@/components/ui/Custom/Hero";
import { UnifiedFilterBar } from "@/components/ui/Custom/UnifiedFilterBar";
import { componentCatalog } from "@/constants/showcase/componentCatalog";
import { ComponentCategory } from "@/enums/ComponentCategory";

export default function ComponentShowcasePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showSuccess, setShowSuccess] = useState(true);

  const visibleItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return componentCatalog.filter((item) =>
      (!term || `${item.name} ${item.description}`.toLowerCase().includes(term)) &&
      (!category || item.category === category),
    );
  }, [category, search]);

  const resetFilters = () => {
    setSearch("");
    setCategory("");
  };

  return (
    <Box pb={16}>
      <Hero
        title="Generic Component Showcase"
        subtitle="A public, backend-independent page for testing shared UI behavior and responsive layouts."
        buttonText="View components"
        onActionClick={() => document.getElementById("component-examples")?.scrollIntoView({ behavior: "smooth" })}
      />

      <Container id="component-examples" maxW="7xl">
        <VStack align="stretch" gap={8}>
          <Box>
            <Heading size="2xl">Interactive examples</Heading>
            <Text color="fg.muted" mt={2}>Search runs only when you press Enter or click Search. Reset clears every filter.</Text>
          </Box>

          <ContentCard>
            <UnifiedFilterBar
              searchLabel="Component search"
              searchPlaceholder="Search name or description..."
              searchValue={search}
              onSearchTrigger={setSearch}
              filterLabel="Category"
              filterValue={category}
              onFilterChange={setCategory}
              options={[
                { label: "All categories", value: "" },
                { label: "Layout", value: ComponentCategory.LAYOUT },
                { label: "Feedback", value: ComponentCategory.FEEDBACK },
                { label: "Data display", value: ComponentCategory.DATA_DISPLAY },
                { label: "Form", value: ComponentCategory.FORM },
                { label: "Navigation", value: ComponentCategory.NAVIGATION },
              ]}
              count={visibleItems.length}
              onReset={resetFilters}
            />
          </ContentCard>

          {showSuccess && (
            <AlertComponent
              status="success"
              title="Alert component"
              description="Close, search, filter, and reset actions can be tested safely on this public page."
              isClosable
              onClose={() => setShowSuccess(false)}
            />
          )}

          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={5}>
            {visibleItems.map((item) => (
              <Box key={item.id} asChild _hover={{ transform: "translateY(-4px)" }} transition="transform 0.2s">
                <Link href={`/components/${item.slug}`}>
                  <ContentCard
                    header={<Heading size="md">{item.name}</Heading>}
                    footer={<HStack justify="space-between"><Badge>{item.category}</Badge><HStack gap={1} color="blue.500"><Text fontSize="sm">Open demo</Text><ArrowRight size={15} /></HStack></HStack>}
                  >
                    <Text color="fg.muted">{item.description}</Text>
                    <HStack wrap="wrap">{item.features.map((feature) => <Badge key={feature} variant="subtle">{feature}</Badge>)}</HStack>
                    {item.variants && <Text fontSize="xs" color="fg.muted">{item.variants.length} interactive variants</Text>}
                  </ContentCard>
                </Link>
              </Box>
            ))}
          </SimpleGrid>

          {visibleItems.length === 0 && (
            <AlertComponent status="info" title="No matches" description="Try another term or use Reset." />
          )}
        </VStack>
      </Container>
    </Box>
  );
}

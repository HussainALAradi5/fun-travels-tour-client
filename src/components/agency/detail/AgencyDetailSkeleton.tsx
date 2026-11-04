import { SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";

const INFO_CARDS = 3;

export function AgencyDetailSkeleton() {
  return (
    <VStack align="stretch" gap={6}>
      <Skeleton height="120px" borderRadius="2xl" />
      <SimpleGrid columns={INFO_CARDS} gap={6}>
        {Array.from({ length: INFO_CARDS }, (_, i) => <Skeleton key={i} height="100px" borderRadius="xl" />)}
      </SimpleGrid>
      <Skeleton height="400px" borderRadius="xl" />
    </VStack>
  );
}

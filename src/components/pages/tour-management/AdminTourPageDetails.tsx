import { useParams } from "@/lib/navigation";
import { TourDetailView } from "@/components/tour-management/tour/TourDetailsView";
import { Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { useTourManagement } from "@/hooks/tour-management/useTourManagement";
import { PageWrapper } from "@/components/ui/custom/PageWrapper";
import { IMAGES } from "@/constants/ui/images";

export const AdminTourDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { tour, loading } = useTourManagement(id);

  if (loading) return (
    <Center h="100vh">
      <VStack gap={4}>
        <Spinner color="blue.500" size="xl" />
        <Text color="fg.muted">Accessing Fleet Records...</Text>
      </VStack>
    </Center>
  );

  if (!tour) return <Center h="60vh">Information not found for Tour ID: {id}</Center>;

  return (
    <PageWrapper
      title={tour.title}
      subtitle={`Operational Console • ${tour.tourNumber}`}
      imageUrl={IMAGES.tourAdmin}
    >
      <TourDetailView tour={tour} />
    </PageWrapper>
  );
};

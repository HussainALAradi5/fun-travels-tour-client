// src/components/TourManagement/TransportationDetails.tsx
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  SimpleGrid,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Separator,
  Button,
  Badge,
  Breadcrumb,
  Skeleton,
} from "@chakra-ui/react";
import {
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutGrid,
  Activity,
} from "lucide-react";
import { MetricBox, TrackingStep } from "@/components/ui/Custom/GlowComponents";
import { SeatManager } from "../Seat/SeatManagement/SeatManager";
import {
  SeatStatusColors,
  TransportationColors,
} from "@/constants/roles/Colors";
import { StatusLegend } from "@/components/ui/Custom/StatusLegend";
import { transportationService } from "@/Api/tourmanagement/Transportation";
import { toaster } from "@/components/ui/toaster";
import type { Transportation } from "@/interface";
import type { TransportationStatus } from "@/enums/tourmanagement/TransportationStatus";
import { TransportationStatusSidebar } from "./TransportationStatusSidebar";

export const TransportationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [transport, setTransport] = useState<Transportation | null>(null);
  const [loading, setLoading] = useState(true);

  // Load Transport Data
  const loadTransport = useCallback(async () => {
    if (!id) return;
    try {
      const data = await transportationService.getById(Number(id));
      setTransport(data);
    } catch (error) {
      toaster.create({
        title: "Error fetching unit details",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTransport();
  }, [loadTransport]);

  // Handle Status Change from Sidebar
  const handleStatusChange = async (newStatus: TransportationStatus) => {
    if (!id) return;
    try {
      await transportationService.updateStatus(Number(id), newStatus);
      toaster.create({
        title: `Status updated to ${newStatus}`,
        type: "success",
      });
      await loadTransport(); // Refresh data to update sidebar and badges
    } catch (error: any) {
      toaster.create({
        title: "Update failed",
        description: error.response?.data?.message || "Check business rules.",
        type: "error",
      });
    }
  };

  const themeColor = transport ? TransportationColors[transport.type] : "blue";

  if (loading) return <Skeleton height="100vh" />;

  return (
    <Box bg="bg.canvas" minH="100vh" py={10}>
      <Container maxW="7xl">
        {/* Navigation & Header */}
        <VStack align="start" gap={6} mb={8}>
          <Breadcrumb.Root color="fg.muted" fontSize="sm">
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  onClick={() => navigate("/")}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Home size={14} /> Admin
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRight size={12} />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Link onClick={() => navigate("/admin/transports")}>
                  Inventory
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRight size={12} />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Text fontWeight="bold" color={`${themeColor}.500`}>
                  {transport?.code || `Unit #${id}`}
                </Text>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>

          <HStack justify="space-between" w="full">
            <VStack align="start" gap={1}>
              <Heading size="xl" fontWeight="black" letterSpacing="tight">
                Control Center
              </Heading>
              <Text color="fg.muted">
                Operational oversight for {transport?.providerName} —{" "}
                {transport?.transportationNumber}
              </Text>
            </VStack>
            <Button
              variant="subtle"
              size="sm"
              onClick={() => navigate("/admin/transports")}
              colorPalette="gray"
              borderRadius="full"
            >
              <ChevronLeft size={16} /> Back
            </Button>
          </HStack>
        </VStack>

        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} alignItems="start">
          {/* Left Column: Metadata & Unit Health */}
          <VStack align="stretch" gap={6}>
            <MetricBox
              icon={Activity}
              color={`${themeColor}.500`}
              label="Unit Health"
            >
              <VStack align="start" gap={6} mt={4} position="relative">
                <Box
                  position="absolute"
                  left="19px"
                  top="20px"
                  bottom="20px"
                  w="2px"
                  bg="border.subtle"
                />
                <TrackingStep
                  icon={MapPin}
                  bg={`${themeColor}.500`}
                  glowColor={themeColor}
                  title="Location"
                  location="Processing Terminal"
                />
                <TrackingStep
                  icon={Users}
                  bg="purple.500"
                  glowColor="purple"
                  title="Manager"
                  location="Admin Overlook"
                />
              </VStack>
            </MetricBox>

            {/* INTEGRATION: The Status Sidebar */}
            {transport && (
              <TransportationStatusSidebar
                transport={transport}
                onStatusChange={handleStatusChange}
              />
            )}

            <MetricBox
              icon={LayoutGrid}
              color="gray.500"
              label="Resource Metadata"
            >
              <VStack align="stretch" gap={4} mt={2}>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="fg.muted">
                    Registry ID
                  </Text>
                  <Text fontWeight="bold" fontFamily="mono">
                    #{id}
                  </Text>
                </HStack>
                <Separator />
                <HStack justify="space-between">
                  <Text fontSize="sm" color="fg.muted">
                    System Status
                  </Text>
                  <Badge
                    colorPalette={
                      transport?.status === "ACTIVE" ? "green" : "red"
                    }
                    variant="subtle"
                  >
                    {transport?.status}
                  </Badge>
                </HStack>
              </VStack>
            </MetricBox>
          </VStack>

          {/* Right Column: Seating Map */}
          <Box gridColumn={{ lg: "span 2" }}>
            <VStack align="stretch" gap={6}>
              <StatusLegend
                title="Seat Status Guide"
                colorMap={SeatStatusColors as unknown as Record<string, string>}
              />

              <Box
                bg="bg.panel"
                p={8}
                borderRadius="3xl"
                border="1px solid"
                borderColor="border.subtle"
                shadow="xl"
              >
                <HStack mb={6} justify="space-between">
                  <HStack>
                    <LayoutGrid size={20} />
                    <Heading size="md">Seating Map</Heading>
                  </HStack>
                  <HStack gap={4}>
                    <Text fontSize="xs" fontWeight="bold" color="fg.muted">
                      CAPACITY: {transport?.totalCapacity} SEATS
                    </Text>
                    <Badge variant="outline" colorPalette={themeColor}>
                      Live View
                    </Badge>
                  </HStack>
                </HStack>

                <SeatManager transportId={Number(id)} />
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};


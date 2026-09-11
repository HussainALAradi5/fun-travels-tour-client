import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  HStack,
  Button,
  Badge,
  SimpleGrid,
  VStack,
  Skeleton,
  Tabs,
} from "@chakra-ui/react";
import {
  Plus,
  MapPin,
  Building2,
  Phone,
  User as UserIcon,
  Users,
  type LucideIcon,
} from "lucide-react";

import { agencyService } from "@/Api/Agency/Agency";
import { branchService } from "@/Api/Agency/AgencyBranch";
import type { Agency } from "@/interface/agency/Agency";
import type { User } from "@/interface/user/User";
import type { AgencyBranch } from "@/interface/agency/AgencyBranch";

import { AddBranchDialog } from "@/components/Agency/AddBranchDialog";
import { BranchTab } from "@/components/Agency/BranchTab";
import { EmployeeTab } from "@/components/Agency/EmployeeTab";
import type { AgencyDetailProps } from "@/interface/props/agency/AgencyDetailProps";

export default function AgencyDetail({ forcedId }: AgencyDetailProps) {
  const { id: routeId } = useParams<{ id: string }>();
  const id = forcedId ? String(forcedId) : routeId;

  const [agency, setAgency] = useState<Agency | null>(null);
  const [employees, setEmployees] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBranchDialogOpen, setIsBranchDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [agencyRes, employeeRes] = await Promise.all([
        agencyService.getAgencyById(id),
        agencyService.getEmployeesByAgency(Number(id)),
      ]);
      setAgency(agencyRes);
      setEmployees(employeeRes || []);
    } catch (error: unknown) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleCreateBranch = async (branchData: AgencyBranch) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await branchService.createBranch(Number(id), branchData);
      setIsBranchDialogOpen(false);
      await loadData();
    } catch (error: unknown) {
      console.error("Error creating branch", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !agency) return <LoadingSkeleton />;
  if (!agency) return <Box p={10}>Agency not found.</Box>;

  return (
    <VStack gap={8} align="stretch">
      {/* Header */}
      <HStack justify="space-between" align="center">
        <HStack gap={5}>
          <Box p={4} bg="blue.600" color="white" borderRadius="2xl" shadow="lg">
            <Building2 size={32} />
          </Box>
          <VStack align="start" gap={0}>
            <HStack>
              <Heading size="2xl" letterSpacing="tight">
                {agency.agencyName}
              </Heading>
              <Badge
                colorPalette={agency.active ? "green" : "red"}
                variant="surface"
              >
                {agency.active ? "HQ Active" : "Inactive"}
              </Badge>
            </HStack>
            <Text color="fg.muted" fontSize="lg">
              {agency.city?.name}, {agency.country?.famousName}
            </Text>
          </VStack>
        </HStack>

        <Button
          colorPalette="blue"
          px={6}
          onClick={() => setIsBranchDialogOpen(true)}
          variant="ghost"
        >
          <Plus size={18} /> Add New Branch
        </Button>
      </HStack>

      {/* Info Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        <InfoCard
          icon={UserIcon}
          label="Agency Owner"
          value={agency.agencyOwner?.name || "N/A"}
          subValue={agency.ownerMobileNumber}
        />
        <InfoCard
          icon={Phone}
          label="Contact Info"
          value={agency.contactNumber}
          subValue="Primary Office"
        />
        <InfoCard
          icon={MapPin}
          label="Address"
          value={agency.address}
          subValue="Main Headquarters"
        />
      </SimpleGrid>

      {/* Tabs Section */}
      <Box
        bg="bg.panel"
        borderRadius="xl"
        border="1px solid"
        borderColor="border."
        shadow="sm"
        overflow="hidden"
      >
        <Tabs.Root defaultValue="branches" variant="line" colorPalette="blue">
          <Tabs.List
            px={6}
            pt={4}
            borderBottom="1px solid"
            borderColor="border.subtle"
          >
            <Tabs.Trigger value="branches" gap={2}>
              <Building2 size={16} /> Branches
            </Tabs.Trigger>
            <Tabs.Trigger value="employees" gap={2}>
              <Users size={16} /> Employees
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="branches">
            <BranchTab
              branches={agency.branches || []}
              agencyName={agency.agencyName}
              loading={loading}
            />
          </Tabs.Content>

          <Tabs.Content value="employees">
            {/* FIXED: Passing required agencyId and onRefresh props */}
            <EmployeeTab 
              employees={employees} 
              agencyName={agency.agencyName} 
              agencyId={Number(id)}
              onRefresh={loadData}
            />
          </Tabs.Content>
        </Tabs.Root>
      </Box>

      <AddBranchDialog
        open={isBranchDialogOpen}
        onClose={() => setIsBranchDialogOpen(false)}
        onSubmit={handleCreateBranch}
        loading={isSubmitting}
      />
    </VStack>
  );
}

// Sub-components
interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue?: string;
}

function InfoCard({ icon: Icon, label, value, subValue }: InfoCardProps) {
  return (
    <HStack p={5} bg="bg.panel" borderRadius="xl" border="1px solid" borderColor="border.subtle" gap={4}>
      <Box p={2.5} bg="blue.50" _dark={{ bg: "blue.950" }} color="blue.600" borderRadius="xl">
        <Icon size={20} />
      </Box>
      <VStack align="start" gap={0}>
        <Text fontSize="2xs" fontWeight="bold" color="fg.muted" textTransform="uppercase">{label}</Text>
        <Text fontWeight="bold" fontSize="md">{value}</Text>
        <Text fontSize="xs" color="fg.subtle">{subValue}</Text>
      </VStack>
    </HStack>
  );
}

function LoadingSkeleton() {
  return (
    <VStack align="stretch" gap={6}>
      <Skeleton height="120px" borderRadius="2xl" />
      <SimpleGrid columns={3} gap={6}>
        <Skeleton height="100px" borderRadius="xl" /><Skeleton height="100px" borderRadius="xl" /><Skeleton height="100px" borderRadius="xl" />
      </SimpleGrid>
      <Skeleton height="400px" borderRadius="xl" />
    </VStack>
  );
}

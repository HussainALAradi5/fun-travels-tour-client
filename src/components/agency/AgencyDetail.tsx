import { Box, SimpleGrid, Tabs, VStack } from "@chakra-ui/react";
import { Building2, MapPin, Phone, User as UserIcon, Users } from "lucide-react";
import { AddBranchDialog } from "@/components/agency/AddBranchDialog";
import { BranchTab } from "@/components/agency/BranchTab";
import { EmployeeTab } from "@/components/agency/EmployeeTab";
import { useAgencyDetail } from "@/hooks/agency/useAgencyDetail";
import type { AgencyDetailProps } from "@/interfaces/props/agency/AgencyDetailProps";
import { useParams } from "@/lib/navigation";
import { AgencyDetailSkeleton } from "./detail/AgencyDetailSkeleton";
import { AgencyHeader } from "./detail/AgencyHeader";
import { InfoCard } from "./detail/InfoCard";

export default function AgencyDetail({ forcedId }: AgencyDetailProps) {
  const { id: routeId } = useParams<{ id: string }>();
  const id = forcedId ? String(forcedId) : routeId;
  const d = useAgencyDetail(id);
  const agency = d.agency;
  if (d.loading && !agency) return <AgencyDetailSkeleton />;
  if (!agency) return <Box p={10}>Agency not found.</Box>;
  return (
    <VStack gap={8} align="stretch">
      <AgencyHeader agency={agency} onAddBranch={() => d.setIsBranchDialogOpen(true)} />
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        <InfoCard icon={UserIcon} label="Agency Owner" value={agency.agencyOwner?.name || "N/A"} subValue={agency.ownerMobileNumber} />
        <InfoCard icon={Phone} label="Contact Info" value={agency.contactNumber} subValue="Primary Office" />
        <InfoCard icon={MapPin} label="Address" value={agency.address} subValue="Main Headquarters" />
      </SimpleGrid>
      <Box bg="bg.panel" borderRadius="xl" border="1px solid" borderColor="border.subtle" shadow="sm" overflow="hidden">
        <Tabs.Root defaultValue="branches" variant="line" colorPalette="blue">
          <Tabs.List px={6} pt={4} borderBottom="1px solid" borderColor="border.subtle">
            <Tabs.Trigger value="branches" gap={2}><Building2 size={16} /> Branches</Tabs.Trigger>
            <Tabs.Trigger value="employees" gap={2}><Users size={16} /> Employees</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="branches">
            <BranchTab branches={d.branches} agencyName={agency.agencyName} loading={d.loading} />
          </Tabs.Content>
          <Tabs.Content value="employees">
            <EmployeeTab employees={d.employees} agencyName={agency.agencyName} agencyId={Number(id)} onRefresh={d.load} />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
      <AddBranchDialog open={d.isBranchDialogOpen} onClose={() => d.setIsBranchDialogOpen(false)}
        onSubmit={d.createBranch} loading={d.isSubmitting} />
    </VStack>
  );
}

import { useState } from "react";
import { useAgencies } from "@/hooks/agency/useAgencies";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Plus, ArrowLeft } from "lucide-react";
import { AgencyTable } from "@/components/Agency/AgencyTable";
import { AddAgencyDialog } from "@/components/Agency/AddAgencyDialog"; // Import Agency Dialog
import { AddBranchDialog } from "@/components/Agency/AddBranchDialog";
import AgencyDetail from "@/components/Agency/AgencyDetail";

export default function AgencyNetworkPage() {
  const {
    agencies,
    loading,
    // Agency Dialog States
    isAgencyDialogOpen,
    setIsAgencyDialogOpen,
    handleCreateAgency,
    // Branch Dialog States
    isBranchDialogOpen,
    setIsBranchDialogOpen,
    handleCreateBranch,
    setSelectedAgencyId,
    isSubmitting,
  } = useAgencies();

  const [viewingAgencyId, setViewingAgencyId] = useState<number | null>(null);

  const handleOpenAddAgency = () => {
    setIsAgencyDialogOpen(true);
  };

  const handleOpenAddBranch = (agencyId: number) => {
    setSelectedAgencyId(agencyId);
    setIsBranchDialogOpen(true);
  };

  return (
    <Box bg="gray.50" _dark={{ bg: "gray.950" }} minH="100vh" py={10}>
      <Container maxW="container.xl">
        {viewingAgencyId ? (
          <VStack align="stretch" gap={6}>
            <Button
              variant="ghost"
              size="sm"
              alignSelf="flex-start"
              onClick={() => setViewingAgencyId(null)}
              gap={2}
            >
              <ArrowLeft size={16} /> Back to Network
            </Button>
            <AgencyDetail forcedId={viewingAgencyId} />
          </VStack>
        ) : (
          <VStack gap={6} align="stretch">
            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Heading size="xl">Agency Network</Heading>
                <Text color="fg.muted">
                  Manage global branches and headquarters.
                </Text>
              </VStack>
              {/* Updated Button to Trigger Agency Dialog */}
              <Button
                colorPalette="blue"
                variant="ghost"
                size="sm"
                onClick={handleOpenAddAgency}
              >
                <Plus size={16} /> Add Agency
              </Button>
            </HStack>

            <AgencyTable
              data={agencies}
              loading={loading}
              onAddBranch={handleOpenAddBranch}
              onViewDetail={(id: number) => setViewingAgencyId(id)}
            />
          </VStack>
        )}
      </Container>

      {/* Agency Dialog Implementation */}
      <AddAgencyDialog
        open={isAgencyDialogOpen}
        onClose={() => setIsAgencyDialogOpen(false)}
        onSubmit={handleCreateAgency}
        loading={isSubmitting}
      />

      {/* Branch Dialog remains for table-row actions */}
      <AddBranchDialog
        open={isBranchDialogOpen}
        onClose={() => setIsBranchDialogOpen(false)}
        onSubmit={handleCreateBranch}
        loading={isSubmitting}
      />
    </Box>
  );
}

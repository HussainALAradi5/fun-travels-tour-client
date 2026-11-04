import { useState } from "react";
import { Box, Heading, Text, HStack, Button } from "@chakra-ui/react";
import { Download } from "lucide-react";
import { BranchTable } from "./BranchTable";
import { ExportDialog } from "../ui/custom/dialogs/ExportDialog";
import type { BranchTabProps } from "@/interfaces/props/agency/BranchTabProps";
import { ReportType } from "@/enums/report/ReportType";

export function BranchTab({ branches, agencyId, agencyName, loading }: BranchTabProps) {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const exportData = branches.map((b) => ({
    "Branch Name": b.branchName,
    Address: b.branchAddress,
    Contact: b.contactNumber || "N/A",
    Manager: b.branchManager?.name || "Unassigned",
    Status: b.active ? "Active" : "Inactive",
  }));

  return (
    <Box p={4}>
      <HStack justify="space-between" mb={4} px={2}>
        <Box>
          <Heading size="sm">Branch Network</Heading>
          <Text fontSize="sm" color="fg.muted">
            Physical locations associated with {agencyName}.
          </Text>
        </Box>
        <Button
          variant="outline"
          size="sm"
          colorPalette="green"
          onClick={() => setIsExportOpen(true)}
          disabled={branches.length === 0}
        >
          <Download size={14} /> Export Branches
        </Button>
      </HStack>

      <BranchTable
        branches={branches}
        agencyName={agencyName}
        loading={loading}
      />

      <ExportDialog
        open={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        data={exportData}
        fileName={`${agencyName.replace(/\s+/g, "_")}_Branches`}
        report={{ type: ReportType.AGENCY_BRANCHES, agencyId }}
      />
    </Box>
  );
}

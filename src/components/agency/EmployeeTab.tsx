import { Box, Button, Heading, HStack, Separator, Text } from "@chakra-ui/react";
import { Download, UserPlus } from "lucide-react";
import { STAFF_ROLE_OPTIONS } from "@/constants/agency/staff";
import { useEmployeeDirectory } from "@/hooks/agency/useEmployeeDirectory";
import type { EmployeeTabProps } from "@/interfaces/props/agency/EmployeeTabProps";
import { DataTable } from "../ui/custom/DataTable";
import { ExportDialog } from "../ui/custom/dialogs/ExportDialog";
import { UnifiedFilterBar } from "../ui/custom/UnifiedFilterBar";
import { AddEmployeeDialog } from "../user/controlpanel/AddEmployeeDialog";
import { AddEmployeesAction } from "./AddEmployeesAction";
import { EMPLOYEE_COLUMNS } from "./employee/employeeColumns";
import { ReportType } from "@/enums/report/ReportType";
import type { UserType } from "@/enums/UserType";
import { ALL_ROLES } from "@/constants/agency/staff";

export function EmployeeTab({ agencyName, agencyId, employees, onRefresh }: EmployeeTabProps) {
  const d = useEmployeeDirectory(employees, agencyId, onRefresh);
  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <Box>
          <Heading size="md">{agencyName} Staff</Heading>
          <Text fontSize="sm" color="fg.muted">Directory and permissions management.</Text>
        </Box>
        <HStack gap={3}>
          <Button variant="ghost" size="sm" onClick={() => d.setIsExportOpen(true)} colorPalette="green"><Download size={14} /> Export</Button>
          {d.canManage && <Button size="sm" colorPalette="blue" variant="ghost" onClick={d.addDialog.onOpen}><UserPlus size={14} /> Add Staff</Button>}
        </HStack>
      </HStack>
      {d.canManage && <Box mb={6}><AddEmployeesAction agencyId={agencyId} onRefresh={onRefresh} /></Box>}
      <Separator my={6} />
      <UnifiedFilterBar searchLabel="Search Personnel" searchPlaceholder="Filter staff..." searchValue={d.searchTerm}
        onSearchTrigger={d.setSearchTerm} onReset={d.reset} count={d.visible.length}
        filters={[{ label: "Role", value: d.roleFilter, onChange: d.setRoleFilter, options: STAFF_ROLE_OPTIONS }]} />
      <DataTable data={d.visible} columns={EMPLOYEE_COLUMNS} loading={false} colorPalette="blue" searchDisabled />
      <AddEmployeeDialog open={d.addDialog.open} onClose={d.addDialog.onClose} onSubmit={d.addEmployee}
        loading={d.isSubmitting} agencyName={agencyName} />
      <ExportDialog open={d.isExportOpen} onClose={() => d.setIsExportOpen(false)} data={d.exportRows} fileName={`${agencyName}_Staff`}
        report={{ type: ReportType.AGENCY_EMPLOYEES, agencyId, role: d.roleFilter === ALL_ROLES ? undefined : (d.roleFilter as UserType) }} />
    </Box>
  );
}

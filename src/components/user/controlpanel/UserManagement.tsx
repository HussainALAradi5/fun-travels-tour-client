import { Box, VStack } from "@chakra-ui/react";
import { DataTable } from "@/components/ui/custom/DataTable";
import { PageWrapper } from "@/components/ui/custom/PageWrapper";
import { UnifiedFilterBar } from "@/components/ui/custom/UnifiedFilterBar";
import { USER_ROLE_OPTIONS, USERS_BANNER } from "@/constants/user/userDirectory";
import { useUserDirectory } from "@/hooks/user/useUserDirectory";
import { USER_COLUMNS } from "./userColumns";
import { ReportType } from "@/enums/report/ReportType";
import type { UserType } from "@/enums/UserType";
import { ALL_USER_ROLES } from "@/constants/user/userDirectory";

export default function UserManagement() {
  const d = useUserDirectory();
  return (
    <PageWrapper title="System Users" subtitle="Monitor and manage all user accounts, security roles, and agency assignments." imageUrl={USERS_BANNER}>
      <VStack gap={6} align="stretch">
        <Box bg="bg.panel" p={4} borderRadius="xl" borderWidth="1px" shadow="sm">
          <UnifiedFilterBar searchLabel="Search Users" searchPlaceholder="Name, Email, or Username..." searchValue={d.searchQuery}
            onSearchTrigger={d.setSearchQuery} count={d.visible.length} onReset={d.reset}
            filters={[{ label: "User Role", value: d.role, onChange: d.setRole, options: USER_ROLE_OPTIONS, placeholder: "Filter by Role" }]} />
        </Box>
        <Box bg="bg.panel" borderRadius="xl" shadow="sm" borderWidth="1px" overflow="hidden">
          <DataTable data={d.visible} columns={USER_COLUMNS} loading={d.loading} showSelect enableExport
            exportFileName={`users-${d.role.toLowerCase()}`} searchDisabled
            report={{ type: ReportType.USERS, role: d.role === ALL_USER_ROLES ? undefined : (d.role as UserType) }} />
        </Box>
      </VStack>
    </PageWrapper>
  );
}

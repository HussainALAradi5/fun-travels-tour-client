import { useState, useMemo } from "react";
import { 
  Box, HStack, useDisclosure, Text, Heading, 
  Button, Separator, Avatar, Badge, VStack 
} from "@chakra-ui/react";
import { Download, UserPlus, Mail, Phone, Briefcase } from "lucide-react";

// Components & Services
import { userService } from "@/Api/User";
import { UserType } from "@/enums/UserType";
import { type User } from "@/interface/user/User";
import { authUtils } from "@/utilities/AuthUtils";
import { toaster } from "../ui/toaster";
import { AddEmployeesAction } from "./AddEmployeesAction";
import { UnifiedFilterBar } from "../ui/Custom/UnifiedFilterBar";
import { GenericTable, type Column } from "../ui/Custom/GenericTable";
import { AddEmployeeDialog } from "../User/controlpanel/AddEmployeeDialog";
import { GenericExportDialog } from "../ui/Custom/Dialogs/GenericExportDialog";
import { RoleColors } from "@/constants/roles/Colors";
import type { EmployeeTabProps } from "@/interface/props/agency/EmployeeTabProps";

// 1. DEFINE COLUMNS (This was missing)
const COLUMNS: Column<User>[] = [
  {
    header: "Employee",
    key: "name",
    render: (emp) => (
      <HStack gap={3}>
        <Avatar.Root size="sm">
          <Avatar.Image src={userService.getProfileImageUrl(emp.profileImageUrl)} />
          <Avatar.Fallback name={emp.name} />
        </Avatar.Root>
        <VStack align="start" gap={0}>
          <Text fontWeight="bold" fontSize="sm">{emp.name}</Text>
          <Text fontSize="xs" color="fg.muted">@{emp.userName}</Text>
        </VStack>
      </HStack>
    ),
  },
  {
    header: "Contact",
    key: "email",
    render: (emp) => (
      <VStack align="start" gap={0.5} fontSize="xs" color="fg.subtle">
        <HStack gap={1}><Mail size={12} /> {emp.email}</HStack>
        <HStack gap={1}><Phone size={12} /> {emp.mobileNumber || "N/A"}</HStack>
      </VStack>
    ),
  },
  {
    header: "Position",
    key: "userType",
    render: (emp) => (
      <VStack align="start" gap={1}>
        <Badge colorPalette={RoleColors[emp.userType]} variant="subtle" size="sm">
          <Briefcase size={10} style={{ marginRight: "4px" }} /> {emp.userType}
        </Badge>
        <Text fontSize="2xs" color="fg.muted">{emp.agencyBranch?.branchName || "Main"}</Text>
      </VStack>
    ),
  },
];

export function EmployeeTab({ 
  agencyName, 
  agencyId, 
  employees, 
  onRefresh 
}: EmployeeTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { open, onOpen, onClose } = useDisclosure();
  const currentUser = authUtils.getUser();
  const canManage = [UserType.ADMIN, UserType.OWNER, UserType.MANAGER].includes(currentUser?.userType as UserType);

  const displayData = useMemo(() => {
    let filtered = employees;
    
    if (roleFilter !== "ALL") {
      filtered = filtered.filter(e => e.userType === roleFilter);
    }
    
    if (searchTerm) {
      const q = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(e => 
        e.name.toLowerCase().includes(q) || 
        e.email.toLowerCase().includes(q) || 
        e.userName.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [employees, searchTerm, roleFilter]);

  const handleAddSubmit = async (formData: User) => {
    setIsSubmitting(true);
    try {
      await userService.addEmployee(formData, currentUser?.userType || "OWNER", agencyId);
      toaster.create({ title: "Added successfully", type: "success" });
      onClose();
      onRefresh();
    } catch (error) {
      toaster.create({ title: "Failed to add employee", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setRoleFilter("ALL");
  };

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <Box>
          <Heading size="md">{agencyName} Staff</Heading>
          <Text fontSize="sm" color="fg.muted">Directory and permissions management.</Text>
        </Box>
        <HStack gap={3}>
          <Button variant="ghost" size="sm" onClick={() => setIsExportOpen(true)} colorPalette="green">
            <Download size={14} /> Export
          </Button>
          {canManage && (
            <Button size="sm" colorPalette="blue" variant="ghost" onClick={onOpen}>
              <UserPlus size={14} /> Add Staff
            </Button>
          )}
        </HStack>
      </HStack>

      {canManage && (
        <Box mb={6}>
          <AddEmployeesAction agencyId={agencyId} onRefresh={onRefresh} />
        </Box>
      )}

      <Separator my={6} />

      <UnifiedFilterBar
        searchLabel="Search Personnel"
        searchPlaceholder="Filter staff..."
        searchValue={searchTerm}
        onSearchTrigger={setSearchTerm}
        onReset={handleReset}
        count={displayData.length}
        filters={[{
          label: "Role",
          value: roleFilter,
          onChange: setRoleFilter,
          options: [
            { label: "All", value: "ALL" },
            { label: "Manager", value: UserType.MANAGER },
            { label: "Employee", value: UserType.EMPLOYEE },
          ],
        }]}
      />

      <GenericTable 
        data={displayData} 
        columns={COLUMNS} 
        loading={false} 
        colorPalette="blue" 
        searchDisabled 
      />

      <AddEmployeeDialog 
        open={open} 
        onClose={onClose} 
        onSubmit={handleAddSubmit} 
        loading={isSubmitting} 
        agencyName={agencyName} 
      />
      
      <GenericExportDialog 
        open={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
        data={displayData.map(u => ({
          Name: u.name,
          Username: u.userName,
          Email: u.email,
          Mobile: u.mobileNumber,
          Role: u.userType,
          Status: u.active ? "Active" : "Inactive",
        }))} 
        fileName={`${agencyName}_Staff`} 
      />
    </Box>
  );
}


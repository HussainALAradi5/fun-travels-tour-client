// src/pages/UserManagement.tsx
import { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Badge, Text, HStack, VStack, Image, Circle } from "@chakra-ui/react";
import { GenericTable } from "@/components/ui/Custom/GenericTable";
import { Users, ShieldCheck } from "lucide-react";
import type { User } from "@/interface";
import { userService } from "@/Api/User";
import { RoleColors } from "@/constants/roles/Colors";
import { PageWrapper } from "@/components/ui/Custom/PageWrapper";
import { UserType } from "@/enums/UserType";
import { UnifiedFilterBar, type FilterGroup } from "@/components/ui/Custom/UnifiedFilterBar";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("ALL");

  const fetchUsers = useCallback(async (role: string = "ALL") => {
    setLoading(true);
    try {
      const res = role === "ALL" 
        ? await userService.getAllUsers() 
        : await userService.getUsersByRole(role);
      
      setUsers(res || []);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(selectedRole);
  }, [selectedRole, fetchUsers]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return users;

    return users.filter((user) => 
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.userName?.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const filterGroups: FilterGroup[] = [
    {
      label: "User Role",
      value: selectedRole,
      onChange: (val) => setSelectedRole(val),
      options: [
        { label: "All Roles", value: "ALL" },
        { label: "Admin", value: UserType.ADMIN },
        { label: "Manager", value: UserType.MANAGER },
        { label: "Employee", value: UserType.EMPLOYEE },
        { label: "Customer", value: UserType.CUSTOMER },
      ],
      placeholder: "Filter by Role",
    },
  ];

  const columns = useMemo(
    () => [
      {
        header: "User Details",
        key: "name",
        render: (u: User) => {
          const roleColor = u.userType ? RoleColors[u.userType] : "blue";
          const avatarUrl = userService.getProfileImageUrl(u.profileImageUrl);
          return (
            <HStack gap={3}>
              {u.profileImageUrl ? (
                <Image src={avatarUrl} alt={u.name} boxSize="40px" borderRadius="full" objectFit="cover" border="2px solid" borderColor={`${roleColor}.subtle`} />
              ) : (
                <Circle size="40px" bg={`${roleColor}.subtle`} color={`${roleColor}.fg`}>
                  <Users size={18} />
                </Circle>
              )}
              <VStack align="start" gap={0}>
                <Text fontWeight="bold" fontSize="sm">{u.name}</Text>
                <Text fontSize="xs" color="fg.muted">@{u.userName}</Text>
              </VStack>
            </HStack>
          );
        },
      },
      // Automatically handled by the smart TableRow
      { header: "Email", key: "email", type: "email" as const },
      { header: "Mobile", key: "mobileNumber", type: "mobile" as const },
      {
        header: "Role",
        key: "userType",
        render: (u: User) => (
          <Badge colorPalette={u.userType ? RoleColors[u.userType] : "blue"} variant="surface" size="sm">
            <HStack gap={1}><ShieldCheck size={12} />{u.userType}</HStack>
          </Badge>
        ),
      },
      {
        header: "Assignment",
        key: "agencyId",
        render: (u: User) => (
          <VStack align="start" gap={0}>
            <Text fontSize="xs" fontWeight="bold">{u.agency?.agencyName || "No Agency"}</Text>
            <Text fontSize="xs" color="fg.muted">{u.agencyBranch?.branchName || "Main / No Branch"}</Text>
          </VStack>
        ),
      },
      // Automatically handled by the smart TableRow
      { header: "Status", key: "active", type: "boolean" as const },
    ],
    []
  );

  return (
    <PageWrapper
      title="System Users"
      subtitle="Monitor and manage all user accounts, security roles, and agency assignments."
      imageUrl="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=2000"
    >
      <VStack gap={6} align="stretch">
        <Box bg="bg.panel" p={4} borderRadius="xl" borderWidth="1px" shadow="sm">
          <UnifiedFilterBar
            searchLabel="Search Users"
            searchPlaceholder="Name, Email, or Username..."
            searchValue={searchQuery}
            onSearchTrigger={(val) => setSearchQuery(val)}
            filters={filterGroups}
            count={filteredUsers.length}
            onReset={() => {
              setSearchQuery("");
              setSelectedRole("ALL");
            }}
          />
        </Box>

        <Box bg="bg.panel" borderRadius="xl" shadow="sm" borderWidth="1px" overflow="hidden">
          <GenericTable
            data={filteredUsers}
            columns={columns}
            loading={loading}
            showSelect={true}
            enableExport={true}
            exportFileName={`users-${selectedRole.toLowerCase()}`}
            searchDisabled
          />
        </Box>
      </VStack>
    </PageWrapper>
  );
}

import { Avatar, Badge, HStack, Text, VStack } from "@chakra-ui/react";
import { Briefcase, Mail, Phone } from "lucide-react";
import { UserTypeColor } from "@/enums/UserType";
import type { Column } from "@/interfaces/common/Column";
import type { User } from "@/interfaces/user/User";
import { userService } from "@/services/user/userService";

export const EMPLOYEE_COLUMNS: Column<User>[] = [
  { header: "Employee", key: "name", render: (emp) => (
    <HStack gap={3}>
      <Avatar.Root size="sm">
        {emp.profileImageUrl && <Avatar.Image src={userService.getProfileImageUrl(emp.profileImageUrl)} />}
        <Avatar.Fallback name={emp.name} />
      </Avatar.Root>
      <VStack align="start" gap={0}>
        <Text fontWeight="bold" fontSize="sm">{emp.name}</Text>
        <Text fontSize="xs" color="fg.muted">@{emp.userName}</Text>
      </VStack>
    </HStack>
  ) },
  { header: "Contact", key: "email", render: (emp) => (
    <VStack align="start" gap={0.5} fontSize="xs" color="fg.subtle">
      <HStack gap={1}><Mail size={12} /> {emp.email}</HStack>
      <HStack gap={1}><Phone size={12} /> {emp.mobileNumber || "N/A"}</HStack>
    </VStack>
  ) },
  { header: "Position", key: "userType", render: (emp) => (
    <VStack align="start" gap={1}>
      <Badge colorPalette={UserTypeColor[emp.userType]} variant="subtle" size="sm"><Briefcase size={10} /> {emp.userType}</Badge>
      <Text fontSize="2xs" color="fg.muted">{emp.agencyBranch?.branchName || "Main"}</Text>
    </VStack>
  ) },
];

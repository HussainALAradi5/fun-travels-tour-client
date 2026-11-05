import { Badge, Circle, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { ShieldCheck, Users } from "lucide-react";
import { GenderBadge } from "@/components/user/GenderBadge";
import { UserTypeColor } from "@/enums/UserType";
import type { User } from "@/interfaces/user/User";
import { userService } from "@/services/user/userService";

const roleColor = (u: User) => (u.userType ? UserTypeColor[u.userType] : "blue");

export const USER_COLUMNS = [
  { header: "User Details", key: "name", render: (u: User) => (
    <HStack gap={3}>
      {u.profileImageUrl ? (
        <Image src={userService.getProfileImageUrl(u.profileImageUrl)} alt={u.name} boxSize="40px" borderRadius="full" objectFit="cover"
          border="2px solid" borderColor={`${roleColor(u)}.subtle`} />
      ) : <Circle size="40px" bg={`${roleColor(u)}.subtle`} color={`${roleColor(u)}.fg`}><Users size={18} /></Circle>}
      <VStack align="start" gap={0}>
        <Text fontWeight="bold" fontSize="sm">{u.name}</Text>
        <Text fontSize="xs" color="fg.muted">@{u.userName}</Text>
      </VStack>
    </HStack>
  ) },
  { header: "Email", key: "email", type: "email" as const },
  { header: "Mobile", key: "mobileNumber", type: "mobile" as const },
  { header: "Gender", key: "gender", render: (u: User) => <GenderBadge gender={u.gender} /> },
  { header: "Role", key: "userType", render: (u: User) => (
    <Badge colorPalette={roleColor(u)} variant="surface" size="sm"><HStack gap={1}><ShieldCheck size={12} />{u.userType}</HStack></Badge>
  ) },
  { header: "Assignment", key: "agencyId", render: (u: User) => (
    <VStack align="start" gap={0}>
      <Text fontSize="xs" fontWeight="bold">{u.agency?.agencyName || "No Agency"}</Text>
      <Text fontSize="xs" color="fg.muted">{u.agencyBranch?.branchName || "Main / No Branch"}</Text>
    </VStack>
  ) },
  { header: "Status", key: "active", type: "boolean" as const },
];

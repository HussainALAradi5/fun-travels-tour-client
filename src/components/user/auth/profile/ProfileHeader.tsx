import { Avatar, Badge, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Edit, ShieldCheck } from "lucide-react";
import { UserTypeColor } from "@/enums/UserType";
import type { ProfileHeaderProps } from "@/interfaces/props/user/ProfileHeaderProps";
import { userService } from "@/services/user/userService";

export const ProfileHeader = ({ user, onEdit }: ProfileHeaderProps) => (
  <HStack justify="space-between" align="flex-end" wrap="wrap" gap={6}>
    <HStack gap={6} align="center">
      <Avatar.Root size="2xl" shape="rounded" borderWidth="4px" borderColor="bg.panel" boxShadow="xl">
        {user.profileImageUrl && <Avatar.Image src={userService.getProfileImageUrl(user.profileImageUrl)} />}
        <Avatar.Fallback name={user.name} />
      </Avatar.Root>
      <VStack align="start" gap={1}>
        <HStack gap={3}><Heading size="4xl">{user.name}</Heading>{user.active && <ShieldCheck size={20} color="green" />}</HStack>
        <Text fontSize="lg" color="fg.muted">@{user.userName}</Text>
        <HStack mt={1} gap={2}>
          <Badge colorPalette={user.userType ? UserTypeColor[user.userType] : "blue"} variant="solid">{user.userType}</Badge>
          <Badge colorPalette={user.active ? "green" : "red"} variant="subtle">{user.active ? "Active" : "Inactive"}</Badge>
        </HStack>
      </VStack>
    </HStack>
    <Button colorPalette="blue" variant="ghost" size="lg" onClick={onEdit}><Edit size={18} /> Edit Profile</Button>
  </HStack>
);

import { Center, HStack, Text, VStack } from "@chakra-ui/react";
import type { ProfileInfoCardProps } from "@/interfaces/props/user/ProfileInfoCardProps";

export const ProfileInfoCard = ({ icon: IconComponent, label, value }: ProfileInfoCardProps) => (
  <HStack gap={4} p={4} borderRadius="xl" border="1px solid" borderColor="border.subtle" bg="bg.muted/30">
    <Center boxSize="10" borderRadius="lg" bg="bg.panel" color="blue.500"><IconComponent size={20} /></Center>
    <VStack align="start" gap={0}>
      <Text fontSize="xs" fontWeight="semibold" color="fg.subtle">{label}</Text>
      <Text fontWeight="bold" fontSize="md" truncate>{value}</Text>
    </VStack>
  </HStack>
);

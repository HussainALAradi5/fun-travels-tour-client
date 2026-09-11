import { useState } from "react";
import { 
  VStack, Heading, Text, Spinner, Badge, // Keep Badge to display userType
  SimpleGrid, Separator, HStack, Button, Avatar, Center, Box, Icon // Added Icon
} from "@chakra-ui/react";
import { Mail, Phone, Calendar, Edit, ShieldCheck, Wallet, ArrowUpRight, Plus } from "lucide-react";

import { useUser } from "@/hooks/User/useUser";
import { useAccount } from "@/hooks/useAccount"; 
import { RoleColors } from "@/constants/roles/Colors";
import { authUtils } from "@/utilities/AuthUtils";
import { userService } from "@/Api/User";
import { PageWrapper } from "@/components/ui/Custom/PageWrapper";
import { EditProfile } from "./EditProfile";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { WalletTopUpModal } from "@/components/transactions/WalletTopUpModal";

export const ProfileView = () => {
  const { user, loading: userLoading, refreshUser } = useUser();
  const { balance, fetchBalance, isLoading: balanceLoading } = useAccount(user?.id); 
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // USED roleColor here
  const roleColor = user?.userType ? RoleColors[user.userType] : "blue";
  const bannerImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop";

  const handleUpdate = async (formValues: Record<string, unknown>) => {
    if (!user?.id) return;
    setIsSubmitting(true);
    try {
      const { removeImage, base64Image, profileImageUrl, ...rest } = formValues as Record<string, unknown> & { removeImage?: boolean; base64Image?: string; profileImageUrl?: string };
      const payload: Record<string, unknown> = { ...user, ...rest };

      if (removeImage) {
        payload.profileImageUrl = null;
        payload.base64Image = null;
      } else if (base64Image) {
        payload.base64Image = base64Image;
        payload.profileImageUrl = null;
      } else {
        payload.profileImageUrl = profileImageUrl;
        payload.base64Image = null;
      }

      const response = await userService.updateUser(user.id as unknown as number, payload as unknown as import("@/interface/user/User").User);
      
      if (response) {
        authUtils.saveSession(authUtils.getToken() || "", response);
        await refreshUser();
        setIsEditOpen(false);
        toaster.create({ title: "Profile updated successfully", type: "success" });
      }
    } catch {
      toaster.create({ title: "Update failed", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userLoading) return <Center minH="60vh"><Spinner size="xl" /></Center>;
  if (!user) return <Center py={20}><Button onClick={() => navigate("/login")}>Login Required</Button></Center>;

  return (
    <PageWrapper 
      title={`Welcome back, ${user.name.split(" ")[0]}`} 
      subtitle="View your account details and manage your identity."
      imageUrl={bannerImg}
    >
      <VStack align="stretch" gap={8}>
        <HStack justify="space-between" align="flex-end" wrap="wrap" gap={6}>
          <HStack gap={6} align="center">
            <Avatar.Root size="2xl" shape="rounded" borderWidth="4px" borderColor="bg.panel" boxShadow="xl">
              <Avatar.Image src={userService.getProfileImageUrl(user.profileImageUrl)} />
              <Avatar.Fallback name={user.name} />
            </Avatar.Root>
            <VStack align="start" gap={1}>
              <HStack gap={3}>
                <Heading size="4xl">{user.name}</Heading>
                {user.active && <ShieldCheck size={20} color="green" />}
              </HStack>
              <Text fontSize="lg" color="fg.muted">@{user.userName}</Text>
              
              {/* FIXED: Restored Badges to use roleColor */}
              <HStack mt={1} gap={2}>
                <Badge colorPalette={roleColor} variant="solid">{user.userType}</Badge>
                <Badge colorPalette={user.active ? "green" : "red"} variant="subtle">
                  {user.active ? "Active" : "Inactive"}
                </Badge>
              </HStack>

            </VStack>
          </HStack>
          <Button colorPalette="blue" variant="ghost" size="lg" onClick={() => setIsEditOpen(true)}>
            <Edit size={18} /> Edit Profile
          </Button>
        </HStack>

        <Separator />

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
          <VStack align="stretch" gap={6}>
            <Text fontSize="sm" fontWeight="bold" color="fg.muted" textTransform="uppercase">Personal Information</Text>
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
              <InfoCard icon={Mail} label="Email" value={user.email} />
              <InfoCard icon={Phone} label="Mobile" value={user.mobileNumber || "Not set"} />
              <InfoCard icon={Calendar} label="Age" value={`${user.age} Years`} />
            </SimpleGrid>
          </VStack>

          <VStack align="stretch" gap={6}>
            <Text fontSize="sm" fontWeight="bold" color="fg.muted" textTransform="uppercase">Financial Status</Text>
            <Box p={6} borderRadius="2xl" bg="blue.600" color="white" shadow="md">
              <HStack justify="space-between" align="flex-start" mb={4}>
                <VStack align="start" gap={0}>
                  <HStack gap={2} opacity={0.8}><Wallet size={16} /><Text fontSize="xs">CURRENT BALANCE</Text></HStack>
                  <Heading size="3xl">
                    {balanceLoading || balance === null ? <Spinner size="sm" /> : `$${balance.toFixed(2)}`}
                  </Heading>
                </VStack>
                <Button size="sm" colorPalette="green" onClick={() => setIsTopUpOpen(true)} shadow="sm">
                  <Plus size={16} /> Top Up
                </Button>
              </HStack>
              
              <Button size="sm" variant="ghost" bg="white/20" _hover={{ bg: "white/30" }} w="full" onClick={() => navigate("/transactions")}>
                View Ledger History 
                {/* FIXED: Wrapped ArrowUpRight in Icon to use Chakra props */}
                <Icon as={ArrowUpRight} ml={2} />
              </Button>
            </Box>
          </VStack>
        </SimpleGrid>
      </VStack>

      <EditProfile 
        open={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        onSubmit={handleUpdate} 
        loading={isSubmitting} 
        initialValues={user} 
      />

      <WalletTopUpModal 
        open={isTopUpOpen} 
        onClose={() => setIsTopUpOpen(false)} 
        onSuccess={fetchBalance} 
      />
    </PageWrapper>
  );
};

const InfoCard = ({ icon: IconComponent, label, value }: { icon: React.ComponentType<{ size?: number }>, label: string, value: string }) => (
  <HStack gap={4} p={4} borderRadius="xl" border="1px solid" borderColor="border.subtle" bg="bg.muted/30">
    <Center boxSize="10" borderRadius="lg" bg="bg.panel" color="blue.500"><IconComponent size={20} /></Center>
    <VStack align="start" gap={0}>
      <Text fontSize="xs" fontWeight="semibold" color="fg.subtle">{label}</Text>
      <Text fontWeight="bold" fontSize="md" truncate>{value}</Text>
    </VStack>
  </HStack>
);
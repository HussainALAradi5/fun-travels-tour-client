import { useState } from "react";
import { Button, Center, Separator, SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
import { Calendar, Mail, Phone } from "lucide-react";
import { WalletTopUpModal } from "@/components/transactions/WalletTopUpModal";
import { PageWrapper } from "@/components/ui/custom/PageWrapper";
import { useAccount } from "@/hooks/useAccount";
import { useProfileEditor } from "@/hooks/user/useProfileEditor";
import { useUser } from "@/hooks/user/useUser";
import { useNavigate } from "@/lib/navigation";
import { EditProfile } from "./EditProfile";
import { ProfileHeader } from "./profile/ProfileHeader";
import { ProfileInfoCard } from "./profile/ProfileInfoCard";
import { ProfileWalletCard } from "./profile/ProfileWalletCard";

const BANNER = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop";
const SECTION = { fontSize: "sm", fontWeight: "bold", color: "fg.muted", textTransform: "uppercase" } as const;

export const ProfileView = () => {
  const navigate = useNavigate();
  const { user, loading, refreshUser } = useUser();
  const { balance, fetchBalance, isLoading: balanceLoading } = useAccount(user?.id);
  const editor = useProfileEditor(user, refreshUser);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  if (loading) return <Center minH="60vh"><Spinner size="xl" /></Center>;
  if (!user) return <Center py={20}><Button onClick={() => navigate("/login")}>Login Required</Button></Center>;
  return (
    <PageWrapper title={`Welcome back, ${user.name.split(" ")[0]}`} subtitle="View your account details and manage your identity." imageUrl={BANNER}>
      <VStack align="stretch" gap={8}>
        <ProfileHeader user={user} onEdit={() => editor.setIsEditOpen(true)} />
        <Separator />
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
          <VStack align="stretch" gap={6}>
            <Text {...SECTION}>Personal Information</Text>
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
              <ProfileInfoCard icon={Mail} label="Email" value={user.email} />
              <ProfileInfoCard icon={Phone} label="Mobile" value={user.mobileNumber || "Not set"} />
              <ProfileInfoCard icon={Calendar} label="Age" value={user.age ? `${user.age} Years` : "Not set"} />
            </SimpleGrid>
          </VStack>
          <VStack align="stretch" gap={6}>
            <Text {...SECTION}>Financial Status</Text>
            <ProfileWalletCard balance={balance} loading={balanceLoading} onTopUp={() => setIsTopUpOpen(true)} onHistory={() => navigate("/transactions")} />
          </VStack>
        </SimpleGrid>
      </VStack>
      <EditProfile open={editor.isEditOpen} onClose={() => editor.setIsEditOpen(false)} onSubmit={editor.save}
        loading={editor.isSubmitting} initialValues={user} />
      <WalletTopUpModal open={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} onSuccess={fetchBalance} />
    </PageWrapper>
  );
};

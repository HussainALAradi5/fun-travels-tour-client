import { useState } from "react";
import { Button, Center, Separator, SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
import { Building2, Calendar, CreditCard, Mail, MapPinned, Phone, UserCheck } from "lucide-react";
import { WalletTopUpModal } from "@/components/transactions/WalletTopUpModal";
import { PageWrapper } from "@/components/ui/custom/PageWrapper";
import { useProfile } from "@/hooks/user/useProfile";
import { useNavigate } from "@/lib/navigation";
import { EditProfile } from "./EditProfile";
import { ProfileHeader } from "./profile/ProfileHeader";
import { ProfileInfoCard } from "./profile/ProfileInfoCard";
import { ProfileWalletCard } from "./profile/ProfileWalletCard";
import { PROFILE_BANNER, PROFILE_SECTION_STYLE } from "@/constants/user/profile";

export const ProfileView = () => {
  const navigate = useNavigate();
  const p = useProfile();
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  if (p.loading) return <Center minH="60vh"><Spinner size="xl" /></Center>;
  if (!p.profile) return <Center py={20}><Button onClick={() => navigate("/login")}>Login Required</Button></Center>;
  const { profile } = p;
  return (
    <PageWrapper title={`Welcome back, ${profile.name.split(" ")[0]}`} subtitle="View your account details and manage your identity." imageUrl={PROFILE_BANNER}>
      <VStack align="stretch" gap={8}>
        <ProfileHeader user={profile} onEdit={() => p.setIsEditOpen(true)} />
        <Separator />
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
          <VStack align="stretch" gap={6}>
            <Text {...PROFILE_SECTION_STYLE}>Personal Information</Text>
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
              <ProfileInfoCard icon={Mail} label="Email" value={profile.email} />
              <ProfileInfoCard icon={Phone} label="Mobile" value={profile.mobileNumber || "Not set"} />
              <ProfileInfoCard icon={Calendar} label="Age" value={profile.age ? `${profile.age} Years` : "Not set"} />
              <ProfileInfoCard icon={UserCheck} label="Member since"
                value={profile.memberSince ? new Date(profile.memberSince).toLocaleDateString() : "Unknown"} />
              {profile.agency && <ProfileInfoCard icon={Building2} label="Agency" value={profile.agency.agencyName} />}
              {profile.agencyBranch && <ProfileInfoCard icon={MapPinned} label="Branch" value={profile.agencyBranch.branchName} />}
            </SimpleGrid>
          </VStack>
          <VStack align="stretch" gap={6}>
            <Text {...PROFILE_SECTION_STYLE}>Financial Status</Text>
            <ProfileWalletCard balance={profile.wallet?.balance ?? null} loading={false}
              onTopUp={() => setIsTopUpOpen(true)} onHistory={() => navigate("/transactions")} />
            {profile.wallet && <ProfileInfoCard icon={CreditCard} label="Wallet account" value={profile.wallet.accountNumber} />}
          </VStack>
        </SimpleGrid>
      </VStack>
      <EditProfile open={p.isEditOpen} onClose={() => p.setIsEditOpen(false)} onSubmit={p.save}
        loading={p.isSubmitting} initialValues={profile} />
      <WalletTopUpModal open={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} onSuccess={p.refresh} />
    </PageWrapper>
  );
};

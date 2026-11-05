import { PageWrapper } from "@/components/ui/custom/PageWrapper";
import { UserRequestManager } from "@/components/user-request/UserRequestManagement";
import { IMAGES } from "@/constants/ui/images";

const UserRequestsPage = () => (
  <PageWrapper
    title="Support & Suggestions"
    subtitle="Manage user feedback and support tickets in one central hub."
imageUrl={IMAGES.support}
    >
    <UserRequestManager />
  </PageWrapper>
);

export default UserRequestsPage;

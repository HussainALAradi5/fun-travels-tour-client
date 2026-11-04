import { PageWrapper } from "@/components/ui/custom/PageWrapper";
import { UserRequestManager } from "@/components/user-request/UserRequestManagement";

const UserRequestsPage = () => (
  <PageWrapper
    title="Support & Suggestions"
    subtitle="Manage user feedback and support tickets in one central hub."
imageUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1600"
    >
    <UserRequestManager />
  </PageWrapper>
);

export default UserRequestsPage;

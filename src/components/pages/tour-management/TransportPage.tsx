
import { TransportationManager } from "@/components/tour-management/TransportationManager";
import { PageWrapper } from "@/components/ui/custom/PageWrapper";

const TransportPage = () => (
  <PageWrapper
    title="Transportation Inventory"
    subtitle="Manage vehicles and providers."
    imageUrl="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1600"
  >
    <TransportationManager />
  </PageWrapper>
);

export default TransportPage;

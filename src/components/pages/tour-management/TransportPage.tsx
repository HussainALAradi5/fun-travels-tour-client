
import { TransportationManager } from "@/components/tour-management/TransportationManager";
import { PageWrapper } from "@/components/ui/custom/PageWrapper";
import { IMAGES } from "@/constants/ui/images";

const TransportPage = () => (
  <PageWrapper
    title="Transportation Inventory"
    subtitle="Manage vehicles and providers."
    imageUrl={IMAGES.transport}
  >
    <TransportationManager />
  </PageWrapper>
);

export default TransportPage;

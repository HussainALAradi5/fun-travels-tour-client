import { CustomerTicketsManager } from "@/components/tour-management/ticket/CustomerTicketsManager";
import { PageWrapper } from "@/components/ui/custom/PageWrapper";
import { IMAGES } from "@/constants/ui/images";

export default function CustomerTicketsPage() {
  return (
    <PageWrapper
      title="My Expeditions"
      subtitle="Manage your upcoming trips, view boarding passes, and review travel history."
      imageUrl={IMAGES.tickets}
      showAction={false}
    >
      <CustomerTicketsManager />
    </PageWrapper>
  );
}
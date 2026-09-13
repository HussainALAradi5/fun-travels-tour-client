import { CustomerTicketsManager } from "@/components/TourManagement/Ticket/CustomerTicketsManager";
import { PageWrapper } from "@/components/ui/Custom/PageWrapper";

export default function CustomerTicketsPage() {
  return (
    <PageWrapper
      title="My Expeditions"
      subtitle="Manage your upcoming trips, view boarding passes, and review travel history."
      imageUrl="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80"
      showAction={false}
    >
      <CustomerTicketsManager />
    </PageWrapper>
  );
}
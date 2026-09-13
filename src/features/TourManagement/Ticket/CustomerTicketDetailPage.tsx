import { CustomerTicketDetailManager } from "@/components/TourManagement/Ticket/CustomerTicketDetailManager";
import { PageWrapper } from "@/components/ui/Custom/PageWrapper";

export default function CustomerTicketDetailPage() {
  return (
    <PageWrapper
      title="Boarding Pass & Tracking"
      subtitle="Detailed itinerary and live tracking for your selected expedition."
      imageUrl="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80"
      showAction={false}
    >
      <CustomerTicketDetailManager />
    </PageWrapper>
  );
}
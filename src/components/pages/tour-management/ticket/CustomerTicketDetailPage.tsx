import { CustomerTicketDetailManager } from "@/components/tour-management/ticket/CustomerTicketDetailManager";
import { PageWrapper } from "@/components/ui/custom/PageWrapper";
import { IMAGES } from "@/constants/ui/images";

export default function CustomerTicketDetailPage() {
  return (
    <PageWrapper
      title="Boarding Pass & Tracking"
      subtitle="Detailed itinerary and live tracking for your selected expedition."
      imageUrl={IMAGES.ticketDetail}
      showAction={false}
    >
      <CustomerTicketDetailManager />
    </PageWrapper>
  );
}
import { CustomerNotificationsManager } from "@/components/notifications/CustomerNotificationManager";
import { PageWrapper } from "@/components/ui/custom/PageWrapper";
import { IMAGES } from "@/constants/ui/images";

export default function CustomerNotificationsPage() {
  return (
    <PageWrapper
      title="Communication Center"
      subtitle="Stay updated with your latest tour approvals, booking confirmations, and travel alerts."
      imageUrl={IMAGES.notifications}
      showAction={false}
    >
      <CustomerNotificationsManager />
    </PageWrapper>
  );
}
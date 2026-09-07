import { CustomerNotificationsManager } from "@/components/Notifications/CustomerNotificationManager";
import { PageWrapper } from "@/components/ui/Custom/PageWrapper";

export default function CustomerNotificationsPage() {
  return (
    <PageWrapper
      title="Communication Center"
      subtitle="Stay updated with your latest tour approvals, booking confirmations, and travel alerts."
      imageUrl="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80"
      showAction={false}
    >
      <CustomerNotificationsManager />
    </PageWrapper>
  );
}
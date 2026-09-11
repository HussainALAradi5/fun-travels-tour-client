import { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";

import { GenericAuditLog } from "@/components/ui/Custom/GenericAuditLog";
import type { AuditEventItem } from "@/interface/common/AuditEventItem";
import { genericTrackingService } from "@/Api/genericTracking";
import type { TourEventLogDetailViewProps } from "@/interface/props/tour/TourEventLogDetailViewProps";

export const TourEventLogDetailView = ({ tourId }: TourEventLogDetailViewProps) => {
  const [events, setEvents] = useState<AuditEventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!tourId) return;

    genericTrackingService.getTimeline("TOUR" as never, tourId)
      .then((res) => {
        const rawEvents = res?.events || [];

        const mappedEvents: AuditEventItem[] = rawEvents.map((log) => ({
          id: log.id || 0,
          actorName: log.actor?.name || "System",
          action: log.action || "UPDATE",
          description: log.description ?? undefined,
          createdAt: log.createdAt || new Date().toISOString(),
        }));

        setEvents(mappedEvents);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [tourId]);

  if (isLoading) {
    return (
      <Center p={8} bg="bg.panel" borderRadius="2xl" borderWidth="1px">
        <Spinner color="blue.500" />
      </Center>
    );
  }

  return (
    <GenericAuditLog
      events={events}
      title="Tour Audit Log"
      emptyMessage="No events have been recorded for this tour yet."
      initiallyVisibleCount={4}
    />
  );
};

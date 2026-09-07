import { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";

// Assuming your tracking service is exported here

// Import your GenericAuditLog component
import { GenericAuditLog, type AuditEventItem } from "@/components/ui/Custom/GenericAuditLog";
import { genericTrackingService } from "@/Api/genericTracking";

interface TourEventLogDetailViewProps {
  tourId: number;
}

export const TourEventLogDetailView = ({ tourId }: TourEventLogDetailViewProps) => {
  const [events, setEvents] = useState<AuditEventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!tourId) return;
    
    setIsLoading(true);
    
    // Pass "TOUR" as the ReferenceType. Cast to 'any' to avoid strict enum typing errors if needed
    genericTrackingService.getTimeline("TOUR" as any, tourId)
      .then((res) => {
        // Extract the events array from your ApiResponse structure
        const rawEvents = res.data?.events || [];
        
        // Map backend GenericEventLog to frontend AuditEventItem
        const mappedEvents: AuditEventItem[] = rawEvents.map((log: any) => ({
          id: log.id,
          actorName: log.actor?.name || "System",
          action: log.action, // e.g., "CREATED", "STATUS_CHANGED"
          description: log.description,
          createdAt: log.createdAt,
        }));
        
        setEvents(mappedEvents);
      })
      .catch((err) => console.error("Failed to load tour events:", err))
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
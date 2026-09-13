import { useState } from "react";
import { Box, HStack, VStack, Text, Badge, Icon, Center, Button } from "@chakra-ui/react";
import { Activity, History, ChevronDown, ChevronUp } from "lucide-react";
import { CollapsibleContainer } from "./CollapsibleContainer";
import type { AuditEventItem } from "@/interface/common/AuditEventItem";
import type { AuditLogProps } from "@/interface/props/ui/AuditLogProps";


export const AuditLog = ({
  events,
  title = "System Audit Log",
  emptyMessage = "No system events recorded yet.",
  initiallyVisibleCount = 3
}: AuditLogProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleEvents = events.slice(0, initiallyVisibleCount);
  const hiddenEvents = events.slice(initiallyVisibleCount);
  const hasHiddenEvents = hiddenEvents.length > 0;
  const renderEvent = (event: AuditEventItem) => (
    <HStack key={event.id} align="start" gap={3}>
      <Center w={6} h={6} mt={1} borderRadius="full" bg="bg.muted" color="fg.muted" flexShrink={0}>
        <Activity size={12} />
      </Center>
      <VStack align="start" gap={0}>
        <Text fontSize="sm" fontWeight="bold" color="fg">
          {event.actorName} • {event.action}
        </Text>
        {event.description && (
          <Text fontSize="xs" color="fg.muted">{event.description}</Text>
        )}
        <Text fontSize="2xs" color="fg.subtle">
          {new Date(event.createdAt).toLocaleString()}
        </Text>
      </VStack>
    </HStack>
  );

  return (
    <Box bg="bg.panel" p={6} borderRadius="2xl" borderWidth="1px" shadow="sm">
      <HStack mb={4} justify="space-between">
        <HStack color="fg.muted">
          <Icon size="sm"><History/></Icon>
          <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">
            {title}
          </Text>
        </HStack>
        <Badge colorPalette="gray" borderRadius="full">{events.length} Events</Badge>
      </HStack>

      <VStack align="stretch" gap={4}>
        {events.length === 0 ? (
          <Text color="fg.muted" fontSize="sm">{emptyMessage}</Text>
        ) : (
          <>
{visibleEvents.map(renderEvent)}
<CollapsibleContainer isOpen={isExpanded}>
              <VStack align="stretch" gap={4} pt={4}>
                {hiddenEvents.map(renderEvent)}
              </VStack>
            </CollapsibleContainer>
{hasHiddenEvents && (
              <Button variant="ghost" size="sm" color="fg.muted" w="full" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? (
                  <><ChevronUp size={14} style={{marginRight:'4px'}}/> Show Less</>
                ) : (
                  <><ChevronDown size={14} style={{marginRight:'4px'}}/> View {hiddenEvents.length} older events</>
                )}
              </Button>
            )}
          </>
        )}
      </VStack>
    </Box>
  );
};

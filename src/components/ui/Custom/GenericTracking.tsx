import { useState } from "react";
import { 
  Box, VStack, HStack, Text, Icon, 
  Collapsible, Button 
} from "@chakra-ui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { barGlow } from "@/utilities/Animations";
import { TrackingStep } from "./GlowComponents";
import type { GenericTrackingProps, TrackingItem } from "@/interface/props/ui/GenericTrackingProps";

export type { TrackingItem } from "@/interface/props/ui/GenericTrackingProps";

export const GenericTracking = ({ items, initialVisibleMiddle = 1, animate = true }: GenericTrackingProps) => {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  const firstItem = items[0];
  const lastItem = items.length > 1 ? items[items.length - 1] : null;
  const middleItems = items.slice(1, -1);

  const visibleMiddle = middleItems.slice(0, initialVisibleMiddle);
  const hiddenMiddle = middleItems.slice(initialVisibleMiddle);

  const Connector = ({ color }: { color: string }) => (
    <Box w="10" display="flex" justifyContent="center">
      <Box 
        w="2px" 
        h="30px" 
        bg={color} 
        animation={animate ? `${barGlow} 2s infinite ease-in-out` : undefined}
        opacity={animate ? 0.4 : 0.2}
      />
    </Box>
  );

  return (
    <VStack align="start" gap="0" w="full">
      <TrackingStep 
        icon={firstItem.icon} 
        bg={firstItem.color} 
        title={firstItem.title} 
        location={firstItem.description} 
        glowColor={firstItem.glowColor} 
        animate={animate}
      />
      
      {items.length > 1 && <Connector color={firstItem.color} />}

      {visibleMiddle.map((item) => (
        <Box key={item.id} w="full">
          <TrackingStep 
            icon={item.icon} 
            bg={item.color} 
            title={item.title} 
            location={item.description} 
            glowColor={item.glowColor} 
            animate={animate}
          />
          <Connector color={item.color} />
        </Box>
      ))}

      {hiddenMiddle.length > 0 && (
        <Box w="full">
          <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            {!open && (
              <HStack gap="4" mb="4">
                <Box w="10" display="flex" justifyContent="center">
                  <Box w="2px" h="20px" bg="border.subtle" opacity="0.3" borderStyle="dashed" borderLeftWidth="2px" />
                </Box>
                <Collapsible.Trigger asChild>
                  <Button variant="subtle" size="xs" colorPalette="blue" borderRadius="full" height="6">
                    <Icon as={ChevronDown} size="xs" />
                    <Text fontSize="2xs" fontWeight="black">
                      {hiddenMiddle.length} MORE STOPS
                    </Text>
                  </Button>
                </Collapsible.Trigger>
              </HStack>
            )}

            <Collapsible.Content>
              <VStack align="start" gap="0">
                {hiddenMiddle.map((item) => (
                  <Box key={item.id} w="full">
                    <TrackingStep 
                      icon={item.icon} 
                      bg={item.color} 
                      title={item.title} 
                      location={item.description} 
                      glowColor={item.glowColor} 
                      animate={animate}
                    />
                    <Connector color={item.color} />
                  </Box>
                ))}
              </VStack>
              <Button variant="ghost" size="xs" onClick={() => setOpen(false)} ml="12" mb="4" colorPalette="gray">
                <Icon as={ChevronUp} size="xs" /> Hide
              </Button>
            </Collapsible.Content>
          </Collapsible.Root>
        </Box>
      )}

      {lastItem && (
        <TrackingStep 
          icon={lastItem.icon} 
          bg={lastItem.color} 
          title={lastItem.title} 
          location={lastItem.description} 
          glowColor={lastItem.glowColor} 
          animate={animate}
        />
      )}
    </VStack>
  );
};


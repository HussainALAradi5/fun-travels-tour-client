import { glowPulse } from "@/utilities/Animations";
import { Box, HStack, VStack, Circle, Text, Icon } from "@chakra-ui/react";
import type { LucideIcon } from "lucide-react";

interface TrackingStepProps {
  icon: LucideIcon;
  bg: string;
  title: string;
  location?: string;
  glowColor: string;
  animate?: boolean;
}

export const TrackingStep = ({ icon: I, bg, title, location, glowColor, animate = true }: TrackingStepProps) => (
  <HStack gap={4} align="start">
    <Circle 
      size="10" 
      bg={bg} 
      color="white" 
      zIndex={1}
      animation={animate ? `${glowPulse} 3s infinite ease-in-out` : undefined}
      _hover={{ transform: "scale(1.1)", shadow: animate ? `0 0 20px ${glowColor}` : "none" }}
      transition="all 0.2s"
    >
      <Icon as={I} size="sm" /> 
    </Circle>
    <VStack align="start" gap={0}>
      <Text fontWeight="bold" fontSize="sm" lineHeight="shorter">{title}</Text>
      <Text color="fg.muted" fontSize="xs">{location || "Not specified"}</Text>
    </VStack>
  </HStack>
);

interface MetricBoxProps {
  icon: LucideIcon;
  color: string;
  label: string;
  children: React.ReactNode;
  bg?: string;
}

export const MetricBox = ({ icon: I, color, label, children, bg }: MetricBoxProps) => (
  <Box 
    p={4} 
    borderRadius="xl" 
    borderWidth="1px" 
    bg={bg || "bg.panel"} 
    borderColor="border.subtle"
    role="group"
    transition="all 0.2s cubic-bezier(.4,0,.2,1)"
    _hover={{ 
      borderColor: color, 
      shadow: `0 0 15px ${color.includes("blue") ? "rgba(66, 153, 225, 0.2)" : "rgba(237, 137, 54, 0.1)"}`,
      transform: "translateY(-2px)" 
    }}
  >
    <HStack mb={2} color={color}>
      <Box transition="transform 0.3s" _groupHover={{ transform: "rotate(15deg) scale(1.1)" }}>
        <Icon as={I} size="sm" />
      </Box>
      <Text fontSize="2xs" fontWeight="black" textTransform="uppercase" letterSpacing="widest">{label}</Text>
    </HStack>
    {children}
  </Box>
);
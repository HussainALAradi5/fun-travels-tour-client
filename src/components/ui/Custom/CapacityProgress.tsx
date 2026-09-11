import { barGlow } from "@/utilities/Animations";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { useMemo } from "react";
import type { CapacityProgressProps } from "@/interface/props/ui/CapacityProgressProps";

/**
 * High-fidelity, generic capacity progress bar.
 * Designed to be minimal by default to match inventory tables.
 */
export const CapacityProgress = ({ 
  value, 
  total, 
  unit, 
  showPercentage = false,
  showStatusText = false,
  colorOverride,
  align = "start",
  gap = 1,
  ...props 
}: CapacityProgressProps) => {
  const percentage = useMemo(() => {
    if (!total || total === 0) return 0;
    return Math.min((value / total) * 100, 100);
  }, [value, total]);

  const statusColor = useMemo(() => {
    if (colorOverride) return colorOverride;
    if (percentage <= 20) return "red.500";
    if (percentage <= 50) return "orange.400";
    return "blue.500"; // Matches your original screenshot blue
  }, [percentage, colorOverride]);

  const statusLabel = useMemo(() => {
    if (percentage <= 20) return "CRITICAL";
    if (percentage <= 50) return "LOW";
    return "HEALTHY";
  }, [percentage]);

  return (
    <VStack align={align} gap={gap} minW="140px" {...props}>
      {/* Value Row */}
      <HStack justify="space-between" w="full" align="baseline">
        <HStack gap={1}>
          <Text fontSize="xs" fontWeight="bold" color="black">
            {value} / {total}
          </Text>
          {unit && (
            <Text fontSize="10px" fontWeight="bold" color="fg.muted">
              {unit}
            </Text>
          )}
        </HStack>
        
        {showPercentage && (
          <Text fontSize="10px" fontWeight="black" color="fg.subtle">
            {Math.round(percentage)}%
          </Text>
        )}
      </HStack>

      {/* Progress Track */}
      <Box 
        w="full" 
        h="1.5" 
        bg="gray.100" 
        borderRadius="full" 
        position="relative" 
        overflow="hidden"
      >
        <Box
          h="full"
          w={`${percentage}%`}
          bg={statusColor}
          color={statusColor} // Sets currentColor for the animation
          borderRadius="full"
          transition="width 1s cubic-bezier(0.4, 0, 0.2, 1)"
          position="relative"
          animation={`${barGlow} 3s infinite ease-in-out`}
          _hover={{ 
            filter: "brightness(1.2)", 
            boxShadow: `0 0 15px var(--chakra-colors-${statusColor.replace('.', '-')})`,
            cursor: "pointer"
          }}
        >
          {/* Subtle Inner Shimmer */}
          <Box
            position="absolute"
            inset="0"
            bgGradient="linear(to-r, transparent, whiteAlpha.300, transparent)"
            animation="shimmer 2s infinite"
          />
        </Box>
      </Box>

      {/* Optional Status Label */}
      {showStatusText && (
        <Text 
          fontSize="9px" 
          fontWeight="black" 
          letterSpacing="widest"
          color={statusColor}
        >
          {statusLabel}
        </Text>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </VStack>
  );
};
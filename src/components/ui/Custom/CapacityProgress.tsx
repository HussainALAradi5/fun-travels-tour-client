import { barGlow } from "@/utilities/Animations";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { useMemo } from "react";
import type { CapacityProgressProps } from "@/interface/props/ui/CapacityProgressProps";
import { ProgressVariant } from "@/enums/ProgressVariant";
import { ProgressType } from "@/enums/ProgressType";
export const CapacityProgress = ({
  value,
  total,
  unit,
  showPercentage = false,
  showStatusText = false,
  colorOverride,
  align = "start",
  gap = "1",
  variant = ProgressVariant.SUBTLE,
  type = ProgressType.AUTO,
  ...props
}: CapacityProgressProps) => {
  const percentage = useMemo(() => {
    if (!total || total === 0) return 0;
    return Math.min((value / total) * 100, 100);
  }, [value, total]);

  const resolvedType = useMemo(() => {
    if (type !== ProgressType.AUTO) return type;
    if (percentage <= 20) return ProgressType.DANGER;
    if (percentage <= 50) return ProgressType.WARNING;
    return ProgressType.SUCCESS;
  }, [percentage, type]);

  const statusColor = useMemo(() => {
    if (colorOverride) return colorOverride;
    if (resolvedType === ProgressType.DANGER) return "red.500";
    if (resolvedType === ProgressType.WARNING) return "orange.400";
    if (resolvedType === ProgressType.SUCCESS) return "green.500";
    if (resolvedType === ProgressType.INFO) return "blue.500";
    return "gray.500";
  }, [colorOverride, resolvedType]);

  const statusLabel = useMemo(() => {
    if (resolvedType === ProgressType.DANGER) return "DANGER";
    if (resolvedType === ProgressType.WARNING) return "WARNING";
    if (resolvedType === ProgressType.SUCCESS) return "SUCCESS";
    if (resolvedType === ProgressType.INFO) return "INFO";
    return "NEUTRAL";
  }, [resolvedType]);

  const statusCssColor = `var(--chakra-colors-${statusColor.replace('.', '-')})`;

  return (
    <VStack align={align} gap={gap} minW="140px" {...props}>
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
<Box
        w="full"
        h={variant === ProgressVariant.MINIMAL ? "1" : variant === ProgressVariant.SOLID ? "3" : "2"}
        bg="gray.100"
        borderRadius="full"
        position="relative"
        overflow="hidden"
      >
        <Box
          h="full"
          w={`${percentage}%`}
          bg={variant === ProgressVariant.GRADIENT ? `linear-gradient(90deg, var(--chakra-colors-blue-400), ${statusCssColor})` : variant === ProgressVariant.STRIPED ? `repeating-linear-gradient(135deg, ${statusCssColor}, ${statusCssColor} 8px, transparent 8px, transparent 14px)` : statusColor}
          color={statusColor}
          borderRadius="full"
          transition="width 1s cubic-bezier(0.4, 0, 0.2, 1)"
          position="relative"
          animation={variant === ProgressVariant.MINIMAL ? undefined : `${barGlow} 3s infinite ease-in-out`}
          _hover={{
            filter: "brightness(1.2)",
            boxShadow: `0 0 15px var(--chakra-colors-${statusColor.replace('.', '-')})`,
            cursor: "pointer"
          }}
        >
<Box
            position="absolute"
            inset="0"
            bgGradient="linear(to-r, transparent, whiteAlpha.300, transparent)"
            animation="shimmer 2s infinite"
          />
        </Box>
      </Box>
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

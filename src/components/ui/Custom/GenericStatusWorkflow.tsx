import { Box, Flex, Text, Badge, Icon, Float, VStack, Spinner } from "@chakra-ui/react";
import { Check } from "lucide-react";
import { glowPulse, floatIn } from "@/utilities/Animations";
import { useState } from "react";
import type { GenericStatusWorkflowProps } from "@/interface/props/ui/GenericStatusWorkflowProps";

export type { StatusConfig } from "@/interface/common/StatusConfig";

export const GenericStatusWorkflow = <T extends string>({ 
  currentStatus, 
  statusMap, 
  steps,
  onStatusChange,
  isReadOnly = false
}: GenericStatusWorkflowProps<T>) => {
  const [loadingStatus, setLoadingStatus] = useState<T | null>(null);
  const currentIndex = steps.indexOf(currentStatus);

  const handleStepClick = async (step: T) => {
    // Prevent clicking if read-only, already loading, or clicking the current status
    if (isReadOnly || !onStatusChange || step === currentStatus || loadingStatus) return;
    
    setLoadingStatus(step);
    try {
      await onStatusChange(step);
    } finally {
      setLoadingStatus(null);
    }
  };

  return (
    <Box w="full" py={6} animation={`${floatIn} 0.5s ease-out`}>
      <Flex align="center" justify="space-between" position="relative" gap={2}>
        {steps.map((stepKey, index) => {
          const config = statusMap[stepKey];
          if (!config) return null;

          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;
          const isLoading = loadingStatus === stepKey;

          return (
            <Flex key={stepKey} direction="column" align="center" flex={1} position="relative">
              {/* Line Connector */}
              {index !== 0 && (
                <Box
                  position="absolute"
                  top="20px"
                  left="-50%"
                  right="50%"
                  h="2px"
                  transition="all 0.5s"
                  bg={isPending ? "border.subtle" : `${statusMap[steps[index-1]]?.colorPalette}.500`}
                  zIndex={0}
                />
              )}

              <VStack 
                zIndex={1} 
                cursor={!isReadOnly && !isCurrent ? "pointer" : "default"}
                onClick={() => handleStepClick(stepKey)}
                gap={3}
                transition="transform 0.2s"
                _hover={!isReadOnly && !isCurrent ? { transform: "translateY(-2px)" } : {}}
              >
                <Box position="relative">
                  <Flex
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    align="center"
                    justify="center"
                    bg={isPending ? "bg.muted" : `${config.colorPalette}.500`}
                    color={isPending ? "fg.muted" : "white"}
                    borderWidth="2px"
                    borderColor={isPending ? "border.emphasized" : "transparent"}
                    transition="all 0.3s"
                    boxShadow={isCurrent ? `0 0 20px var(--chakra-colors-${config.colorPalette}-500)` : "none"}
                    animation={isCurrent ? `${glowPulse} 2s infinite` : "none"}
                  >
                    {isLoading ? (
                      <Spinner size="xs" />
                    ) : (
                      <Icon as={isCompleted ? Check : config.icon} size="sm" />
                    )}
                  </Flex>

                  {isCurrent && (
                    <Float placement="top-end" offset="1">
                      <Box w="2" h="2" bg="white" borderRadius="full" />
                    </Float>
                  )}
                </Box>

                <VStack gap={0} textAlign="center">
                  <Text fontWeight="bold" fontSize="2xs" letterSpacing="wider" color={isPending ? "fg.muted" : "fg"}>
                    {config.label.toUpperCase()}
                  </Text>
                  {isCurrent && (
                    <Badge colorPalette={config.colorPalette} variant="solid" size="xs" borderRadius="full">
                      Current
                    </Badge>
                  )}
                </VStack>
              </VStack>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};
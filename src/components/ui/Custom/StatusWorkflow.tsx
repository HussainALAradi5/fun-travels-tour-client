import { Box, Flex, Text, Badge, Icon, VStack, Spinner } from "@chakra-ui/react";
import { Check } from "lucide-react";
import { glowPulse, floatIn, workflowStepComplete } from "@/utilities/Animations";
import { useState } from "react";
import type { StatusWorkflowProps } from "@/interface/props/ui/StatusWorkflowProps";


export const StatusWorkflow = <T extends string>({
  currentStatus,
  statusMap,
  steps,
  onStatusChange,
  isReadOnly = false
}: StatusWorkflowProps<T>) => {
  const [loadingStatus, setLoadingStatus] = useState<T | null>(null);
  const currentIndex = steps.indexOf(currentStatus);

  const handleStepClick = async (step: T) => {
    if (isReadOnly || !onStatusChange || step === currentStatus || loadingStatus) return;

    setLoadingStatus(step);
    try {
      await onStatusChange(step);
    } finally {
      setLoadingStatus(null);
    }
  };

  return (
    <Box w="full" py={6} overflowX="auto" animation={`${floatIn} 0.5s ease-out`}>
      <Flex align="flex-start" justify="space-between" position="relative" gap={2} minW={steps.length > 4 ? `${steps.length * 150}px` : "520px"} px={2}>
        {steps.map((stepKey, index) => {
          const config = statusMap[stepKey];
          if (!config) return null;

          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;
          const isLoading = loadingStatus === stepKey;

          return (
            <Flex key={stepKey} direction="column" align="center" flex={1} position="relative">
{index !== 0 && (
                <Box
                  position="absolute"
                  top="21px"
                  left="-50%"
                  right="50%"
                  h="3px"
                  transition="background-color 0.45s ease, transform 0.45s ease"
                  bg={isPending ? "border.subtle" : `${config.colorPalette}.500`}
                  zIndex={0}
                />
              )}

              <VStack
                zIndex={1}
                cursor={!isReadOnly && !isCurrent ? "pointer" : "default"}
                onClick={() => handleStepClick(stepKey)}
                gap={2.5}
                transition="transform 0.2s"
                _hover={!isReadOnly && !isCurrent ? { transform: "translateY(-2px)" } : {}}
              >
                <Box position="relative">
                  <Flex
                    w="44px"
                    h="44px"
                    borderRadius="full"
                    align="center"
                    justify="center"
                    bg={isPending ? "bg.muted" : isCompleted ? "green.500" : `${config.colorPalette}.500`}
                    color={isPending ? "fg.muted" : "white"}
                    borderWidth={isCurrent ? "3px" : "2px"}
                    borderColor={isCurrent ? "white" : isPending ? "border.emphasized" : "transparent"}
                    transition="all 0.3s"
                    boxShadow={isCurrent ? `0 0 20px var(--chakra-colors-${config.colorPalette}-500)` : "none"}
                    animation={isCurrent ? `${glowPulse} 2s infinite` : isCompleted ? `${workflowStepComplete} 300ms ease-out` : "none"}
                  >
                    {isLoading ? (
                      <Spinner size="xs" />
                    ) : (
                      <Icon as={isCompleted ? Check : config.icon} size="sm" />
                    )}
                  </Flex>

                </Box>

                <VStack gap={1} textAlign="center">
                  <Text fontWeight="bold" fontSize="xs" letterSpacing="wide" color={isPending ? "fg.muted" : "fg"}>
                    {config.label.toUpperCase()}
                  </Text>
                  {isCurrent && (
                    <Badge colorPalette={config.colorPalette} variant="subtle" size="sm" borderRadius="full" px={2}>
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

"use client";

import { useState } from "react";
import { Badge, Box, Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { AppDialog } from "./AppDialog";
import type { GuidedStepsDialogProps } from "@/interface/props/ui/GuidedStepsDialogProps";

export function GuidedStepsDialog({
  title,
  description,
  triggerLabel = "View guide",
  triggerIcon: TriggerIcon = BookOpen,
  steps,
  colorPalette = "blue",
  finalMessage,
  buttonVariant = "outline",
}: GuidedStepsDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant={buttonVariant} colorPalette={colorPalette} onClick={() => setOpen(true)}>
        <TriggerIcon size={16} /> {triggerLabel}
      </Button>

      <AppDialog
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        icon={TriggerIcon}
        colorPalette={colorPalette}
        size="lg"
      >
        <VStack align="stretch" gap={4}>
          {steps.map((step, index) => {
            const StepIcon = step.icon ?? CheckCircle2;
            return (
              <HStack
                key={step.id}
                align="start"
                gap={4}
                p={4}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="border.subtle"
                bg="bg.subtle"
                _dark={{ bg: "whiteAlpha.50", borderColor: "whiteAlpha.200" }}
              >
                <Box
                  display="grid"
                  placeItems="center"
                  boxSize="10"
                  flexShrink={0}
                  borderRadius="full"
                  bg={`${colorPalette}.100`}
                  color={`${colorPalette}.700`}
                  _dark={{ bg: `${colorPalette}.900`, color: `${colorPalette}.200` }}
                >
                  <Icon as={StepIcon} boxSize="5" />
                </Box>
                <VStack align="start" gap={1} flex="1">
                  <HStack>
                    <Badge colorPalette={colorPalette} variant="subtle">Step {index + 1}</Badge>
                    <Text fontWeight="bold">{step.title}</Text>
                  </HStack>
                  <Text color="fg.muted" fontSize="sm" lineHeight="tall">{step.description}</Text>
                  {step.note && (
                    <Text color="fg.subtle" fontSize="xs" fontStyle="italic">{step.note}</Text>
                  )}
                </VStack>
              </HStack>
            );
          })}

          {finalMessage && (
            <Box p={4} borderRadius="xl" bg={`${colorPalette}.50`} color={`${colorPalette}.800`}
              _dark={{ bg: `${colorPalette}.950`, color: `${colorPalette}.200` }}>
              <Text fontSize="sm" fontWeight="medium">{finalMessage}</Text>
            </Box>
          )}

          <Button colorPalette={colorPalette} onClick={() => setOpen(false)}>Got it</Button>
        </VStack>
      </AppDialog>
    </>
  );
}

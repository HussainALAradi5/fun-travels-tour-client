import { Box, HStack, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { ShieldCheck } from "lucide-react";
import type { PolicyCardProps } from "@/interfaces/props/booking/PolicyCardProps";

/** The agency's cancellation rules as a simple timeline, so customers know what they get back before paying. */
export const PolicyCard = ({ policy }: PolicyCardProps) => {
  if (!policy) return null;
  const steps = [
    { when: `More than ${policy.fullRefundDays} days before`, back: "Full refund", color: "green" },
    ...(policy.partialRefundPercent > 0
      ? [{ when: `${policy.partialRefundDays}–${policy.fullRefundDays} days before`, back: `${policy.partialRefundPercent}% back`, color: "orange" }]
      : []),
    { when: `Within ${policy.partialRefundPercent > 0 ? policy.partialRefundDays : policy.fullRefundDays + 1} days`, back: "No refund", color: "red" },
  ];
  return (
    <Box p={5} borderRadius="2xl" borderWidth="1px" bg="bg.panel">
      <HStack gap={3} mb={3}><Icon as={ShieldCheck} color="green.500" /><Heading size="sm">Cancellation and refunds</Heading></HStack>
      <Stack gap={2}>
        {steps.map((s) => (
          <HStack key={s.when} justify="space-between" p={2} borderRadius="lg" bg={`${s.color}.subtle`}>
            <Text fontSize="sm">{s.when}</Text>
            <Text fontSize="sm" fontWeight="bold" color={`${s.color}.fg`}>{s.back}</Text>
          </HStack>
        ))}
      </Stack>
      <Text mt={3} fontSize="xs" color="fg.muted">If the agency cancels the tour, you always get a full refund to your wallet.</Text>
    </Box>
  );
};

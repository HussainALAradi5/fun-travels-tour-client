import { Box, Button, Field, HStack, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { PolicyCard } from "@/components/tour-management/booking/PolicyCard";
import { POLICY_FIELDS } from "@/constants/agency/policyFields";
import { useAgencyPolicy } from "@/hooks/agency/useAgencyPolicy";
import type { PolicyTabProps } from "@/interfaces/props/agency/PolicyTabProps";

/** The owner sets the agency's kids discount and cancellation refunds; the preview shows what customers will see. */
export const PolicyTab = ({ agencyId, canEdit }: PolicyTabProps) => {
  const p = useAgencyPolicy(agencyId);
  const preview = p.saved ? { ...p.saved, ...p.draft } : null;
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} p={6}>
      <Stack gap={5}>
        <Text color="fg.muted" fontSize="sm">
          These rules apply to every tour of this agency. Prices and refunds are calculated by the server from them.
        </Text>
        {POLICY_FIELDS.map((f) => (
          <Field.Root key={f.key} invalid={f.key === "partialRefundDays" && Boolean(p.invalid)} disabled={!canEdit}>
            <Field.Label>{f.label}</Field.Label>
            <HStack>
              <Input type="number" min={0} max={f.max} value={p.draft[f.key]} maxW="32"
                onChange={(e) => p.setField(f.key, Math.min(f.max, Number(e.target.value)))} />
              <Text color="fg.muted">{f.unit}</Text>
            </HStack>
            <Field.HelperText>{f.hint}</Field.HelperText>
            {f.key === "partialRefundDays" && p.invalid && <Field.ErrorText>{p.invalid}</Field.ErrorText>}
          </Field.Root>
        ))}
        {canEdit && (
          <Button colorPalette="blue" alignSelf="start" onClick={p.save} loading={p.saving} disabled={!p.changed || Boolean(p.invalid)}>
            Save rules
          </Button>
        )}
        {!canEdit && <Text fontSize="sm" color="fg.muted">Only the agency owner or an administrator can change these rules.</Text>}
      </Stack>
      <Box>
        <Text fontWeight="bold" mb={3}>What customers see</Text>
        <PolicyCard policy={preview} />
        {preview && (preview.kidsDiscountPercent > 0) && (
          <Text mt={3} fontSize="sm" color="teal.600">Kids chairs: {preview.kidsDiscountPercent}% off the fare.</Text>
        )}
      </Box>
    </SimpleGrid>
  );
};

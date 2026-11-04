import { Button, HStack } from "@chakra-ui/react";
import type { FormActionsProps } from "@/interfaces/props/ui/FormActionsProps";
import { glowPulse } from "@/utilities/Animations";

const PRESS = { transform: "scale(0.97)" };
const EASE = "all 0.2s cubic-bezier(.4,0,.2,1)";

export const FormActions = ({ submitLabel, isValid, isProcessing, onCancel }: FormActionsProps) => (
  <HStack mt={10} justify={onCancel ? "flex-end" : "center"} gap={4}>
    {onCancel && (
      <Button type="button" variant="solid" colorPalette="red" onClick={onCancel} size="md" px={8} fontWeight="bold" disabled={isProcessing}
        transition={EASE} boxShadow="0 4px 14px 0 rgba(229, 62, 62, 0.25)" _active={PRESS}>
        Cancel
      </Button>
    )}
    <Button type="submit" loading={isProcessing} loadingText="Processing..." variant="solid" colorPalette="blue"
      disabled={!isValid || isProcessing} size="md" px={10} fontWeight="bold"
      animation={isValid && !isProcessing ? `${glowPulse} 2s infinite` : "none"}
      transition={EASE} boxShadow="0 4px 14px 0 rgba(0, 118, 255, 0.25)" _active={PRESS}>
      {submitLabel}
    </Button>
  </HStack>
);

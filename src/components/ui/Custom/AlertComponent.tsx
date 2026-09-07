import { Alert, IconButton, Box } from "@chakra-ui/react";
import { AlertTriangle, Info, CheckCircle, XCircle, X } from "lucide-react";
import type { ReactNode } from "react";

interface AlertComponentProps {
  status: "info" | "warning" | "success" | "error";
  title?: string;
  description: string;
  icon?: ReactNode;
  isClosable?: boolean;
  onClose?: () => void;
  actions?: ReactNode; // For adding buttons like "Undo" or "Retry"
}

const defaultIcons = {
  info: <Info size={18} />,
  warning: <AlertTriangle size={18} />,
  success: <CheckCircle size={18} />,
  error: <XCircle size={18} />,
};

export function AlertComponent({
  status,
  title,
  description,
  icon,
  isClosable,
  onClose,
  actions,
}: AlertComponentProps) {
  return (
    <Alert.Root status={status} variant="subtle" borderRadius="lg" borderStartWidth="4px">
      <Alert.Indicator>{icon || defaultIcons[status]}</Alert.Indicator>
      <Alert.Content>
        {title && <Alert.Title fontWeight="bold">{title}</Alert.Title>}
        <Alert.Description fontSize="sm" lineHeight="tall">
          {description}
        </Alert.Description>
        {actions && <Box mt={2}>{actions}</Box>}
      </Alert.Content>
      {isClosable && (
        <IconButton
          variant="ghost"
          size="xs"
          onClick={onClose}
          position="absolute"
          top={2}
          right={2}
        >
          <X size={14} />
        </IconButton>
      )}
    </Alert.Root>
  );
}
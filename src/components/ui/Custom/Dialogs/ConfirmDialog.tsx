import { useState } from "react";
import { Button, DialogFooter, DialogActionTrigger, Text, VStack } from "@chakra-ui/react";
import { AppDialog } from "./AppDialog";
import type { ConfirmDialogProps } from "@/interface/props/ui/ConfirmDialogProps";

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  message,
  icon,
  confirmText = "Confirm",
  cancelText = "Cancel",
  colorPalette = "red",
  placement = "center",
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch {
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      icon={icon}
      colorPalette={colorPalette}
      size="sm"
      placement={placement}
    >
      <VStack align="stretch" gap={6}>
        <Text color="fg.muted">{message}</Text>

        <DialogFooter p={0} pt={4}>
          <DialogActionTrigger asChild>
            <Button variant="ghost" disabled={loading} onClick={onClose}>
              {cancelText}
            </Button>
          </DialogActionTrigger>
          <Button
            colorPalette={colorPalette}
            loading={loading}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </VStack>
    </AppDialog>
  );
}

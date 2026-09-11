import { useState } from "react";
import { Button, DialogFooter, DialogActionTrigger, Text, VStack } from "@chakra-ui/react";
import { GenericDialog } from "./GenericDialog";
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
      onClose(); // Only close the dialog if the promise actually succeeds
    } catch {
      // Do nothing here! 
      // Your useTourManagement hook is already catching this and firing the exact backend error toast.
      // We just catch it here so the dialog stays open, allowing the user to see the error.
    } finally {
      setLoading(false);
    }
  };

  return (
    <GenericDialog
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
    </GenericDialog>
  );
}


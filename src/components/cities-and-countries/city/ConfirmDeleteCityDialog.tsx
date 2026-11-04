import { Button, Dialog, HStack, Portal, Text } from "@chakra-ui/react";
import { AlertTriangle } from "lucide-react";
import type { ConfirmDeleteCityDialogProps } from "@/interfaces/props/geography/ConfirmDeleteCityDialogProps";

export const ConfirmDeleteCityDialog = ({ city, countryName, onCancel, onConfirm }: ConfirmDeleteCityDialogProps) => (
  <Dialog.Root open={Boolean(city)} onOpenChange={(e) => !e.open && onCancel()} role="alertdialog">
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <HStack color="red.500"><AlertTriangle size={20} /><Dialog.Title>Confirm Delete</Dialog.Title></HStack>
          </Dialog.Header>
          <Dialog.Body>
            <Text>Delete <b>{city?.name}</b> from {countryName}? Tours, agencies, or ports that use this city will block the delete.</Text>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild><Button variant="outline">Cancel</Button></Dialog.ActionTrigger>
            <Button colorPalette="red" onClick={onConfirm}>Delete</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
);

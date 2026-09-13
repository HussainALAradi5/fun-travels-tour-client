import { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Heading,
  Button,
  Input,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
  Portal,
} from "@chakra-ui/react";
import { Globe, RefreshCw } from "lucide-react";
import { AlertComponent } from "@/components/ui/Custom/AlertComponent";
import type { CountrySyncHeaderProps } from "@/interface/props/geography/CountrySyncHeaderProps";

export function CountrySyncHeader({
  onBulkSync,
  onSingleSync,
  isFetching,
}: CountrySyncHeaderProps) {
  const [syncSearchTerm, setSyncSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      p={8}
      bg="bg.panel"
      borderRadius="xl"
      border="1px solid"
      borderColor="border"
      shadow="sm"
    >
      <HStack justifyContent="space-between" flexWrap="wrap" gap={4}>
        <VStack align="start">
          <Heading size="lg">Manage Destinations</Heading>

          <DialogRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
            <DialogTrigger asChild>
              <Button colorPalette="purple" size="sm" loading={isFetching}>
                <Globe size={16} /> Bulk Sync All
              </Button>
            </DialogTrigger>

            <Portal>
              <DialogContent
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex={2500}
              >
                <DialogHeader>
                  <DialogTitle>Confirm Global Sync</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <AlertComponent
                    status="warning"
                    description="This pulls 200+ countries from the external API. This action may take a few moments and will update your local database."
                  />
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <Button
                    colorPalette="purple"
                    onClick={() => {
                      setIsOpen(false);
                      onBulkSync();
                    }}
                  >
                    Yes, Sync Everything
                  </Button>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </Portal>
          </DialogRoot>
        </VStack>

        <HStack gap={3} w={{ base: "full", md: "400px" }}>
          <Input
            placeholder="Single sync..."
            value={syncSearchTerm}
            onChange={(e) => setSyncSearchTerm(e.target.value)}
          />
          <Button
            colorPalette="blue"
            loading={isFetching}
            onClick={() => {
              onSingleSync(syncSearchTerm);
              setSyncSearchTerm("");
            }}
            disabled={!syncSearchTerm.trim()}
          >
            <RefreshCw size={18} /> Sync
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}

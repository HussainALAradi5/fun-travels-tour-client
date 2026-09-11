import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogBackdrop,
  DialogPositioner,
  Portal,
  HStack,
  Box,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import type { GenericDialogProps } from "@/interface/props/ui/GenericDialogProps";

export function GenericDialog({
  open,
  onClose,
  title,
  description,
  icon: DialogIcon,
  children,
  colorPalette = "blue",
  size = "md",
  placement = "center",
  scrollBehavior = "inside",
}: GenericDialogProps) {
  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => !e.open && onClose()}
      placement={placement}
      motionPreset="scale"
      size={size}
      scrollBehavior={scrollBehavior}
    >
<Portal>
        <DialogBackdrop />
        <DialogPositioner px={4} py={10}>
          <DialogContent
            borderRadius="xl"
            bg="bg.panel"
            shadow="2xl"
            maxW="650px"
            maxH="85vh"
            display="flex"
            flexDirection="column"
            border="1px solid"
            borderColor="border.subtle"
            overflow="hidden"
          >
            <DialogHeader
              bg={{ base: `${colorPalette}.600`, _dark: `${colorPalette}.700` }}
              p={5}
              color="white"
              flexShrink={0}
            >
              <HStack gap={3} align="center">
                <Box p={2} bg="white/20" borderRadius="lg" backdropFilter="blur(8px)">
                  <Icon as={DialogIcon} size="xl" color="white" />
                </Box>
                <VStack align="start" gap={0}>
                  <DialogTitle fontSize="lg" fontWeight="bold" color="white">
                    {title}
                  </DialogTitle>
                  {description && (
                    <Text fontSize="xs" opacity={0.8} fontWeight="medium" color="white">
                      {description}
                    </Text>
                  )}
                </VStack>
              </HStack>
            </DialogHeader>

            <DialogBody
              p={6}
              overflowY="auto"
              scrollbarWidth="thin"
              css={{
                "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-thumb": {
                  background: "var(--chakra-colors-border-emphasized)",
                  borderRadius: "10px"
                }
              }}
            >
              {children}
            </DialogBody>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
}

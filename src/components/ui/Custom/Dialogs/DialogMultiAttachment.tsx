import { useState } from "react";
import { VStack, HStack, Text, Box, Separator, Icon } from "@chakra-ui/react";
import { UploadCloud, Info } from "lucide-react";
import { AppDialog } from "./AppDialog";
import MultiAttachmentUpload from "../MultiAttachmentUpload";
import { ExportDialog } from "./ExportDialog";
import type { DialogMultiAttachmentProps } from "@/interface/props/ui/DialogMultiAttachmentProps";

export function DialogMultiAttachment({
  open,
  onClose,
  onUpload,
  onSuccess,
  title,
  description,
  templateData,
  templateFileName,
  instructions,
  colorPalette = "purple",
}: DialogMultiAttachmentProps) {
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  const handleUploadComplete = () => {
    onSuccess?.();
    onClose();
  };

  return (
    <>
      <AppDialog
        open={open}
        onClose={onClose}
        title={title}
        description={description}
        icon={UploadCloud}
        colorPalette={colorPalette}
        size="lg"
      >
        <VStack gap={6} align="stretch">
<Box
            p={4}
            bg="bg.muted"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="border.subtle"
          >
            <HStack gap={3} align="flex-start">
              <Icon color={`${colorPalette}.500`} mt={1}>
                <Info size={16} />
              </Icon>
              <VStack align="start" gap={1}>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Import Instructions
                </Text>
                <Text fontSize="sm" color="fg.muted">
                  {instructions}
                </Text>
              </VStack>
            </HStack>
          </Box>

          <Separator />
<Box p={2} borderRadius="2xl" className="modern-upload-container">
            <MultiAttachmentUpload
              onUpload={onUpload}
              onSuccess={handleUploadComplete}
            />
          </Box>
        </VStack>
      </AppDialog>

      <ExportDialog
        open={isTemplateOpen}
        onClose={() => setIsTemplateOpen(false)}
        data={templateData}
        fileName={templateFileName}
      />
    </>
  );
}

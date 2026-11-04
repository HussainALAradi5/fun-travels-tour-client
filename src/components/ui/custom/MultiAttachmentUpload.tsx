import { Box, Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { FiInfo, FiUploadCloud } from "react-icons/fi";
import { DEFAULT_UPLOAD_INSTRUCTIONS, EXCEL_ACCEPT, EXCEL_TYPES_LABEL } from "@/constants/ui/upload";
import { useFileQueue } from "@/hooks/ui/useFileQueue";
import type { MultiAttachmentUploadProps } from "@/interfaces/props/ui/MultiAttachmentUploadProps";
import { floatIn, glowPulse } from "@/utilities/Animations";
import { PendingFileList } from "./upload/PendingFileList";

const MultiAttachmentUpload = ({
  onUpload, onSuccess, allowedTypesLabel = EXCEL_TYPES_LABEL, instructions = DEFAULT_UPLOAD_INSTRUCTIONS, accept = EXCEL_ACCEPT,
}: MultiAttachmentUploadProps) => {
  const queue = useFileQueue(onUpload, onSuccess);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: queue.add, accept });
  return (
    <VStack w="full" gap={5} align="stretch" animation={`${floatIn} 0.5s ease-out`}>
      <Box {...getRootProps()} position="relative" p={10} borderRadius="2xl" border="2px dashed"
        borderColor={isDragActive ? "blue.500" : "border.subtle"} bg={isDragActive ? "blue.50/50" : "bg.panel"}
        _dark={{ bg: isDragActive ? "blue.950/30" : "whiteAlpha.50" }} transition="all 0.3s cubic-bezier(.4,0,.2,1)" cursor="pointer"
        animation={isDragActive ? `${glowPulse} 2s infinite` : undefined} _hover={{ borderColor: "blue.400", shadow: "xl", transform: "scale(1.01)" }}>
        <input {...getInputProps()} />
        <VStack gap={4}>
          <Center w={16} h={16} bg="blue.50" _dark={{ bg: "blue.900/40" }} color="blue.500" borderRadius="full" shadow="inner">
            <Icon as={FiUploadCloud} boxSize={8} />
          </Center>
          <VStack gap={1}>
            <Text fontWeight="bold" fontSize="lg" letterSpacing="tight">Click or drag to upload</Text>
            <Text color="fg.muted" fontSize="sm">Supports {allowedTypesLabel}</Text>
          </VStack>
        </VStack>
      </Box>
      {queue.files.length > 0 && (
        <PendingFileList files={queue.files} isUploading={queue.isUploading} onRemove={queue.remove} onUpload={queue.uploadAll} />
      )}
      <HStack color="fg.muted" gap={3} px={4} py={2} bg="bg.muted/30" borderRadius="lg" borderWidth="1px">
        <Icon as={FiInfo} boxSize={3.5} />
        <Text fontSize="xs" fontWeight="medium">{instructions}</Text>
      </HStack>
    </VStack>
  );
};

export default MultiAttachmentUpload;

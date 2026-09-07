import { useCallback, useState } from "react";
import {
  Box,
  VStack,
  Text,
  Icon,
  HStack,
  IconButton,
  Button,
  Center,
  Badge,
  Separator,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiFile, FiX, FiCheck, FiInfo } from "react-icons/fi";
import { toaster } from "@/components/ui/toaster";
import { floatIn, glowPulse } from "@/utilities/Animations";

interface Props {
  onUpload: (file: File) => Promise<any>;
  onSuccess?: (data: any) => void;
  allowedTypesLabel?: string;
  instructions?: string;
  accept?: Record<string, string[]>;
}

const MultiAttachmentUpload = ({
  onUpload,
  onSuccess,
  allowedTypesLabel = "Excel (.xlsx, .xls)",
  instructions = "Ensure your file matches the template structure.",
  accept = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    "application/vnd.ms-excel": [".xls"],
  },
}: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept });

  const handleStartUpload = async () => {
    if (!files.length) return;
    setIsUploading(true);
    try {
      const results = await Promise.all(files.map((file) => onUpload(file)));
      results.forEach((res) => onSuccess?.(res));

      toaster.create({
        title: "Import Successful",
        description: `Successfully processed ${files.length} file(s).`,
        type: "success",
      });
      setFiles([]);
    } catch (error: any) {
      toaster.create({
        title: "Upload Failed",
        description: error.message || "An error occurred",
        type: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <VStack w="full" gap={5} align="stretch" animation={`${floatIn} 0.5s ease-out`}>
      {/* --- DROPZONE AREA --- */}
      <Box
        {...getRootProps()}
        position="relative"
        p={10}
        borderRadius="2xl"
        border="2px dashed"
        borderColor={isDragActive ? "blue.500" : "border.subtle"}
        bg={isDragActive ? "blue.50/50" : "bg.panel"}
        _dark={{ bg: isDragActive ? "blue.950/30" : "whiteAlpha.50" }}
        transition="all 0.3s cubic-bezier(.4,0,.2,1)"
        cursor="pointer"
        animation={isDragActive ? `${glowPulse} 2s infinite` : undefined}
        _hover={{ borderColor: "blue.400", shadow: "xl", transform: "scale(1.01)" }}
      >
        <input {...getInputProps()} />
        <VStack gap={4}>
          <Center
            w={16}
            h={16}
            bg="blue.50"
            _dark={{ bg: "blue.900/40" }}
            color="blue.500"
            borderRadius="full"
            shadow="inner"
          >
            <Icon as={FiUploadCloud} boxSize={8} />
          </Center>
          <VStack gap={1}>
            <Text fontWeight="bold" fontSize="lg" letterSpacing="tight">
              Click or drag to upload
            </Text>
            <Text color="fg.muted" fontSize="sm">
              Supports {allowedTypesLabel}
            </Text>
          </VStack>
        </VStack>
      </Box>

      {/* --- PENDING FILES LIST --- */}
      {files.length > 0 && (
        <VStack
          align="stretch"
          gap={0}
          borderWidth="1px"
          borderColor="border.subtle"
          borderRadius="xl"
          bg="bg.panel"
          overflow="hidden"
          shadow="sm"
        >
          <HStack justify="space-between" p={4} bg="bg.muted/30">
            <HStack gap={3}>
              <Text fontSize="xs" fontWeight="bold" color="fg.muted" letterSpacing="widest">
                PENDING FILES
              </Text>
              <Badge variant="subtle" colorPalette="blue" size="sm" borderRadius="full">
                {files.length}
              </Badge>
            </HStack>
            <Badge variant="outline" colorPalette={isUploading ? "orange" : "green"} size="sm">
              {isUploading ? "Uploading..." : "Ready"}
            </Badge>
          </HStack>

          <Separator />

          <VStack align="stretch" gap={0} p={2}>
            {files.map((file, index) => (
              <Box key={file.name}>
                <HStack
                  p={3}
                  borderRadius="lg"
                  justify="space-between"
                  _hover={{ bg: "bg.muted/50" }}
                  transition="background 0.2s"
                >
                  <HStack gap={3}>
                    <Icon as={FiFile} color="blue.400" />
                    <VStack align="start" gap={0}>
                      <Text fontSize="sm" fontWeight="medium" lineClamp={1}>
                        {file.name}
                      </Text>
                      <Text fontSize="xs" color="fg.subtle">
                        {(file.size / 1024).toFixed(1)} KB
                      </Text>
                    </VStack>
                  </HStack>
                  <IconButton
                    aria-label="Remove file"
                    variant="ghost"
                    colorPalette="red"
                    size="xs"
                    disabled={isUploading}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFiles((prev) => prev.filter((f) => f.name !== file.name));
                    }}
                  >
                    <FiX />
                  </IconButton>
                </HStack>
                {index < files.length - 1 && <Separator opacity="0.5" />}
              </Box>
            ))}
          </VStack>

          <Separator />

          <Box p={4} bg="bg.muted/20">
            <Button
              w="full"
              size="md"
              colorPalette="blue"
              loading={isUploading}
              loadingText="Processing..."
              onClick={handleStartUpload}
              shadow="md"
            >
              <FiCheck /> Confirm & Import
            </Button>
          </Box>
        </VStack>
      )}

      {/* --- DYNAMIC INSTRUCTIONS --- */}
      <HStack color="fg.muted" gap={3} px={4} py={2} bg="bg.muted/30" borderRadius="lg" borderWidth="1px">
        <Icon as={FiInfo} boxSize={3.5} />
        <Text fontSize="xs" fontWeight="medium">
          {instructions}
        </Text>
      </HStack>
    </VStack>
  );
};

export default MultiAttachmentUpload;
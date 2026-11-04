import { Badge, Box, Button, HStack, Icon, IconButton, Separator, Text, VStack } from "@chakra-ui/react";
import { FiCheck, FiFile, FiX } from "react-icons/fi";
import { BYTES_PER_KB } from "@/constants/ui/upload";
import type { PendingFileListProps } from "@/interfaces/props/ui/PendingFileListProps";
import { fileKey } from "@/utilities/fileKey";

export const PendingFileList = ({ files, isUploading, onRemove, onUpload }: PendingFileListProps) => (
  <VStack align="stretch" gap={0} borderWidth="1px" borderColor="border.subtle" borderRadius="xl" bg="bg.panel" overflow="hidden" shadow="sm">
    <HStack justify="space-between" p={4} bg="bg.muted/30">
      <HStack gap={3}>
        <Text fontSize="xs" fontWeight="bold" color="fg.muted" letterSpacing="widest">PENDING FILES</Text>
        <Badge variant="subtle" colorPalette="blue" size="sm" borderRadius="full">{files.length}</Badge>
      </HStack>
      <Badge variant="outline" colorPalette={isUploading ? "orange" : "green"} size="sm">{isUploading ? "Uploading..." : "Ready"}</Badge>
    </HStack>
    <Separator />
    <VStack align="stretch" gap={0} p={2}>
      {files.map((file, index) => (
        <Box key={fileKey(file)}>
          <HStack p={3} borderRadius="lg" justify="space-between" _hover={{ bg: "bg.muted/50" }} transition="background 0.2s">
            <HStack gap={3}>
              <Icon as={FiFile} color="blue.400" />
              <VStack align="start" gap={0}>
                <Text fontSize="sm" fontWeight="medium" lineClamp={1}>{file.name}</Text>
                <Text fontSize="xs" color="fg.subtle">{(file.size / BYTES_PER_KB).toFixed(1)} KB</Text>
              </VStack>
            </HStack>
            <IconButton aria-label={`Remove ${file.name}`} variant="ghost" colorPalette="red" size="xs" disabled={isUploading}
              onClick={(e) => { e.stopPropagation(); onRemove(file); }}>
              <FiX />
            </IconButton>
          </HStack>
          {index < files.length - 1 && <Separator opacity="0.5" />}
        </Box>
      ))}
    </VStack>
    <Separator />
    <Box p={4} bg="bg.muted/20">
      <Button w="full" size="md" colorPalette="blue" loading={isUploading} loadingText="Processing..." onClick={onUpload} shadow="md">
        <FiCheck /> Confirm & Import
      </Button>
    </Box>
  </VStack>
);

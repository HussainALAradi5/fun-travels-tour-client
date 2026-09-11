import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Heading,
  useDisclosure,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FileUp, ChevronUp, ChevronDown, Download } from "lucide-react";
import MultiAttachmentUpload from "../ui/Custom/MultiAttachmentUpload";
import { userService } from "@/Api/User";
import { CollapsibleContainer } from "../ui/Custom/CollapsibleContainer";
import { GenericExportDialog } from "../ui/Custom/Dialogs/GenericExportDialog";
import type { AddEmployeesActionProps } from "@/interface/props/agency/AddEmployeesActionProps";

export const AddEmployeesAction = ({
  agencyId,
  onRefresh,
}: AddEmployeesActionProps) => {
  const { open, onToggle } = useDisclosure();
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const templateData = useMemo(() => [{
    Name: "",
    Username: "",
    Email: "",
    Password: "",
    Age: "",
    Mobile: "",
    Role: "",
    Branch: "",
  }], []);
  const columnInstructions = useMemo(
    () => `Required Columns: ${Object.keys(templateData[0]).join(", ")}.`,
    [templateData],
  );

  const handleBulkUpload = async (file: File) => {
    return await userService.bulkImport(agencyId, file);
  };

  return (
    <Box w="full">
      <Button
        variant="ghost"
        size="sm"
        colorPalette="purple"
        onClick={onToggle}
        transition="all 0.2s"
        _hover={{ transform: "translateY(-1px)", shadow: "sm" }}
      >
        <HStack gap={2}>
          <FileUp size={14} />
          <Text fontWeight="medium">
            {open ? "Hide Bulk Import" : "Bulk Import"}
          </Text>
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </HStack>
      </Button>

      <CollapsibleContainer isOpen={open} mt={4}>
        <Box
          p={6}
          borderWidth="1px"
          borderRadius="2xl"
          bg="bg.panel"
          shadow="sm"
          borderColor="border.subtle"
        >
          <VStack align="stretch" gap={6}>
            <HStack justify="space-between" align="center">
              <VStack align="start" gap={0.5}>
                <Heading
                  size="xs"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  color="fg.muted"
                >
                  Batch Registration
                </Heading>
                <Text fontSize="sm" color="fg.subtle">
                  Upload your employee spreadsheet to sync data.
                </Text>
              </VStack>

              <Button
                size="xs"
                variant="ghost"
                colorPalette="blue"
                onClick={() => setIsTemplateDialogOpen(true)}
              >
                <Download size={12} style={{ marginRight: "4px" }} />
                Get Template
              </Button>
            </HStack>
<MultiAttachmentUpload
              onUpload={handleBulkUpload}
              onSuccess={() => onRefresh?.()}
              instructions={columnInstructions}
            />
          </VStack>
        </Box>
      </CollapsibleContainer>
<GenericExportDialog
        open={isTemplateDialogOpen}
        onClose={() => setIsTemplateDialogOpen(false)}
        data={templateData}
        fileName="Employee_Import_Template"
      />
    </Box>
  );
};

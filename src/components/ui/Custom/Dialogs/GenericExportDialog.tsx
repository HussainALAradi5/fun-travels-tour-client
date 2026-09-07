import { Button, Text, VStack, Box, HStack, Separator, Center } from "@chakra-ui/react";
import { Download, FileSpreadsheet, FileText, ChevronRight } from "lucide-react";
import { GenericDialog } from "./GenericDialog";
import { ExportUtils } from "@/utilities/ExportUtility";

interface ExportOptionProps {
  title: string;
  desc: string;
  icon: any;
  scheme: string;
  onSelect: () => void;
}

const ExportOption = ({ title, desc, icon: Icon, scheme, onSelect }: ExportOptionProps) => (
  <Box
    as="button"
    onClick={onSelect}
    width="full"
    p={4}
    borderRadius="xl"
    borderWidth="1px"
    bg="bg.panel"
    transition="all 0.2s"
    _hover={{ bg: "bg.muted", transform: "translateY(-2px)", borderColor: `${scheme}.500` }}
    textAlign="left"
  >
    <HStack gap={4}>
      <Center bg={`${scheme}.100`} _dark={{ bg: `${scheme}.950` }} p={3} borderRadius="lg" color={`${scheme}.600`}>
        <Icon size={24} />
      </Center>
      <Box flex={1}>
        <Text fontWeight="bold" fontSize="sm">{title}</Text>
        <Text fontSize="xs" color="fg.muted">{desc}</Text>
      </Box>
      <ChevronRight size={16} />
    </HStack>
  </Box>
);

// Added optional imageColumns array to configure which fields carry Base64 image data
export function GenericExportDialog<T extends Record<string, any>>({
  open,
  onClose,
  data,
  fileName,
  imageColumns = ["qrCode", "barcode"] // Defaults applied here
}: { 
  open: boolean; 
  onClose: () => void; 
  data: T[]; 
  fileName: string;
  imageColumns?: string[];
}) {
  return (
    <GenericDialog open={open} onClose={onClose} title="Export Data" icon={Download} size="sm">
      <VStack gap={4} align="stretch">
        <Text fontSize="xs" fontWeight="bold" color="fg.muted">PICK A FORMAT</Text>
        
        <ExportOption 
          title="PDF Document"
          desc="Best for viewing and printing"
          icon={FileText}
          scheme="red"
          onSelect={() => { 
            ExportUtils.downloadAsPDF(data, fileName, imageColumns); 
            onClose(); 
          }}
        />

       <ExportOption 
          title="Excel Spreadsheet"
          desc="Professional Auto-Width layout"
          icon={FileSpreadsheet}
          scheme="green"
          onSelect={() => { 
            ExportUtils.downloadAsExcel(data, fileName); 
            onClose(); 
          }}
        />

        <Separator />
        <Button variant="ghost" size="sm" onClick={onClose} width="full">Cancel</Button>
      </VStack>
    </GenericDialog>
  );
}
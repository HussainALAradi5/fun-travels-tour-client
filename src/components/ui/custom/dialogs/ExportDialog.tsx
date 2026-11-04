import { Button, Text, VStack, Box, HStack, Separator, Center } from "@chakra-ui/react";
import { Download, FileSpreadsheet, FileText, ChevronRight } from "lucide-react";
import { AppDialog } from "./AppDialog";
import { DEFAULT_IMAGE_COLUMNS } from "@/constants/export/reportTemplate";
import { downloadExcelReport, downloadImportTemplate } from "@/utilities/export/excelReport";
import { downloadPdfReport } from "@/utilities/export/pdfReport";
import type { ExportDialogProps } from "@/interfaces/props/ui/ExportDialogProps";
import type { ExportRecord } from "@/interfaces/common/ExportRecord";

import type { ExportOptionProps } from "@/interfaces/props/ui/ExportOptionProps";

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
export function ExportDialog<T extends Record<string, unknown>>({
  open, onClose, data, fileName, imageColumns = DEFAULT_IMAGE_COLUMNS, mode = "report", instructions,
}: ExportDialogProps<T>) {
  const records = data as unknown as ExportRecord[];
  const run = (task: () => void | Promise<void>) => { void task(); onClose(); };
  return (
    <AppDialog open={open} onClose={onClose} title={mode === "template" ? "Download Template" : "Export Data"} icon={Download} size="sm">
      <VStack gap={4} align="stretch">
        <Text fontSize="xs" fontWeight="bold" color="fg.muted">{mode === "template" ? "IMPORT TEMPLATE" : "PICK A FORMAT"}</Text>
        {mode === "template" ? (
          <ExportOption title="Excel Import Template" desc="Column names in row 1, plus an Instructions sheet"
            icon={FileSpreadsheet} scheme="green"
            onSelect={() => run(() => downloadImportTemplate(Object.keys(records[0] ?? {}), fileName, instructions))} />
        ) : (
          <>
            <ExportOption title="PDF Report" desc="Branded letterhead, page numbers, ready to print" icon={FileText} scheme="red"
              onSelect={() => run(() => downloadPdfReport(records, fileName, imageColumns))} />
            <ExportOption title="Excel Report" desc="Typed cells, frozen filterable header, print footer" icon={FileSpreadsheet}
              scheme="green" onSelect={() => run(() => downloadExcelReport(records, fileName))} />
          </>
        )}
        <Separator />
        <Button variant="ghost" size="sm" onClick={onClose} width="full">Cancel</Button>
      </VStack>
    </AppDialog>
  );
}

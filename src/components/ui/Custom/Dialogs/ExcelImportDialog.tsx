"use client";

import { useState } from "react";
import { Alert, Button, Code, Input, List, Text, VStack } from "@chakra-ui/react";
import { FileSpreadsheet, Upload } from "lucide-react";
import { AppDialog } from "./AppDialog";
import type { ImportResult } from "@/interface/common/ImportResult";
import type { ExcelImportDialogProps } from "@/interface/props/ui/ExcelImportDialogProps";

export function ExcelImportDialog({
  open,
  title,
  description,
  columns,
  onClose,
  onImport,
  onCompleted,
}: ExcelImportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const importResult = await onImport(file);
      setResult(importResult);
      onCompleted?.();
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : "The spreadsheet could not be imported.");
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setFile(null);
    setResult(null);
    setError(null);
    onClose();
  };

  return (
    <AppDialog open={open} onClose={close} title={title} description={description} icon={FileSpreadsheet} size="lg">
      <VStack align="stretch" gap={4}>
        <Text fontSize="sm">First-row columns:</Text>
        <Code p={3} borderRadius="lg" whiteSpace="normal">{columns.join(", ")}</Code>
        <Input
          type="file"
          accept=".xlsx,.xls"
          p={1.5}
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
        {error && <Alert.Root status="error"><Alert.Indicator /><Alert.Content>{error}</Alert.Content></Alert.Root>}
        {result && (
          <Alert.Root status={result.failedCount ? "warning" : "success"}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{result.importedCount} imported, {result.failedCount} failed</Alert.Title>
              {result.errors.length > 0 && (
                <List.Root mt={2}>{result.errors.map((item) => <List.Item key={item}>{item}</List.Item>)}</List.Root>
              )}
            </Alert.Content>
          </Alert.Root>
        )}
        <Button colorPalette="blue" loading={loading} disabled={!file || loading} onClick={submit}>
          <Upload size={16} /> Import spreadsheet
        </Button>
      </VStack>
    </AppDialog>
  );
}

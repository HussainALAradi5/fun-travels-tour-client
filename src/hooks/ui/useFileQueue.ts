import { useCallback, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { fileKey } from "@/utilities/fileKey";

/** Files waiting to be uploaded, and uploading them all at once. */
export function useFileQueue<R>(onUpload: (file: File) => Promise<R>, onSuccess?: (result: R) => void) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const add = useCallback((accepted: File[]) => {
    setFiles((prev) => [...prev, ...accepted.filter((f) => !prev.some((p) => fileKey(p) === fileKey(f)))]);
  }, []);
  const remove = (file: File) => setFiles((prev) => prev.filter((f) => fileKey(f) !== fileKey(file)));

  const uploadAll = async () => {
    if (!files.length) return;
    setIsUploading(true);
    try {
      const results = await Promise.all(files.map((file) => onUpload(file)));
      results.forEach((res) => onSuccess?.(res));
      toaster.create({ title: "Import Successful", description: `Successfully processed ${files.length} file(s).`, type: "success" });
      setFiles([]);
    } catch (error: unknown) {
      toaster.create({ title: "Upload Failed", description: error instanceof Error ? error.message : "An error occurred", type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  return { files, isUploading, add, remove, uploadAll };
}

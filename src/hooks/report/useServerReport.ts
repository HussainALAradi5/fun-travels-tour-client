import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import type { ReportFormat } from "@/enums/report/ReportFormat";
import type { ReportSpec } from "@/interfaces/common/ReportSpec";
import { mediaService } from "@/services/media/mediaService";
import { reportService } from "@/services/report/reportService";
import { saveBlob } from "@/utilities/export/exportFormat";

/** Asks the server for a report in the chosen format, then downloads the stored file. */
export function useServerReport() {
  const [busy, setBusy] = useState(false);

  const download = async (spec: ReportSpec, format: ReportFormat) => {
    setBusy(true);
    const pending = toaster.create({ title: "Preparing report...", type: "loading" });
    try {
      const media = await reportService.generate({ ...spec, format });
      saveBlob(await mediaService.download(media.id), media.fileName);
      toaster.create({ title: "Report ready", description: `${media.recordCount} records - ${media.fileName}`, type: "success" });
    } catch {
      // The API client already shows the server's message.
    } finally {
      toaster.dismiss(pending);
      setBusy(false);
    }
  };

  return { download, busy };
}

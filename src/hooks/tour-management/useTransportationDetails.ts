import { useCallback, useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import type { TransportationStatus } from "@/enums/tour-management/TransportationStatus";
import type { Transportation } from "@/interfaces/tour/Transportation";
import { transportationService } from "@/services/tour-management/transportationService";

/** Loads one vehicle and changes its unit status. Server errors are toasted by the API client. */
export function useTransportationDetails(id?: string) {
  const [transport, setTransport] = useState<Transportation | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      setTransport(await transportationService.getById(Number(id)));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  const changeStatus = async (status: TransportationStatus) => {
    if (!id) return;
    await transportationService.updateStatus(Number(id), status);
    toaster.create({ title: `Status updated to ${status}`, type: "success" });
    await load();
  };

  return { transport, loading, changeStatus };
}

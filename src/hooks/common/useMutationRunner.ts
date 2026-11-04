import { useCallback, useState } from "react";
import { toaster } from "@/components/ui/toaster";

/** Runs a mutation, tracks pending state, and shows a success toast. Errors are toasted by the API client. */
export function useMutationRunner() {
  const [isMutating, setIsMutating] = useState(false);
  const execute = useCallback(async <R,>(promise: Promise<R>, successTitle?: string, successDesc?: string): Promise<R> => {
    setIsMutating(true);
    try {
      const result = await promise;
      if (successTitle) toaster.create({ title: successTitle, description: successDesc, type: "success" });
      return result;
    } finally {
      setIsMutating(false);
    }
  }, []);
  return { isMutating, execute };
}

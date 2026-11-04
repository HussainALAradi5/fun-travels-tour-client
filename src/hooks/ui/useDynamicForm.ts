import { useCallback, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { toaster } from "@/components/ui/toaster";
import type { DynamicFormProps } from "@/interfaces/props/ui/DynamicFormProps";
import { reflectApiError } from "@/utilities/apiErrorHandler";
import { getValueAtPath, setValueAtPath } from "@/utilities/ObjectPathUtils";

type FieldValue = string | number | string[] | boolean | null;

const isFilled = (value: unknown) =>
  value !== null && value !== undefined && value !== "" && (typeof value !== "object" || Object.keys(value as object).length > 0);

/** Form values by dotted path, required-field validation, and submit with error capture. */
export function useDynamicForm<T extends Record<string, unknown>>({
  fields, initialValues, onSubmit, isLoading, submitLabel = "Submit", onFieldChange, disableToast = false,
}: DynamicFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialValues as T);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isProcessing = Boolean(isLoading || submitting);

  const change = useCallback((name: keyof T, value: FieldValue) => {
    setErrorMessage(null);
    const field = fields.find((f) => f.name === name);
    setFormData((prev) => {
      let next = setValueAtPath(prev, String(name), value);
      field?.clearFieldsOnChange?.forEach((cleared) => { next = setValueAtPath(next, String(cleared), null); });
      return next;
    });
    onFieldChange?.(name, value);
  }, [fields, onFieldChange]);

  const isValid = useMemo(
    () => fields.every((f) => !f.isRequired || isFilled(getValueAtPath(formData, String(f.name)))), [formData, fields]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (isProcessing || !isValid) return;
    setSubmitting(true);
    setErrorMessage(null);
    try {
      const response = await onSubmit(formData);
      if (!disableToast) {
        toaster.create({ title: "Success", type: "success",
          description: typeof response === "string" ? response : `${submitLabel} completed successfully.` });
      }
    } catch (error: unknown) {
      setErrorMessage(reflectApiError(error));
    } finally {
      setSubmitting(false);
    }
  };

  return { formData, change, isValid, isProcessing, errorMessage, submit };
}

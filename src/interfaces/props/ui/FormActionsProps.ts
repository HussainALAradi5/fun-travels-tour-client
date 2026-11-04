export interface FormActionsProps {
  submitLabel: string;
  isValid: boolean;
  isProcessing: boolean;
  onCancel?: () => void;
}

export interface StripeCheckoutFormProps {
  amount: string;
  method: string;
  onSuccess: () => void;
  onClose: () => void;
}

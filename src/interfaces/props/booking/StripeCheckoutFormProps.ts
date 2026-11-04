export interface StripeCheckoutFormProps {
  amount: string;
  onSuccess: () => void;
  onClose: () => void;
}

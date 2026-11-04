import type { GenericStatus } from '../../../enums/GenericStatus';

export interface TourDialogsProps {
  confirmOpen: boolean;
  onConfirmClose: () => void;
  seatOpen: boolean;
  onSeatClose: () => void;
  pendingStatus: GenericStatus | null;
  onConfirm: () => void;
  transportId?: number;
}

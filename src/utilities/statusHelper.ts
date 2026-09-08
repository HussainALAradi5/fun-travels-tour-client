import { GenericStatus } from '../enums/GenericStatus';
import { TicketStatus } from '../enums/tourmanagement/TicketStatus';
import { SeatStatus } from '../enums/tourmanagement/SeatStatus';
import { PaymentStatus } from '../enums/payment/PaymentStatus';
import { TransportationStatus } from '../enums/tourmanagement/TransportationStatus';

type StatusColor = { bg: string; text: string };

export function getStatusColor(status: GenericStatus | string): StatusColor {
  const colors: Record<string, StatusColor> = {
    PENDING: { bg: 'yellow.100', text: 'yellow.800' },
    APPROVED: { bg: 'green.100', text: 'green.800' },
    REJECTED: { bg: 'red.100', text: 'red.800' },
    CONFIRMED: { bg: 'blue.100', text: 'blue.800' },
    CANCELLED: { bg: 'red.100', text: 'red.800' },
    COMPLETED: { bg: 'green.100', text: 'green.800' },
    ACTIVE: { bg: 'green.100', text: 'green.800' },
    INACTIVE: { bg: 'gray.100', text: 'gray.800' },
  };
  return colors[status] || { bg: 'gray.100', text: 'gray.800' };
}

export function getTicketStatusColor(status: TicketStatus): StatusColor {
  const colors: Record<string, StatusColor> = {
    PENDING: { bg: 'yellow.100', text: 'yellow.800' },
    CONFIRMED: { bg: 'green.100', text: 'green.800' },
    CANCELLED: { bg: 'red.100', text: 'red.800' },
    COMPLETED: { bg: 'blue.100', text: 'blue.800' },
  };
  return colors[status] || { bg: 'gray.100', text: 'gray.800' };
}

export function getSeatStatusColor(status: SeatStatus): StatusColor {
  const colors: Record<string, StatusColor> = {
    AVAILABLE: { bg: 'green.100', text: 'green.800' },
    BOOKED: { bg: 'red.100', text: 'red.800' },
    RESERVED: { bg: 'yellow.100', text: 'yellow.800' },
    MAINTENANCE: { bg: 'gray.100', text: 'gray.800' },
  };
  return colors[status] || { bg: 'gray.100', text: 'gray.800' };
}

export function getPaymentStatusColor(status: PaymentStatus): StatusColor {
  const colors: Record<string, StatusColor> = {
    PENDING: { bg: 'yellow.100', text: 'yellow.800' },
    COMPLETED: { bg: 'green.100', text: 'green.800' },
    FAILED: { bg: 'red.100', text: 'red.800' },
    REFUNDED: { bg: 'blue.100', text: 'blue.800' },
  };
  return colors[status] || { bg: 'gray.100', text: 'gray.800' };
}

export function getTransportStatusColor(status: TransportationStatus): StatusColor {
  const colors: Record<string, StatusColor> = {
    AVAILABLE: { bg: 'green.100', text: 'green.800' },
    PARTIAL: { bg: 'yellow.100', text: 'yellow.800' },
    FULL: { bg: 'red.100', text: 'red.800' },
    MAINTENANCE: { bg: 'gray.100', text: 'gray.800' },
    INACTIVE: { bg: 'gray.100', text: 'gray.800' },
  };
  return colors[status] || { bg: 'gray.100', text: 'gray.800' };
}

export function isTerminalStatus(status: GenericStatus): boolean {
  return ['COMPLETED', 'CANCELLED', 'REJECTED'].includes(status);
}

export function canTransition(current: GenericStatus, next: GenericStatus): boolean {
  const transitions: Record<string, string[]> = {
    PENDING: ['APPROVED', 'CANCELLED'],
    APPROVED: ['ACTIVE', 'CANCELLED'],
    ACTIVE: ['COMPLETED', 'CANCELLED'],
  };
  return transitions[current]?.includes(next) ?? false;
}

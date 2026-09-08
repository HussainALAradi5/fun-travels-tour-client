import type { GenericStatus } from '../../enums/GenericStatus';
import type { Transportation } from './Transportation';
import type { Ticket } from './Ticket';
import type { TourReservation } from './TourReservation';
import type { MealPlan } from './MealPlan';
import type { Country } from '../geography/Country';
import type { City } from '../geography/City';

export interface Tour {
  id?: number;
  tourNumber: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  maxCapacity: number;
  availableSlots: number;
  price?: number;
  status: GenericStatus;
  numberOfDays?: number;
  hasTransportation: boolean;
  transportation?: Transportation;
  startCountry?: Partial<Country>;
  endCountry?: Partial<Country>;
  startCity?: Partial<City>;
  endCity?: Partial<City>;
  destinationCountries?: Partial<Country>[];
  agency?: { id?: number; agencyName?: string };
  agencyBranch?: { id?: number; branchName?: string };
  tickets?: Ticket[];
  reservations?: TourReservation[];
  createdBy?: { id?: number; name?: string };
  updatedBy?: { id?: number; name?: string };
  createdAt?: string;
  updatedAt?: string;
  basePrice: number;
  discountPrice: number;
  totalPrice?: number;
  availableMeals?: MealPlan[];
}

export interface TourStatsProps {
  tours: Tour[];
}

export interface TourHeaderProps {
  statusFilter: string[];
  onFilterChange: (values: string[]) => void;
  onCreateClick: () => void;
}

export interface TourTableProps {
  data: Tour[];
  isLoading: boolean;
  onViewDetails: (id: string) => void;
}

export const DEFAULT_TOUR: Partial<Tour> = {
  tourNumber: "",
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  maxCapacity: 0,
  availableSlots: 0,
  status: "PENDING" as GenericStatus,
  hasTransportation: false,
  basePrice: 0,
  discountPrice: 0,
};

import type { GenericStatus } from '../../enums/GenericStatus';
import type { Transportation } from './Transportation';
import type { Ticket } from './Ticket';
import type { TourReservation } from './TourReservation';
import type { MealPlan } from './MealPlan';
import type { Country } from '../geography/Country';
import type { City } from '../geography/City';
import type { Agency } from '../agency/Agency';
import type { AgencyBranch } from '../agency/AgencyBranch';
import type { User } from '../user/User';

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
  agency?: Partial<Agency>;
  agencyBranch?: Partial<AgencyBranch>;
  tickets?: Ticket[];
  reservations?: TourReservation[];
  createdBy?: Partial<User>;
  updatedBy?: Partial<User>;
  createdAt?: string;
  updatedAt?: string;
  basePrice: number;
  discountPrice: number;
  totalPrice?: number;
  availableMeals?: MealPlan[];
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

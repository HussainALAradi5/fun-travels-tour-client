import { GenericStatus } from "@/enums/GenericStatus";
import type { Agency } from "../Agency/AgencyInterface";
import type { AgencyBranch } from "../Agency/AgencyBranchInterface";
import type { Country } from "../CountryInterface";
import type { City } from "../CityInterface";
import type { User } from "../UserInterface";
import type { Ticket } from "./TicketInterface";
import type { Transportation } from "./TransportationInterface";
import type { MealPlan } from "./MealPlanInterface";
import type { TourReservation } from "./TourReservationInterface";

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
  startCountry?: Country;
  endCountry?: Country;
  startCity?: City;
  endCity?: City;
  destinationCountries?: Country[]; 
  agency?: Agency;
  agencyBranch?: AgencyBranch;
  tickets?: Ticket[]; 
  reservations?: TourReservation[];
  createdBy?: User;
  updatedBy?: User;
  createdAt?: string; 
  updatedAt?: string; 
  basePrice: number;
  discountPrice: number; 
  totalPrice?: number; 
  availableMeals?: MealPlan[];
}

export const DEFAULT_TOUR: Partial<Tour> = {
  title: "",
  tourNumber: "",
  description: "",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  numberOfDays: 0, 
  maxCapacity: 0,
  availableSlots: 0,
  price: 0,
  basePrice: 0,
  discountPrice: 0,
  totalPrice: 0,
  status: GenericStatus.PENDING,
  hasTransportation: false,
  destinationCountries: [],
  availableMeals: []
  
};
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
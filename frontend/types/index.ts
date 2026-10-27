export type Category = 'planner' | 'performer' | 'crew';

export interface EventBasics {
  eventName: string;
  eventType: string;
  eventDate?: string;
  eventDateRange?: {
    startDate: string;
    endDate: string;
  };
  location: string;
  venue?: string;
  category: Category;
}

export interface PlannerDetails {
  eventScale: string;
  guestCount: number;
  planningServices: string[];
  budget: string;
  planningStage: string;
}

export interface PerformerDetails {
  performerType: string;
  genre: string;
  numberOfPerformers: number;
  duration: string;
  budget: string;
  equipment: string[];
}

export interface CrewDetails {
  crewRoles: string[];
  numberOfMembers: number;
  experienceLevel: string;
  shiftDuration: string;
  budget: string;
}

export interface AdditionalDetails {
  contactPerson: string;
  email: string;
  phone: string;
  preferredTime?: string;
  additionalNotes?: string;
}

export interface EventRequirementFormData extends EventBasics, AdditionalDetails {
  plannerDetails?: PlannerDetails;
  performerDetails?: PerformerDetails;
  crewDetails?: CrewDetails;
}

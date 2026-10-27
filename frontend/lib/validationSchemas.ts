import { z } from 'zod';

// Step 1: Event Basics
export const eventBasicsSchema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  eventType: z.string().min(1, 'Event type is required'),
  eventDate: z.string().optional(),
  eventDateRange: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
  location: z.string().min(1, 'Location is required'),
  venue: z.string().optional(),
  category: z.enum(['planner', 'performer', 'crew'], {
    error: 'Please select a category',
  }),
});

// Step 2: Planner Details
export const plannerDetailsSchema = z.object({
  plannerDetails: z.object({
    eventScale: z.string().min(1, 'Event scale is required'),
    guestCount: z.number().min(1, 'Guest count must be at least 1'),
    planningServices: z.array(z.string()).min(1, 'Select at least one planning service'),
    budget: z.string().min(1, 'Budget is required'),
    planningStage: z.string().min(1, 'Planning stage is required'),
  }),
});

// Step 2: Performer Details
export const performerDetailsSchema = z.object({
  performerDetails: z.object({
    performerType: z.string().min(1, 'Performer type is required'),
    genre: z.string().min(1, 'Genre is required'),
    numberOfPerformers: z.number().min(1, 'Number of performers must be at least 1'),
    duration: z.string().min(1, 'Duration is required'),
    budget: z.string().min(1, 'Budget is required'),
    equipment: z.array(z.string()).min(1, 'Select at least one equipment item'),
  }),
});

// Step 2: Crew Details
export const crewDetailsSchema = z.object({
  crewDetails: z.object({
    crewRoles: z.array(z.string()).min(1, 'Select at least one crew role'),
    numberOfMembers: z.number().min(1, 'Number of members must be at least 1'),
    experienceLevel: z.string().min(1, 'Experience level is required'),
    shiftDuration: z.string().min(1, 'Shift duration is required'),
    budget: z.string().min(1, 'Budget is required'),
  }),
});

// Step 3: Additional Details
export const additionalDetailsSchema = z.object({
  contactPerson: z.string().min(1, 'Contact person is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  preferredTime: z.string().optional(),
  additionalNotes: z.string().optional(),
});

// Complete form schema
const completeFormBasicsSchema = eventBasicsSchema
  .omit({ category: true })
  .extend(additionalDetailsSchema.shape);

export const completeFormSchema = z.discriminatedUnion('category', [
  completeFormBasicsSchema.extend({
    category: z.literal('planner'),
    plannerDetails: plannerDetailsSchema.shape.plannerDetails,
  }),
  completeFormBasicsSchema.extend({
    category: z.literal('performer'),
    performerDetails: performerDetailsSchema.shape.performerDetails,
  }),
  completeFormBasicsSchema.extend({
    category: z.literal('crew'),
    crewDetails: crewDetailsSchema.shape.crewDetails,
  }),
]);

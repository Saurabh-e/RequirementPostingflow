import mongoose, { Schema, Document } from 'mongoose';

export interface IEventRequirement extends Document {
  // Step 1: Event Basics
  eventName: string;
  eventType: string;
  eventDate?: Date;
  eventDateRange?: {
    startDate: Date;
    endDate: Date;
  };
  location: string;
  venue?: string;
  category: 'planner' | 'performer' | 'crew';

  // Step 2: Category-Specific Requirements
  plannerDetails?: {
    eventScale: string;
    guestCount: number;
    planningServices: string[];
    budget: string;
    planningStage: string;
  };
  performerDetails?: {
    performerType: string;
    genre: string;
    numberOfPerformers: number;
    duration: string;
    budget: string;
    equipment: string[];
  };
  crewDetails?: {
    crewRoles: string[];
    numberOfMembers: number;
    experienceLevel: string;
    shiftDuration: string;
    budget: string;
  };

  // Step 3: Additional Details
  contactPerson: string;
  email: string;
  phone: string;
  preferredTime?: string;
  additionalNotes?: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

const EventRequirementSchema: Schema = new Schema(
  {
    // Step 1: Event Basics
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date },
    eventDateRange: {
      startDate: { type: Date },
      endDate: { type: Date },
    },
    location: { type: String, required: true },
    venue: { type: String },
    category: { 
      type: String, 
      required: true, 
      enum: ['planner', 'performer', 'crew']
    },

    // Step 2: Category-Specific Requirements
    plannerDetails: {
      eventScale: { type: String },
      guestCount: { type: Number },
      planningServices: [{ type: String }],
      budget: { type: String },
      planningStage: { type: String },
    },
    performerDetails: {
      performerType: { type: String },
      genre: { type: String },
      numberOfPerformers: { type: Number },
      duration: { type: String },
      budget: { type: String },
      equipment: [{ type: String }],
    },
    crewDetails: {
      crewRoles: [{ type: String }],
      numberOfMembers: { type: Number },
      experienceLevel: { type: String },
      shiftDuration: { type: String },
      budget: { type: String },
    },

    // Step 3: Additional Details
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    preferredTime: { type: String },
    additionalNotes: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEventRequirement>('EventRequirement', EventRequirementSchema);

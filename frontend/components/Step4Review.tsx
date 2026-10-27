'use client';

import { UseFormReturn } from 'react-hook-form';
import { EventRequirementFormData } from '@/types';

interface Step4Props {
  form: UseFormReturn<EventRequirementFormData>;
  onEdit: (step: number) => void;
}

export default function Step4Review({ form, onEdit }: Step4Props) {
  const data = form.watch();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Review Your Submission</h2>

      {/* Event Basics */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Event Basics</h3>
          <button
            type="button"
            onClick={() => onEdit(1)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Edit
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Event Name:</span> {data.eventName}
          </div>
          <div>
            <span className="font-medium">Event Type:</span> {data.eventType}
          </div>
          {data.eventDate && (
            <div>
              <span className="font-medium">Event Date:</span> {data.eventDate}
            </div>
          )}
          <div>
            <span className="font-medium">Location:</span> {data.location}
          </div>
          {data.venue && (
            <div>
              <span className="font-medium">Venue:</span> {data.venue}
            </div>
          )}
          <div>
            <span className="font-medium">Category:</span>{' '}
            <span className="capitalize">{data.category}</span>
          </div>
        </div>
      </div>

      {/* Category-Specific Details */}
      {data.category && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {data.category === 'planner' && 'Planner Requirements'}
              {data.category === 'performer' && 'Performer Requirements'}
              {data.category === 'crew' && 'Crew Requirements'}
            </h3>
            <button
              type="button"
              onClick={() => onEdit(2)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          </div>
          <div className="space-y-2 text-sm">
            {data.category === 'planner' && data.plannerDetails && (
              <>
                <div>
                  <span className="font-medium">Event Scale:</span> {data.plannerDetails.eventScale}
                </div>
                <div>
                  <span className="font-medium">Guest Count:</span> {data.plannerDetails.guestCount}
                </div>
                <div>
                  <span className="font-medium">Planning Services:</span>{' '}
                  {data.plannerDetails.planningServices?.join(', ')}
                </div>
                <div>
                  <span className="font-medium">Budget:</span> {data.plannerDetails.budget}
                </div>
                <div>
                  <span className="font-medium">Planning Stage:</span>{' '}
                  {data.plannerDetails.planningStage}
                </div>
              </>
            )}

            {data.category === 'performer' && data.performerDetails && (
              <>
                <div>
                  <span className="font-medium">Performer Type:</span>{' '}
                  {data.performerDetails.performerType}
                </div>
                <div>
                  <span className="font-medium">Genre:</span> {data.performerDetails.genre}
                </div>
                <div>
                  <span className="font-medium">Number of Performers:</span>{' '}
                  {data.performerDetails.numberOfPerformers}
                </div>
                <div>
                  <span className="font-medium">Duration:</span> {data.performerDetails.duration}
                </div>
                <div>
                  <span className="font-medium">Equipment:</span>{' '}
                  {data.performerDetails.equipment?.join(', ')}
                </div>
                <div>
                  <span className="font-medium">Budget:</span> {data.performerDetails.budget}
                </div>
              </>
            )}

            {data.category === 'crew' && data.crewDetails && (
              <>
                <div>
                  <span className="font-medium">Crew Roles:</span>{' '}
                  {data.crewDetails.crewRoles?.join(', ')}
                </div>
                <div>
                  <span className="font-medium">Number of Members:</span>{' '}
                  {data.crewDetails.numberOfMembers}
                </div>
                <div>
                  <span className="font-medium">Experience Level:</span>{' '}
                  {data.crewDetails.experienceLevel}
                </div>
                <div>
                  <span className="font-medium">Shift Duration:</span>{' '}
                  {data.crewDetails.shiftDuration}
                </div>
                <div>
                  <span className="font-medium">Budget:</span> {data.crewDetails.budget}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Contact Details */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Contact Details</h3>
          <button
            type="button"
            onClick={() => onEdit(3)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Edit
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Contact Person:</span> {data.contactPerson}
          </div>
          <div>
            <span className="font-medium">Email:</span> {data.email}
          </div>
          <div>
            <span className="font-medium">Phone:</span> {data.phone}
          </div>
          {data.preferredTime && (
            <div>
              <span className="font-medium">Preferred Time:</span> {data.preferredTime}
            </div>
          )}
          {data.additionalNotes && (
            <div>
              <span className="font-medium">Additional Notes:</span>
              <p className="mt-1 text-gray-700">{data.additionalNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { UseFormReturn } from 'react-hook-form';
import { EventRequirementFormData } from '@/types';

interface Step2Props {
  form: UseFormReturn<EventRequirementFormData>;
}

export default function Step2CategoryRequirements({ form }: Step2Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const category = watch('category');

  const planningServices = ['Full Planning', 'Partial Planning', 'Day Coordination', 'Consultation'];
  const equipmentOptions = ['Sound System', 'Lighting', 'Stage', 'Microphones', 'Instruments'];
  const crewRoles = ['Stage Manager', 'Lighting Technician', 'Sound Engineer', 'Rigger', 'Coordinator'];

  const toggleArrayItem = (
    field:
      | 'plannerDetails.planningServices'
      | 'performerDetails.equipment'
      | 'crewDetails.crewRoles',
    item: string,
    currentValue: string[] = []
  ) => {
    const newValue = currentValue.includes(item)
      ? currentValue.filter((v) => v !== item)
      : [...currentValue, item];
    setValue(field, newValue, { shouldValidate: true });
  };

  if (!category) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please select a category in Step 1 first</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Category-Specific Requirements</h2>

      {category === 'planner' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Scale *
            </label>
            <select
              {...register('plannerDetails.eventScale')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select scale</option>
              <option value="small">Small (1-50 guests)</option>
              <option value="medium">Medium (51-200 guests)</option>
              <option value="large">Large (201-500 guests)</option>
              <option value="xlarge">Extra Large (500+ guests)</option>
            </select>
            {errors.plannerDetails?.eventScale && (
              <p className="mt-1 text-sm text-red-600">{errors.plannerDetails.eventScale.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guest Count *
            </label>
            <input
              type="number"
              {...register('plannerDetails.guestCount', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter expected number of guests"
            />
            {errors.plannerDetails?.guestCount && (
              <p className="mt-1 text-sm text-red-600">{errors.plannerDetails.guestCount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Planning Services *
            </label>
            <div className="space-y-2">
              {planningServices.map((service) => (
                <label key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={watch('plannerDetails.planningServices')?.includes(service)}
                    onChange={() =>
                      toggleArrayItem(
                        'plannerDetails.planningServices',
                        service,
                        watch('plannerDetails.planningServices')
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{service}</span>
                </label>
              ))}
            </div>
            {errors.plannerDetails?.planningServices && (
              <p className="mt-1 text-sm text-red-600">{errors.plannerDetails.planningServices.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget *
            </label>
            <select
              {...register('plannerDetails.budget')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select budget range</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-50k">$25,000 - $50,000</option>
              <option value="50k-plus">$50,000+</option>
            </select>
            {errors.plannerDetails?.budget && (
              <p className="mt-1 text-sm text-red-600">{errors.plannerDetails.budget.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Planning Stage *
            </label>
            <select
              {...register('plannerDetails.planningStage')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select planning stage</option>
              <option value="initial">Initial Planning</option>
              <option value="midway">Midway Through</option>
              <option value="final">Final Details</option>
              <option value="urgent">Urgent/Last Minute</option>
            </select>
            {errors.plannerDetails?.planningStage && (
              <p className="mt-1 text-sm text-red-600">{errors.plannerDetails.planningStage.message}</p>
            )}
          </div>
        </>
      )}

      {category === 'performer' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Performer Type *
            </label>
            <select
              {...register('performerDetails.performerType')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select performer type</option>
              <option value="musician">Musician</option>
              <option value="band">Band</option>
              <option value="dj">DJ</option>
              <option value="dancer">Dancer</option>
              <option value="comedian">Comedian</option>
              <option value="speaker">Speaker</option>
              <option value="other">Other</option>
            </select>
            {errors.performerDetails?.performerType && (
              <p className="mt-1 text-sm text-red-600">{errors.performerDetails.performerType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Genre *
            </label>
            <input
              type="text"
              {...register('performerDetails.genre')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Rock, Jazz, Classical"
            />
            {errors.performerDetails?.genre && (
              <p className="mt-1 text-sm text-red-600">{errors.performerDetails.genre.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Performers *
            </label>
            <input
              type="number"
              {...register('performerDetails.numberOfPerformers', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter number of performers"
            />
            {errors.performerDetails?.numberOfPerformers && (
              <p className="mt-1 text-sm text-red-600">{errors.performerDetails.numberOfPerformers.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Performance Duration *
            </label>
            <select
              {...register('performerDetails.duration')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select duration</option>
              <option value="30min">30 minutes</option>
              <option value="1hour">1 hour</option>
              <option value="2hours">2 hours</option>
              <option value="3hours">3 hours</option>
              <option value="4hours-plus">4+ hours</option>
            </select>
            {errors.performerDetails?.duration && (
              <p className="mt-1 text-sm text-red-600">{errors.performerDetails.duration.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipment Required *
            </label>
            <div className="space-y-2">
              {equipmentOptions.map((equipment) => (
                <label key={equipment} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={watch('performerDetails.equipment')?.includes(equipment)}
                    onChange={() =>
                      toggleArrayItem(
                        'performerDetails.equipment',
                        equipment,
                        watch('performerDetails.equipment')
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{equipment}</span>
                </label>
              ))}
            </div>
            {errors.performerDetails?.equipment && (
              <p className="mt-1 text-sm text-red-600">{errors.performerDetails.equipment.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget *
            </label>
            <select
              {...register('performerDetails.budget')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select budget range</option>
              <option value="under-1k">Under $1,000</option>
              <option value="1k-2.5k">$1,000 - $2,500</option>
              <option value="2.5k-5k">$2,500 - $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-plus">$10,000+</option>
            </select>
            {errors.performerDetails?.budget && (
              <p className="mt-1 text-sm text-red-600">{errors.performerDetails.budget.message}</p>
            )}
          </div>
        </>
      )}

      {category === 'crew' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Crew Roles *
            </label>
            <div className="space-y-2">
              {crewRoles.map((role) => (
                <label key={role} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={watch('crewDetails.crewRoles')?.includes(role)}
                    onChange={() =>
                      toggleArrayItem('crewDetails.crewRoles', role, watch('crewDetails.crewRoles'))
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{role}</span>
                </label>
              ))}
            </div>
            {errors.crewDetails?.crewRoles && (
              <p className="mt-1 text-sm text-red-600">{errors.crewDetails.crewRoles.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Crew Members *
            </label>
            <input
              type="number"
              {...register('crewDetails.numberOfMembers', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter number of crew members needed"
            />
            {errors.crewDetails?.numberOfMembers && (
              <p className="mt-1 text-sm text-red-600">{errors.crewDetails.numberOfMembers.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level *
            </label>
            <select
              {...register('crewDetails.experienceLevel')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select experience level</option>
              <option value="entry">Entry Level</option>
              <option value="intermediate">Intermediate</option>
              <option value="experienced">Experienced</option>
              <option value="expert">Expert/Professional</option>
            </select>
            {errors.crewDetails?.experienceLevel && (
              <p className="mt-1 text-sm text-red-600">{errors.crewDetails.experienceLevel.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shift Duration *
            </label>
            <select
              {...register('crewDetails.shiftDuration')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select shift duration</option>
              <option value="4hours">4 hours</option>
              <option value="8hours">8 hours</option>
              <option value="12hours">12 hours</option>
              <option value="full-day">Full Day</option>
              <option value="multi-day">Multiple Days</option>
            </select>
            {errors.crewDetails?.shiftDuration && (
              <p className="mt-1 text-sm text-red-600">{errors.crewDetails.shiftDuration.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget *
            </label>
            <select
              {...register('crewDetails.budget')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select budget range</option>
              <option value="under-500">Under $500</option>
              <option value="500-1k">$500 - $1,000</option>
              <option value="1k-2.5k">$1,000 - $2,500</option>
              <option value="2.5k-5k">$2,500 - $5,000</option>
              <option value="5k-plus">$5,000+</option>
            </select>
            {errors.crewDetails?.budget && (
              <p className="mt-1 text-sm text-red-600">{errors.crewDetails.budget.message}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

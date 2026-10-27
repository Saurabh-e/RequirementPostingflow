'use client';

import { UseFormReturn } from 'react-hook-form';
import { EventRequirementFormData } from '@/types';

interface Step3Props {
  form: UseFormReturn<EventRequirementFormData>;
}

export default function Step3AdditionalDetails({ form }: Step3Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Additional Details</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact Person *
        </label>
        <input
          type="text"
          {...register('contactPerson')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter contact person name"
        />
        {errors.contactPerson && (
          <p className="mt-1 text-sm text-red-600">{errors.contactPerson.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          {...register('email')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter email address"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone *
        </label>
        <input
          type="tel"
          {...register('phone')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter phone number"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Contact Time (Optional)
        </label>
        <select
          {...register('preferredTime')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select preferred time</option>
          <option value="morning">Morning (9 AM - 12 PM)</option>
          <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
          <option value="evening">Evening (5 PM - 8 PM)</option>
          <option value="anytime">Anytime</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes (Optional)
        </label>
        <textarea
          {...register('additionalNotes')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Any additional information or special requirements..."
        />
      </div>
    </div>
  );
}

'use client';

import { UseFormReturn } from 'react-hook-form';
import { EventRequirementFormData, Category } from '@/types';

interface Step1Props {
  form: UseFormReturn<EventRequirementFormData>;
}

export default function Step1EventBasics({ form }: Step1Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const selectedCategory = watch('category');

  const categories: { id: Category; title: string; description: string }[] = [
    { id: 'planner', title: 'Event Planner', description: 'Planning and coordination services' },
    { id: 'performer', title: 'Performer', description: 'Entertainment and performance' },
    { id: 'crew', title: 'Crew', description: 'Technical and support staff' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Event Basics</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Name *
        </label>
        <input
          type="text"
          {...register('eventName')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter event name"
        />
        {errors.eventName && (
          <p className="mt-1 text-sm text-red-600">{errors.eventName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Type *
        </label>
        <input
          type="text"
          {...register('eventType')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Wedding, Concert, Conference"
        />
        {errors.eventType && (
          <p className="mt-1 text-sm text-red-600">{errors.eventType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Date (Optional)
        </label>
        <input
          type="date"
          {...register('eventDate')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location *
        </label>
        <input
          type="text"
          {...register('location')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter location"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Venue (Optional)
        </label>
        <input
          type="text"
          {...register('venue')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter venue name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Category *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setValue('category', category.id, { shouldValidate: true })}
              className={`p-6 border-2 rounded-lg text-left transition-all ${
                selectedCategory === category.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </button>
          ))}
        </div>
        {errors.category && (
          <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>
    </div>
  );
}

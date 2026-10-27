'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { EventRequirementFormData } from '@/types';
import {
  additionalDetailsSchema,
  completeFormSchema,
  eventBasicsSchema,
  plannerDetailsSchema,
  performerDetailsSchema,
  crewDetailsSchema,
} from '@/lib/validationSchemas';
import { createRequirement } from '@/lib/api';
import ProgressBar from '@/components/ProgressBar';
import Step1EventBasics from '@/components/Step1EventBasics';
import Step2CategoryRequirements from '@/components/Step2CategoryRequirements';
import Step3AdditionalDetails from '@/components/Step3AdditionalDetails';
import Step4Review from '@/components/Step4Review';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<EventRequirementFormData>({
    defaultValues: {
      category: undefined,
      plannerDetails: {
        planningServices: [],
      },
      performerDetails: {
        equipment: [],
      },
      crewDetails: {
        crewRoles: [],
      },
    },
  });

  const showValidationIssues = (
    issues: Array<{ path: PropertyKey[]; message: string }>
  ) => {
    for (const issue of issues) {
      const path = issue.path.join('.');
      const error = { type: 'manual', message: issue.message };

      switch (path) {
        case 'eventName':
          form.setError('eventName', error);
          break;
        case 'eventType':
          form.setError('eventType', error);
          break;
        case 'location':
          form.setError('location', error);
          break;
        case 'category':
          form.setError('category', error);
          break;
        case 'plannerDetails.eventScale':
          form.setError('plannerDetails.eventScale', error);
          break;
        case 'plannerDetails.guestCount':
          form.setError('plannerDetails.guestCount', error);
          break;
        case 'plannerDetails.planningServices':
          form.setError('plannerDetails.planningServices', error);
          break;
        case 'plannerDetails.budget':
          form.setError('plannerDetails.budget', error);
          break;
        case 'plannerDetails.planningStage':
          form.setError('plannerDetails.planningStage', error);
          break;
        case 'performerDetails.performerType':
          form.setError('performerDetails.performerType', error);
          break;
        case 'performerDetails.genre':
          form.setError('performerDetails.genre', error);
          break;
        case 'performerDetails.numberOfPerformers':
          form.setError('performerDetails.numberOfPerformers', error);
          break;
        case 'performerDetails.duration':
          form.setError('performerDetails.duration', error);
          break;
        case 'performerDetails.budget':
          form.setError('performerDetails.budget', error);
          break;
        case 'performerDetails.equipment':
          form.setError('performerDetails.equipment', error);
          break;
        case 'crewDetails.crewRoles':
          form.setError('crewDetails.crewRoles', error);
          break;
        case 'crewDetails.numberOfMembers':
          form.setError('crewDetails.numberOfMembers', error);
          break;
        case 'crewDetails.experienceLevel':
          form.setError('crewDetails.experienceLevel', error);
          break;
        case 'crewDetails.shiftDuration':
          form.setError('crewDetails.shiftDuration', error);
          break;
        case 'crewDetails.budget':
          form.setError('crewDetails.budget', error);
          break;
        case 'contactPerson':
          form.setError('contactPerson', error);
          break;
        case 'email':
          form.setError('email', error);
          break;
        case 'phone':
          form.setError('phone', error);
          break;
      }
    }
  };

  const validateStep = async () => {
    form.clearErrors();

    if (currentStep === 1) {
      const result = eventBasicsSchema.safeParse(form.getValues());
      if (!result.success) {
        showValidationIssues(result.error.issues);
        return false;
      }
    } else if (currentStep === 2) {
      const category = form.getValues('category');
      if (!category) {
        form.setError('category', {
          type: 'manual',
          message: 'Please select a category',
        });
        return false;
      }
      const schema =
        category === 'planner'
          ? plannerDetailsSchema
          : category === 'performer'
          ? performerDetailsSchema
          : crewDetailsSchema;
      const result = schema.safeParse(form.getValues());
      if (!result.success) {
        showValidationIssues(result.error.issues);
        return false;
      }
    } else if (currentStep === 3) {
      const result = additionalDetailsSchema.safeParse(form.getValues());
      if (!result.success) {
        showValidationIssues(result.error.issues);
        return false;
      }
    }

    return true;
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const parsedData = completeFormSchema.safeParse(form.getValues());
      if (!parsedData.success) {
        showValidationIssues(parsedData.error.issues);
        setError(parsedData.error.issues[0]?.message ?? 'Please complete all required fields.');
        return;
      }

      const response = await createRequirement(parsedData.data);
      if (response.success) {
        router.push(`/success?id=${response.data.id}`);
      }
    } catch (err: unknown) {
      console.error('Submission error:', err);
      const responseData = isAxiosError<{
        message?: string;
        errors?: Array<{ msg: string }>;
      }>(err)
        ? err.response?.data
        : undefined;
      setError(
        responseData?.message ||
          responseData?.errors?.[0]?.msg ||
          'An error occurred while submitting your requirement. Please try again.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Event Requirement Posting
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Fill out the form to post your event requirement
          </p>

          <ProgressBar currentStep={currentStep} totalSteps={4} />

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
            {currentStep === 1 && <Step1EventBasics form={form} />}
            {currentStep === 2 && <Step2CategoryRequirements form={form} />}
            {currentStep === 3 && <Step3AdditionalDetails form={form} />}
            {currentStep === 4 && <Step4Review form={form} onEdit={handleEdit} />}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg font-medium ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Back
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Requirement'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

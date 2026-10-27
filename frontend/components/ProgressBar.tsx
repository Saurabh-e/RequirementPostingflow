'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const steps = [
    { number: 1, title: 'Event Basics' },
    { number: 2, title: 'Requirements' },
    { number: 3, title: 'Contact Details' },
    { number: 4, title: 'Review' },
  ];

  return (
    <div className="w-full py-6" aria-label={`Step ${currentStep} of ${totalSteps}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step.number
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.number}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2 bg-gray-200">
                <div
                  className={`h-full transition-all duration-300 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  style={{
                    width: currentStep > step.number ? '100%' : '0%',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

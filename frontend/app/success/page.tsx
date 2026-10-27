'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requirementId = searchParams.get('id');

  useEffect(() => {
    if (!requirementId) {
      router.push('/');
    }
  }, [requirementId, router]);

  if (!requirementId) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Requirement Submitted Successfully!
          </h1>

          <p className="text-gray-600 mb-6">
            Your event requirement has been successfully posted and saved to our database.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Requirement ID:</span>
            </p>
            <p className="text-lg font-mono font-semibold text-blue-600 break-all">
              {requirementId}
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-8">
            Please save this ID for your records. You can use it to track your requirement.
          </p>

          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Submit Another Requirement
            </Link>
            <Link
              href="/requirements"
              className="block w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              View All Requirements
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}

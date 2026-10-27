'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllRequirements } from '@/lib/api';
import { Category } from '@/types';

interface Requirement {
  _id: string;
  eventName: string;
  eventType: string;
  location: string;
  category: Category;
  contactPerson: string;
  createdAt: string;
}

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let cancelled = false;

    const fetchRequirements = async () => {
      try {
        const params: { category?: string; page: number; limit: number } = {
          page: currentPage,
          limit: 10,
        };
        if (selectedCategory) {
          params.category = selectedCategory;
        }
        const response = await getAllRequirements(params);
        if (cancelled) {
          return;
        }
        setRequirements(response.data);
        setTotalPages(response.pagination.pages);
        setError(null);
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load requirements');
          console.error(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchRequirements();
    return () => {
      cancelled = true;
    };
  }, [currentPage, selectedCategory]);

  const handleCategoryFilter = (category: string) => {
    setLoading(true);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (updatePage: (page: number) => number) => {
    setLoading(true);
    setCurrentPage(updatePage);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">All Requirements</h1>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create New
            </Link>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => handleCategoryFilter('')}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === ''
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleCategoryFilter('planner')}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === 'planner'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Planner
            </button>
            <button
              onClick={() => handleCategoryFilter('performer')}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === 'performer'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Performer
            </button>
            <button
              onClick={() => handleCategoryFilter('crew')}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === 'crew'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Crew
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading requirements...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : requirements.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No requirements found</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {requirements.map((req) => (
                  <div
                    key={req._id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {req.eventName}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">Type:</span> {req.eventType}
                          </p>
                          <p>
                            <span className="font-medium">Location:</span> {req.location}
                          </p>
                          <p>
                            <span className="font-medium">Contact:</span> {req.contactPerson}
                          </p>
                          <p>
                            <span className="font-medium">Posted:</span>{' '}
                            {new Date(req.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          req.category === 'planner'
                            ? 'bg-purple-100 text-purple-700'
                            : req.category === 'performer'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {req.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange((page) => Math.max(1, page - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange((page) => Math.min(totalPages, page + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

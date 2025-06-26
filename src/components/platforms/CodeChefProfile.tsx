"use client";
import { useEffect, useState } from 'react';

interface CodeChefProfileProps {
  handle: string;
}

export default function CodeChefProfile({ handle }: CodeChefProfileProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/api/codechef/${handle}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.error);
        }
        setData(result);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [handle]);

  if (!handle) return null;

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-100 shadow-sm">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-8 h-8 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700">Loading CodeChef Profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 rounded-r-2xl p-6 shadow-sm">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-bold text-red-800">Error loading CodeChef profile</h4>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-yellow-500 rounded-xl shadow-md">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <a
              href={`https://www.codechef.com/users/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-600 hover:text-yellow-700 transition-colors duration-200 flex items-center gap-2"
            >
              CodeChef Stats
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </h2>
          <p className="text-gray-600 font-medium">@{handle}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-yellow-200 text-yellow-900 p-5 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-2xl font-bold">{data.rating}</span>
          <span className="font-semibold">Rating</span>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-5 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-xl font-bold">{data.stars}</span>
          <span className="font-semibold">Stars</span>
        </div>
        <div className="bg-orange-200 text-orange-900 p-5 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-xl font-bold">{data.highest_rating}</span>
          <span className="font-semibold">Highest Rating</span>
        </div>
        <div className="bg-orange-100 text-orange-800 p-5 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-xl font-bold">{data.fully_solved_count}</span>
          <span className="font-semibold">Problems Solved</span>
        </div>
        <div className="bg-yellow-50 text-yellow-700 p-5 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-xl font-bold">{data.country_rank || 'N/A'}</span>
          <span className="font-semibold">Country Rank</span>
        </div>
        <div className="bg-yellow-50 text-yellow-700 p-5 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-xl font-bold">{data.global_rank || 'N/A'}</span>
          <span className="font-semibold">Global Rank</span>
        </div>
      </div>
    </div>
  );
} 
'use client'

import { updateProfile } from '@/app/profile/actions'
import { type User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

interface Profile {
  id: string;
  full_name?: string;
  username?: string;
  website?: string;
  codeforces_handle?: string;
  leetcode_handle?: string;
  codechef_handle?: string;
  [key: string]: any;
}

export default function ProfileForm({ user, profile }: { user: User, profile: Profile }) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = async (formData: FormData) => {
    const result = await updateProfile(formData);
    if (result.error) {
      setError(result.error)
      setSuccess(false)
    } else {
      setError(null)
      setSuccess(true)
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <form action={handleSubmit} className="p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-700 font-medium">Profile updated successfully!</p>
            </div>
          </div>
        )}
        
        {/* Account Information Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Account Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input 
                id="email" 
                type="text" 
                value={user.email} 
                disabled 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
              />
            </div>
            
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input 
                id="fullName" 
                name="fullName" 
                type="text" 
                defaultValue={profile?.full_name ?? ''} 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400 text-gray-700 bg-white"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input 
                id="username" 
                name="username" 
                type="text" 
                defaultValue={profile?.username ?? ''} 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400 text-gray-700 bg-white"
                placeholder="Choose a username"
              />
            </div>
            
            <div>
              <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
              <input 
                id="website" 
                name="website" 
                type="url" 
                defaultValue={profile?.website ?? ''} 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400 text-gray-700 bg-white"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>

        {/* Platform Handles Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Platform Handles</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="codeforces_handle" className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  Codeforces Handle
                </div>
              </label>
              <input
                id="codeforces_handle"
                name="codeforces_handle"
                type="text"
                defaultValue={profile.codeforces_handle || ''}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all placeholder-gray-400 text-gray-700 bg-white"
                placeholder="your_cf_handle"
              />
            </div>
            
            <div>
              <label htmlFor="leetcode_handle" className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                  LeetCode Handle
                </div>
              </label>
              <input
                id="leetcode_handle"
                name="leetcode_handle"
                type="text"
                defaultValue={profile.leetcode_handle || ''}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all placeholder-gray-400 text-gray-700 bg-white"
                placeholder="your_leetcode_handle"
              />
            </div>
            
            <div>
              <label htmlFor="codechef_handle" className="block text-sm font-semibold text-yellow-700 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  CodeChef Handle
                </div>
              </label>
              <input
                id="codechef_handle"
                name="codechef_handle"
                type="text"
                defaultValue={profile.codechef_handle || ''}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all placeholder-gray-400 text-gray-700 bg-white"
                placeholder="your_codechef_handle"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            type="submit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Update Profile
          </button>
        </div>
      </form>
    </div>
  )
}
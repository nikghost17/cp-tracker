"use client";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/auth/profile-form";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [meRes, profileRes] = await Promise.all([
        fetch("/api/me"),
        fetch("/api/profile"),
      ]);
      const { user } = await meRes.json();
      const { profile } = await profileRes.json();
      setUser(user);
      setProfile(profile);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const hasHandles =
    profile?.codeforces_handle ||
    profile?.leetcode_handle ||
    profile?.codechef_handle;

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            className="text-center py-20 px-6 bg-white rounded-xl shadow-lg border border-slate-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-5xl">👤</span>
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Profile Settings
            </h1>
            <p className="text-slate-600 mb-8 text-lg max-w-lg mx-auto">
              Sign in to manage your profile, connect your coding platform
              handles, and track your competitive programming journey!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/auth/login"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>Sign In</span>
                </Link>
              </motion.div>
            </div>

            {/* Feature Preview */}
            <motion.div
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-3xl mb-2">🔗</div>
                <h3 className="font-semibold text-slate-800 mb-1">
                  Connect Platforms
                </h3>
                <p className="text-sm text-slate-600">
                  Link your Codeforces, LeetCode, and CodeChef accounts
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-slate-800 mb-1">
                  Track Ratings
                </h3>
                <p className="text-sm text-slate-600">
                  Monitor your progress across all platforms
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-slate-800 mb-1">Set Goals</h3>
                <p className="text-sm text-slate-600">
                  Create and track your competitive programming goals
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Profile Settings
              </h1>
              <p className="text-slate-600">
                Manage your account and platform connections
              </p>
            </div>
            {hasHandles && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/ratings"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  View Ratings
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Account Information
                </h2>
              </div>
              <div className="p-6">
                <ProfileForm user={user} profile={profile} />
              </div>
            </div>
          </motion.div>

          {/* Platform Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Connected Platforms */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Connected Platforms
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {/* Codeforces */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${profile?.codeforces_handle ? "bg-green-500" : "bg-gray-300"}`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">Codeforces</p>
                    <p className="text-xs text-slate-500">
                      {profile?.codeforces_handle || "Not connected"}
                    </p>
                  </div>
                  {profile?.codeforces_handle && (
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </motion.div>

                {/* LeetCode */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${profile?.leetcode_handle ? "bg-green-500" : "bg-gray-300"}`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">LeetCode</p>
                    <p className="text-xs text-slate-500">
                      {profile?.leetcode_handle || "Not connected"}
                    </p>
                  </div>
                  {profile?.leetcode_handle && (
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </motion.div>

                {/* CodeChef */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${profile?.codechef_handle ? "bg-green-500" : "bg-gray-300"}`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">CodeChef</p>
                    <p className="text-xs text-slate-500">
                      {profile?.codechef_handle || "Not connected"}
                    </p>
                  </div>
                  {profile?.codechef_handle && (
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md border border-blue-100 p-5"
            >
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Connect your platform handles to track ratings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Visit the Ratings page to see detailed stats</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    CodeChef API uses third-party service
                    (codechef-api.vercel.app)
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

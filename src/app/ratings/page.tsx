"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import CodeforcesProfile from "@/components/platforms/CodeforcesProfile";
import LeetCodeProfile from "@/components/platforms/LeetCodeProfile";
import CodeChefProfile from "@/components/platforms/CodeChefProfile";

export default function RatingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile(profile);
      }
      
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

  const hasAnyHandle =
    profile?.codeforces_handle ||
    profile?.leetcode_handle ||
    profile?.codechef_handle;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
            Platform Ratings
          </h1>
          <p className="text-slate-600 text-lg">
            Track your competitive programming journey across all platforms
          </p>
        </motion.div>

        {!user ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20 bg-white rounded-xl shadow-lg border border-slate-200 max-w-3xl mx-auto"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-5xl">📊</span>
            </motion.div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              View Your Ratings
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">
              Sign in to connect your Codeforces, LeetCode, and CodeChef accounts and track all your ratings in one place!
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/auth/login"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Sign In to View Ratings</span>
              </Link>
            </motion.div>
          </motion.div>
        ) : !hasAnyHandle ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-3xl">🎯</span>
            </motion.div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-3">
              No Handles Connected
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Connect your competitive programming platform handles in your
              profile to see your ratings and stats here.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/profile")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Go to Profile
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Codeforces */}
            {profile?.codeforces_handle && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <CodeforcesProfile handle={profile.codeforces_handle} />
              </motion.div>
            )}

            {/* LeetCode */}
            {profile?.leetcode_handle && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <LeetCodeProfile handle={profile.leetcode_handle} />
              </motion.div>
            )}

            {/* CodeChef */}
            {profile?.codechef_handle && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <CodeChefProfile handle={profile.codechef_handle} />
              </motion.div>
            )}

            {/* Info about CodeChef API */}
            {profile?.codechef_handle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6"
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">
                      About CodeChef API
                    </h4>
                    <p className="text-sm text-blue-800">
                      The CodeChef API uses a third-party service. If you see
                      errors loading CodeChef data, the API service might be
                      temporarily unavailable. The API endpoint is:
                      <code className="bg-blue-100 px-2 py-0.5 rounded mx-1 font-mono text-xs">
                        codechef-api.vercel.app
                      </code>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

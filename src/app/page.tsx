"use client";
import GoalsSectionClient from "@/components/dashboard/GoalsSectionClient";
import AddGoalForm from "@/components/dashboard/AddGoalForm";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: goals } = await supabase
          .from("goals")
          .select("*")
          .eq("user_id", user.id)
          .order("target_date", { ascending: true, nullsFirst: false });
        setGoals(goals || []);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            Welcome to your
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Competitive Programming
            </span>{" "}
            Tracker
          </motion.h1>

          <motion.p
            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {user
              ? `Hello, ${user.email}!`
              : "Track your progress, solve problems, and climb the leaderboards!"}
          </motion.p>
        </motion.div>

        {!user ? (
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-8 text-center">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-4xl">🚀</span>
                </motion.div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                  Start Your Journey Today
                </h2>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  Sign in to unlock powerful features and take your competitive programming to the next level!
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <span>Get Started</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
              
              <div className="p-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-6 text-center">What You Can Do</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    className="flex gap-4 p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100"
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-3xl">🎯</div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Track Goals</h4>
                      <p className="text-sm text-slate-600">Set and monitor your competitive programming goals with progress tracking</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="flex gap-4 p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100"
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-3xl">📝</div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Problem Tracker</h4>
                      <p className="text-sm text-slate-600">Keep notes and track all problems you've solved across platforms</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="flex gap-4 p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100"
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-3xl">📊</div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Rating Insights</h4>
                      <p className="text-sm text-slate-600">View your ratings from Codeforces, LeetCode, and CodeChef in one place</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="flex gap-4 p-4 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100"
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-3xl">🔗</div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Multi-Platform</h4>
                      <p className="text-sm text-slate-600">Connect and manage multiple coding platform profiles seamlessly</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            }}
          >
            <motion.div
              className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-slate-200"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-xl font-semibold text-slate-800">
                Your Dashboard
              </h2>
            </motion.div>
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <GoalsSectionClient goals={goals} />
              <div className="pt-6 border-t border-slate-200">
                <AddGoalForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

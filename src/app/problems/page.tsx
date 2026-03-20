"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProblemsTableClient from "@/components/problems/ProblemsTableClient";
import { motion } from "framer-motion";

export default function ProblemsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        const { data: problems, error } = await supabase
          .from("problems")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching problems:", error);
        } else {
          setProblems(problems || []);
        }
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
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Problem Tracker
            </h1>
            <p className="text-slate-600 mt-1">
              Track and manage your competitive programming problems
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {user ? (
              <Link
                href="/problems/add"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
              >
                <motion.span
                  className="text-lg"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  +
                </motion.span>
                <span>Add Problem</span>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
              >
                <span>Sign In</span>
              </Link>
            )}
          </motion.div>
        </motion.div>

        {/* Problems List */}
        {!user ? (
          <motion.div
            className="text-center py-16 px-6 bg-white rounded-xl shadow-lg border border-slate-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-4xl">🔐</span>
            </motion.div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Login to Track Your Problems
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Sign in to start tracking your competitive programming problems,
              add notes, and monitor your progress across platforms!
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
          </motion.div>
        ) : problems && problems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ProblemsTableClient problems={problems} />
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16 px-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">📝</span>
            </motion.div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              No Problems Yet
            </h3>
            <p className="text-slate-600 mb-6">
              Start tracking your competitive programming journey by adding your
              first problem!
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/problems/add"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span className="text-lg">+</span>
                <span>Add Your First Problem</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

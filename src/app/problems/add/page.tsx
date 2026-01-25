"use client";
import AddProblemForm from "@/components/problems/add-problem-form";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AddProblemPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    fetchUser();
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            className="text-center py-16 px-8 bg-white rounded-xl shadow-lg border border-slate-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-4xl">📝</span>
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Add a Problem
            </h1>
            <p className="text-slate-600 mb-8 text-lg">
              Sign in to track problems and add notes about your solutions
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/auth/login?message=You must be logged in to add a problem"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Sign In to Continue</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AddProblemForm />
    </div>
  );
} 
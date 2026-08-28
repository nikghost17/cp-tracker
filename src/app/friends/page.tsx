"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FriendSearch from "@/components/friends/FriendSearch";
import FriendsList from "@/components/friends/FriendsList";

export default function FriendsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/me");
      const { user } = await res.json();
      setUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleFriendAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
            Friends
          </h1>
          <p className="text-slate-600 text-lg">
            Look up any coder&apos;s profile and save your friends for quick access
          </p>
        </motion.div>

        {/* Quick Lookup Section */}
        <div className="mb-10">
          <FriendSearch user={user} onFriendAdded={handleFriendAdded} />
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-10"
        />

        {/* Saved Friends Section */}
        <FriendsList user={user} refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}

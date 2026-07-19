"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import FriendCard from "./FriendCard";
import Link from "next/link";

interface Friend {
  id: string;
  nickname: string;
  platform: string;
  handle: string;
  created_at: string;
}

interface FriendsListProps {
  user: any;
  refreshTrigger?: number;
}

export default function FriendsList({ user, refreshTrigger }: FriendsListProps) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const fetchFriends = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("friends")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFriends(data || []);
    } catch {
      setFriends([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends, refreshTrigger]);

  const handleRemove = (id: string) => {
    setFriends((prev) => prev.filter((f) => f.id !== id));
  };

  const filteredFriends =
    filter === "all"
      ? friends
      : friends.filter((f) => f.platform === filter);

  const platformCounts = {
    all: friends.length,
    codeforces: friends.filter((f) => f.platform === "codeforces").length,
    leetcode: friends.filter((f) => f.platform === "leetcode").length,
    codechef: friends.filter((f) => f.platform === "codechef").length,
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg border border-slate-200 p-10 text-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-5"
        >
          <span className="text-4xl">👥</span>
        </motion.div>
        <h3 className="text-2xl font-bold text-slate-800 mb-3">
          Save Your Friends
        </h3>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          Sign in to save your friends&apos; profiles and quickly check their
          ratings anytime!
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/auth/login"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span>Sign In</span>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-10 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
          <span className="text-slate-600 font-medium">
            Loading your friends...
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-5"
    >
      {/* Section Header & Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Saved Friends
              <span className="text-sm font-normal text-slate-500">
                ({friends.length})
              </span>
            </h2>
          </div>
        </div>

        {/* Platform Filter Tabs */}
        {friends.length > 0 && (
          <div className="px-6 py-3 flex gap-2 flex-wrap border-b border-slate-100">
            {[
              { key: "all", label: "All", icon: "🌐" },
              { key: "codeforces", label: "Codeforces", icon: "🔴" },
              { key: "leetcode", label: "LeetCode", icon: "🟠" },
              { key: "codechef", label: "CodeChef", icon: "🟡" },
            ].map((tab) => {
              const count =
                platformCounts[tab.key as keyof typeof platformCounts];
              if (tab.key !== "all" && count === 0) return null;
              return (
                <motion.button
                  key={tab.key}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    filter === tab.key
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                      filter === tab.key
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Friends Grid */}
      {friends.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg border border-slate-200 p-10 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <span className="text-4xl">🤝</span>
          </motion.div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            No friends saved yet
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Use the Quick Lookup above to search for your friends&apos; profiles,
            then save them here for easy access!
          </p>
        </motion.div>
      ) : filteredFriends.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center"
        >
          <p className="text-slate-500">
            No friends on this platform yet. Search and add some!
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredFriends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <FriendCard friend={friend} onRemove={handleRemove} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

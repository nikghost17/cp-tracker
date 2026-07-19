"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeforcesProfile from "@/components/platforms/CodeforcesProfile";
import LeetCodeProfile from "@/components/platforms/LeetCodeProfile";
import CodeChefProfile from "@/components/platforms/CodeChefProfile";
import { createClient } from "@/lib/supabase/client";

interface Friend {
  id: string;
  nickname: string;
  platform: string;
  handle: string;
  created_at: string;
}

interface FriendCardProps {
  friend: Friend;
  onRemove: (id: string) => void;
}

const platformConfig: Record<
  string,
  {
    label: string;
    icon: string;
    gradient: string;
    bgLight: string;
    borderColor: string;
    textColor: string;
    hoverBg: string;
  }
> = {
  codeforces: {
    label: "Codeforces",
    icon: "🔴",
    gradient: "from-red-500 to-pink-500",
    bgLight: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-600",
    hoverBg: "hover:bg-red-50",
  },
  leetcode: {
    label: "LeetCode",
    icon: "🟠",
    gradient: "from-orange-500 to-yellow-500",
    bgLight: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    hoverBg: "hover:bg-orange-50",
  },
  codechef: {
    label: "CodeChef",
    icon: "🟡",
    gradient: "from-yellow-500 to-amber-500",
    bgLight: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-600",
    hoverBg: "hover:bg-yellow-50",
  },
};

export default function FriendCard({ friend, onRemove }: FriendCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [removing, setRemoving] = useState(false);

  const config = platformConfig[friend.platform] || platformConfig.codeforces;

  const handleRemove = async () => {
    setRemoving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("friends")
        .delete()
        .eq("id", friend.id);
      if (error) throw error;
      onRemove(friend.id);
    } catch {
      setRemoving(false);
      setShowConfirmDelete(false);
    }
  };

  const renderProfile = () => {
    switch (friend.platform) {
      case "codeforces":
        return <CodeforcesProfile handle={friend.handle} />;
      case "leetcode":
        return <LeetCodeProfile handle={friend.handle} />;
      case "codechef":
        return <CodeChefProfile handle={friend.handle} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`bg-white rounded-xl shadow-md border ${config.borderColor} overflow-hidden transition-all duration-300 hover:shadow-lg`}
    >
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Platform Icon */}
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-md flex-shrink-0`}
            >
              <span className="text-xl">{config.icon}</span>
            </div>

            {/* Info */}
            <div className="min-w-0">
              <h3 className="font-bold text-slate-800 truncate text-lg">
                {friend.nickname}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bgLight} ${config.textColor}`}
                >
                  {config.label}
                </span>
                <span className="text-slate-400 text-sm">@{friend.handle}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* View Profile Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setExpanded(!expanded)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                expanded
                  ? `${config.bgLight} ${config.textColor}`
                  : `text-slate-400 hover:text-slate-600 hover:bg-slate-100`
              }`}
              title={expanded ? "Collapse" : "View Profile"}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {expanded ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                )}
                {!expanded && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                )}
              </svg>
            </motion.button>

            {/* Delete Button */}
            {!showConfirmDelete ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowConfirmDelete(true)}
                className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                title="Remove Friend"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </motion.button>
            ) : (
              <div className="flex items-center gap-1">
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleRemove}
                  disabled={removing}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
                  title="Confirm Remove"
                >
                  {removing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </motion.button>
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowConfirmDelete(false)}
                  className="p-2 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 transition-all duration-200"
                  title="Cancel"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Profile */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 border-t border-slate-100">
              {renderProfile()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

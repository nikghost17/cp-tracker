"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeforcesProfile from "@/components/platforms/CodeforcesProfile";
import LeetCodeProfile from "@/components/platforms/LeetCodeProfile";
import CodeChefProfile from "@/components/platforms/CodeChefProfile";
import { createClient } from "@/lib/supabase/client";

interface FriendSearchProps {
  user: any;
  onFriendAdded?: () => void;
}

const platforms = [
  {
    value: "codeforces",
    label: "Codeforces",
    color: "from-red-500 to-pink-500",
    bgLight: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-600",
    icon: "🔴",
  },
  {
    value: "leetcode",
    label: "LeetCode",
    color: "from-orange-500 to-yellow-500",
    bgLight: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    icon: "🟠",
  },
  {
    value: "codechef",
    label: "CodeChef",
    color: "from-yellow-500 to-amber-500",
    bgLight: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-600",
    icon: "🟡",
  },
];

export default function FriendSearch({ user, onFriendAdded }: FriendSearchProps) {
  const [platform, setPlatform] = useState("codeforces");
  const [handle, setHandle] = useState("");
  const [searchedHandle, setSearchedHandle] = useState<string | null>(null);
  const [searchedPlatform, setSearchedPlatform] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const selectedPlatform = platforms.find((p) => p.value === platform)!;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;
    setSearchedHandle(handle.trim());
    setSearchedPlatform(platform);
    setSaveSuccess(false);
    setSaveError(null);
  };

  const handleSaveFriend = async () => {
    if (!user || !searchedHandle || !searchedPlatform) return;
    setSaving(true);
    setSaveError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("friends").insert({
        user_id: user.id,
        nickname: nickname.trim() || searchedHandle,
        platform: searchedPlatform,
        handle: searchedHandle,
      });
      if (error) {
        if (error.code === "23505") {
          setSaveError("This friend is already in your list!");
        } else {
          throw error;
        }
      } else {
        setSaveSuccess(true);
        setShowSaveModal(false);
        setNickname("");
        onFriendAdded?.();
      }
    } catch (err: any) {
      setSaveError(err.message || "Failed to save friend");
    } finally {
      setSaving(false);
    }
  };

  const renderProfile = () => {
    if (!searchedHandle || !searchedPlatform) return null;
    switch (searchedPlatform) {
      case "codeforces":
        return <CodeforcesProfile handle={searchedHandle} />;
      case "leetcode":
        return <LeetCodeProfile handle={searchedHandle} />;
      case "codechef":
        return <CodeChefProfile handle={searchedHandle} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <motion.div
        className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Quick Lookup
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Search any coder&apos;s profile across platforms
          </p>
        </div>

        <form onSubmit={handleSearch} className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Platform Selector */}
            <div className="sm:w-48">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Platform
              </label>
              <div className="relative">
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-300 rounded-lg px-4 py-3 pr-10 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                >
                  {platforms.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.icon} {p.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Username Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder={`Enter ${selectedPlatform.label} username...`}
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Search Button */}
            <div className="sm:self-end">
              <motion.button
                type="submit"
                disabled={!handle.trim()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg disabled:shadow-none transition-all duration-200 flex items-center justify-center gap-2"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Search Results */}
      <AnimatePresence mode="wait">
        {searchedHandle && searchedPlatform && (
          <motion.div
            key={`${searchedPlatform}-${searchedHandle}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Action Bar */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${selectedPlatform.bgLight} ${selectedPlatform.textColor} ${selectedPlatform.borderColor} border`}
                >
                  {selectedPlatform.icon} {selectedPlatform.label}
                </span>
                <span className="text-slate-600 font-medium">
                  @{searchedHandle}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {saveSuccess && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-green-600 font-medium text-sm flex items-center gap-1"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Saved!
                  </motion.span>
                )}

                {saveError && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm font-medium"
                  >
                    {saveError}
                  </motion.span>
                )}

                {user && !saveSuccess && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSaveModal(true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    Save as Friend
                  </motion.button>
                )}

                {!user && (
                  <span className="text-slate-400 text-sm italic">
                    Sign in to save friends
                  </span>
                )}
              </div>
            </div>

            {/* Profile Component */}
            {renderProfile()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Friend Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Save as Friend
              </h3>
              <p className="text-slate-500 text-sm mb-5">
                Give a nickname for{" "}
                <span className="font-medium text-slate-700">
                  @{searchedHandle}
                </span>{" "}
                on{" "}
                <span className="font-medium text-slate-700">
                  {platforms.find((p) => p.value === searchedPlatform)?.label}
                </span>
              </p>

              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={searchedHandle || "Enter a nickname..."}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 mb-5"
                autoFocus
              />

              {saveError && (
                <p className="text-red-500 text-sm mb-3">{saveError}</p>
              )}

              <div className="flex gap-3 justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setShowSaveModal(false);
                    setNickname("");
                    setSaveError(null);
                  }}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-medium hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSaveFriend}
                  disabled={saving}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-medium py-2.5 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
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
                      Save
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

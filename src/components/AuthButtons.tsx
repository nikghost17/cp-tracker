"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthButtons() {
  const [loggedIn, setLoggedIn] = useState<null | boolean>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setLoggedIn(!!data?.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setLoggedIn(!!session?.user);
      },
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (loggedIn === null) {
    return (
      <motion.div
        className="ml-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ...
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {loggedIn ? (
        <motion.div
          className="flex items-center ml-4"
          key="logout"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <LogoutButton />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/auth/login"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

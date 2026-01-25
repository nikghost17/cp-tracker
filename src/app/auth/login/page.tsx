"use client";
import LoginForm from "@/components/auth/login-form";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div className="flex flex-col justify-center items-center h-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LoginForm />
      </motion.div>
      {message && (
        <motion.p
          className="mt-4 p-4 bg-red-100 text-red-700 text-center rounded-lg border border-red-200 shadow-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

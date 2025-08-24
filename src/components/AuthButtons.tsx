"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AuthButtons() {
  const [loggedIn, setLoggedIn] = useState<null | boolean>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setLoggedIn(!!data?.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (loggedIn === null) {
    return <div className="ml-4">...</div>; // loading indicator
  }
  return loggedIn ? (
    <div className="flex items-center ml-4">
      <LogoutButton />
    </div>
  ) : (
    <Link
      href="/auth/login"
      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-md hover:shadow-lg"
    >
      Login
    </Link>
  );
}

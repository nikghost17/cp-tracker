"use client";
import { logout } from "@/app/auth/actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 p-4 py-2 rounded-md font-medium transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Logout
      </button>
    </form>
  );
}

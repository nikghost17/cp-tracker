'use client'

import { login, signup } from '@/app/auth/actions'

export default function LoginForm() {
  return (
    <form className="flex flex-col w-full max-w-sm mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
        <p className="text-gray-600 text-sm">Sign in to your account or create a new one</p>
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none text-gray-700" 
          name="email" 
          id="email" 
          type="email"
          placeholder="Enter your email"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 transition-colors outline-none" 
          type="password" 
          name="password" 
          id="password"
          placeholder="Enter your password"
        />
      </div>
      
      <button
        formAction={login}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mb-3 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
      >
        Log in
      </button>
      
      <button
        formAction={signup}
        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 outline-none"
      >
        Sign up
      </button>
    </form>
  )
}
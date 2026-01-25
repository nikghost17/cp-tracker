// 'use client'

// import { addGoal } from '@/app/goals/actions'
// import { useRef, useState, useTransition } from 'react'

// export default function AddGoalForm() {
//     const formRef = useRef<HTMLFormElement>(null)
//     const [error, setError] = useState<string | null>(null)
//     const [isPending, startTransition] = useTransition()

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault()
//         const formData = new FormData(event.currentTarget)

//         startTransition(async () => {
//             const result = await addGoal(formData)
//             if (result?.error) {
//                 setError(result.error)
//             } else {
//                 setError(null)
//                 formRef.current?.reset()
//             }
//         })
//     }

//     return (
//         <div className="mt-6 border-t pt-6">
//             <h3 className="text-lg font-semibold mb-2">Add a New Goal</h3>
//             {error && <p className="text-red-500 mb-4 bg-red-100 p-2 rounded-md">{error}</p>}
//             <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center">
//                 <input
//                     type="text"
//                     name="title"
//                     placeholder="Goal Title (e.g., Solve 5 graph problems)"
//                     required
//                     className="flex-grow px-3 py-2 border border-gray-300 rounded-md w-full"
//                 />
//                 <input
//                     type="number"
//                     name="target_count"
//                     placeholder="Target #"
//                     required
//                     className="w-full md:w-28 px-3 py-2 border border-gray-300 rounded-md"
//                 />
//                 <input
//                     type="date"
//                     name="target_date"
//                     className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md text-gray-500"
//                 />
//                 <button
//                     type="submit"
//                     disabled={isPending}
//                     className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:bg-gray-400 w-full md:w-auto"
//                 >
//                     {isPending ? 'Adding...' : 'Add Goal'}
//                 </button>
//             </form>
//         </div>
//     )
// }

"use client";

import { addGoal } from "@/app/goals/actions";
import { useRef, useState, useTransition } from "react";
import { motion } from "framer-motion";

export default function AddGoalForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await addGoal(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setError(null);
        formRef.current?.reset();
      }
    });
  };

  return (
    <motion.div
      className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className="w-2 h-6 bg-blue-500 rounded"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <h3 className="text-xl font-bold text-gray-800">Add a New Goal</h3>
      </div>
      {error && (
        <motion.div
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <p className="text-red-700 font-medium">{error}</p>
        </motion.div>
      )}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
      >
        <div className="md:col-span-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goal Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Solve 5 graph problems"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400 text-gray-700 bg-white"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Count
          </label>
          <input
            type="number"
            name="target_count"
            placeholder="5"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400 text-gray-700 bg-white"
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Date
          </label>
          <input
            type="date"
            name="target_date"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 bg-white"
          />
        </div>
        <div className="md:col-span-2">
          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Adding...
              </>
            ) : (
              <>
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
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Add Goal
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

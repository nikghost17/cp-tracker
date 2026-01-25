"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Problem {
  id: string;
  title: string;
  platform: string;
  status: string;
  difficulty?: string;
  notes?: string;
  tags?: string[];
  link?: string;
}

export default function ProblemsTableClient({
  problems,
}: {
  problems: Problem[];
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Solved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Wrong":
        return "bg-red-100 text-red-800 border-red-200";
      case "Revisit":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <motion.div
      className="overflow-x-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <table className="min-w-full">
        <motion.thead
          className="bg-gradient-to-r from-slate-800 to-slate-700 text-white"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <tr>
            <th className="py-4 px-6 text-left font-semibold">Problem Title</th>
            <th className="py-4 px-6 text-left font-semibold">Platform</th>
            <th className="py-4 px-6 text-left font-semibold">Status</th>
            <th className="py-4 px-6 text-left font-semibold">Difficulty</th>
            <th className="py-4 px-6 text-left font-semibold">Notes</th>
          </tr>
        </motion.thead>
        <tbody className="divide-y divide-slate-200">
          {problems.map((problem, index) => (
            <>
              <motion.tr
                key={problem.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{
                  backgroundColor: "rgb(248 250 252)",
                  scale: 1.01,
                }}
                className={`transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
              >
                <td className="py-4 px-6">
                  {problem.link ? (
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200"
                    >
                      {problem.title}
                    </a>
                  ) : (
                    <span className="text-slate-800 font-medium">
                      {problem.title}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    {problem.platform}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(problem.status)}`}
                  >
                    {problem.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-slate-700 font-medium">
                    {problem.difficulty || "Not specified"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  {problem.notes ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded hover:bg-orange-200 transition-colors duration-150 shadow-sm border border-orange-200"
                      onClick={() =>
                        setExpandedId(
                          expandedId === problem.id ? null : problem.id,
                        )
                      }
                    >
                      {expandedId === problem.id ? "Hide Notes" : "Show Notes"}
                    </motion.button>
                  ) : (
                    <span className="text-slate-400 italic">No notes</span>
                  )}
                </td>
              </motion.tr>
              <AnimatePresence>
                {expandedId === problem.id && (
                  <motion.tr
                    key={`${problem.id}-notes`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td
                      colSpan={5}
                      className="bg-orange-50 border-t border-orange-200"
                    >
                      <motion.div
                        className="p-6 my-2 rounded-xl shadow-inner border border-orange-200"
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                      >
                        <div className="mb-2 text-sm text-orange-700 font-semibold">
                          Notes:
                        </div>
                        <div className="text-slate-800 whitespace-pre-line mb-2">
                          {problem.notes}
                        </div>
                        {problem.tags && problem.tags.length > 0 && (
                          <div className="mt-2">
                            <span className="text-xs font-semibold text-orange-600 mr-2">
                              Topics:
                            </span>
                            {problem.tags.map((tag: string, i: number) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="inline-block bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs mr-2 mb-1"
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white p-4 mt-auto">
//       <div className="container mx-auto text-center">
//         <p>&copy; {new Date().getFullYear()} CP Tracker. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gradient-to-r from-slate-900 to-slate-800 text-white mt-auto border-t border-slate-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-bold text-white">CP</span>
            </motion.div>
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CP Tracker
            </span>
          </motion.div>
          <motion.p
            className="text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            &copy; {new Date().getFullYear()} CP Tracker. All rights reserved.
          </motion.p>
          <motion.div
            className="mt-4 pt-4 border-t border-slate-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-xs text-gray-500">
              Built for competitive programmers, by competitive programmers
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

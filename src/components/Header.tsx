// import Link from 'next/link';

// const Header = () => {
//   return (
//     <header className="bg-gray-800 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/" className="text-xl font-bold">
//           CP Tracker
//         </Link>
//         <nav>
//           <ul className="flex space-x-4">
//             <li>
//               <Link href="/" className="hover:text-gray-300">
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link href="/problems" className="hover:text-gray-300">
//                 Problems
//               </Link>
//             </li>
//             <li>
//               <Link href="/profile" className="hover:text-gray-300">
//                 Profile
//               </Link>
//             </li>
//             <li>
//               <Link href="/auth/login" className="hover:text-gray-300">
//                 Login
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AuthButtons from "./AuthButtons";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg border-b border-slate-700"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <motion.div
            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm font-bold text-white">CP</span>
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CP Tracker
          </span>
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8">
            {[
              { href: "/", label: "Dashboard" },
              { href: "/problems", label: "Problems" },
              { href: "/ratings", label: "Ratings" },
              { href: "/friends", label: "Friends" },
              { href: "/profile", label: "Profile" },
            ].map((item, index) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200 font-medium"
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <AuthButtons />
            </motion.li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;

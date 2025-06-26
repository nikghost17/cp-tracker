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


import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg border-b border-slate-700">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <span className="text-sm font-bold text-white">CP</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CP Tracker
          </span>
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link 
                href="/" 
                className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200 font-medium"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/problems" 
                className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200 font-medium"
              >
                Problems
              </Link>
            </li>
            <li>
              <Link 
                href="/profile" 
                className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200 font-medium"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link 
                href="/auth/login" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
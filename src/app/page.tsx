// import GoalsSection from "@/components/dashboard/GoalsSection";
// import { createClient } from "@/lib/supabase/server";

// export default async function Home() {
//   const supabase = createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   return (
//     <div>
//       <h1 className="text-4xl font-bold mb-4">
//         Welcome to your Competitive Programming Tracker
//       </h1>
//       <p className="text-lg mb-8">
//         {user ? `Hello, ${user.email}!` : 'Track your progress, solve problems, and climb the leaderboards!'}
//       </p>

//       {user && <GoalsSection />}
//     </div>
//   );
// }


import GoalsSection from "@/components/dashboard/GoalsSection";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-12">
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6 leading-tight">
            Welcome to your<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Competitive Programming
            </span> Tracker
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {user ? `Hello, ${user.email}!` : 'Track your progress, solve problems, and climb the leaderboards!'}
          </p>
        </div>

        {user && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800">Your Dashboard</h2>
            </div>
            <div className="p-6">
              <GoalsSection />
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
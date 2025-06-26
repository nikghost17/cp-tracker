import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link';
import ProblemsTableClient from '@/components/problems/ProblemsTableClient';

export default async function ProblemsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?message=You must be logged in to view this page')
  }

  const { data: problems, error } = await supabase
    .from('problems')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching problems:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Problem Tracker
            </h1>
            <p className="text-slate-600 mt-1">Track and manage your competitive programming problems</p>
          </div>
          <Link
            href="/problems/add"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <span className="text-lg">+</span>
            <span>Add Problem</span>
          </Link>
        </div>

        {/* Problems List */}
        {problems && problems.length > 0 ? (
          <ProblemsTableClient problems={problems} />
        ) : (
          <div className="text-center py-16 px-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No Problems Yet</h3>
            <p className="text-slate-600 mb-6">Start tracking your competitive programming journey by adding your first problem!</p>
            <Link
              href="/problems/add"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span className="text-lg">+</span>
              <span>Add Your First Problem</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
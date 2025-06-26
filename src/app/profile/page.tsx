import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/auth/profile-form'
import CodeforcesProfile from '@/components/platforms/CodeforcesProfile'
import LeetCodeProfile from '@/components/platforms/LeetCodeProfile'
import CodeChefProfile from '@/components/platforms/CodeChefProfile'

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?message=You must be logged in to view this page')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">User Profile</h1>
      <ProfileForm user={user} profile={profile} />
      <div className="mt-8">
        <div className="flex flex-col gap-4 p-4">
        {profile?.codeforces_handle && <CodeforcesProfile handle={profile.codeforces_handle} />}
        </div>
        <div className="flex flex-col gap-4">
        {profile?.leetcode_handle && <LeetCodeProfile handle={profile.leetcode_handle} />}
        </div>
        <div className="flex flex-col gap-4">
        {profile?.codechef_handle && <CodeChefProfile handle={profile.codechef_handle} />}
        </div>
      </div>
    </div>
  )
} 
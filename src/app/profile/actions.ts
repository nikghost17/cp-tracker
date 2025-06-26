'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'You must be logged in to update your profile' }
    }

    const profileData = {
        username: formData.get('username') as string,
        full_name: formData.get('fullName') as string,
        website: formData.get('website') as string,
        codeforces_handle: formData.get('codeforces_handle') as string,
        leetcode_handle: formData.get('leetcode_handle') as string,
        codechef_handle: formData.get('codechef_handle') as string,
    }

    const { error } = await supabase.from('profiles').update(profileData).eq('id', user.id)

    if (error) {
        return { error: 'Could not update profile' }
    }

    revalidatePath('/profile')
    return { error: null }
} 
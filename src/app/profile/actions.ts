'use server'

import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'

export async function updateProfile(formData: FormData) {
    const session = await auth()

    if (!session?.user?.id) {
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

    await connectDB()

    const result = await User.findByIdAndUpdate(session.user.id, profileData, { new: true })

    if (!result) {
        return { error: 'Could not update profile' }
    }

    revalidatePath('/profile')
    return { error: null }
}
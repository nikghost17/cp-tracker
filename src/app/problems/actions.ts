'use server'

import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Problem from '@/lib/models/Problem'

export async function addProblem(formData: FormData) {
    const session = await auth()

    if (!session?.user?.id) {
        return redirect('/auth/login?message=You must be logged in to add a problem')
    }

    const title = formData.get('title') as string
    const platform = formData.get('platform') as string

    if (!title || !platform) {
        return redirect('/problems/add?message=Title and Platform are required')
    }

    const problemData = {
        user_id: session.user.id,
        title,
        platform,
        link: formData.get('link') as string,
        difficulty: formData.get('difficulty') as string,
        status: formData.get('status') as string,
        tags: (formData.get('tags') as string)?.split(',').map(tag => tag.trim()).filter(tag => tag) ?? [],
        notes: formData.get('notes') as string,
    }

    await connectDB()

    try {
        await Problem.create(problemData)
    } catch (error) {
        console.error('Error inserting problem:', error)
        return redirect('/problems/add?message=Database error: Could not add problem.')
    }

    revalidatePath('/problems')
    redirect('/problems')
}

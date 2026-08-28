'use server'

import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import connectDB from '@/lib/mongodb'
import Goal from '@/lib/models/Goal'

export async function addGoal(formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) {
        return { error: 'You must be logged in to add a goal.' }
    }

    const title = formData.get('title') as string
    const targetCount = formData.get('target_count') as string
    const targetDate = formData.get('target_date') as string || null

    const parsedTargetCount = parseInt(targetCount, 10)

    if (!title || isNaN(parsedTargetCount) || parsedTargetCount <= 0) {
        return { error: 'A valid title and target count are required.' }
    }

    await connectDB()

    await Goal.create({
        user_id: session.user.id,
        title,
        target_count: parsedTargetCount,
        current_count: 0,
        target_date: targetDate ? new Date(targetDate) : null,
    })

    revalidatePath('/')
    return { error: null }
}

export async function incrementGoal(goalId: string) {
    const session = await auth()
    if (!session?.user?.id) {
        return { error: 'You must be logged in to increment a goal.' }
    }

    await connectDB()

    // Increment current_count by 1
    const goal = await Goal.findOneAndUpdate(
        { _id: goalId, user_id: session.user.id },
        { $inc: { current_count: 1 } },
        { new: true }
    )

    if (!goal) {
        return { error: 'Goal not found.' }
    }

    // If completed, delete it
    if (goal.current_count >= goal.target_count) {
        await Goal.findByIdAndDelete(goalId)
        revalidatePath('/')
        return { error: null, deleted: true }
    }

    revalidatePath('/')
    return { error: null, deleted: false }
}

export async function deleteGoal(goalId: string) {
    const session = await auth()
    if (!session?.user?.id) {
        return { error: 'You must be logged in to delete a goal.' }
    }

    await connectDB()

    const result = await Goal.findOneAndDelete({
        _id: goalId,
        user_id: session.user.id,
    })

    if (!result) {
        return { error: 'Goal not found or unauthorized.' }
    }

    revalidatePath('/')
    return { error: null }
}

export async function editGoal(
    goalId: string,
    updates: { title?: string; target_count?: number; target_date?: string | null }
) {
    const session = await auth()
    if (!session?.user?.id) {
        return { error: 'You must be logged in to edit a goal.' }
    }

    await connectDB()

    const updateData: any = {}
    if (updates.title !== undefined) updateData.title = updates.title
    if (updates.target_count !== undefined) updateData.target_count = updates.target_count
    if (updates.target_date !== undefined) {
        updateData.target_date = updates.target_date ? new Date(updates.target_date) : null
    }

    const result = await Goal.findOneAndUpdate(
        { _id: goalId, user_id: session.user.id },
        updateData,
        { new: true }
    )

    if (!result) {
        return { error: 'Goal not found or unauthorized.' }
    }

    revalidatePath('/')
    return { error: null }
}
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addGoal(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'You must be logged in to add a goal.' }
    }

    const title = formData.get('title') as string;
    const targetCount = formData.get('target_count') as string;
    const targetDate = formData.get('target_date') as string || null; // Can be optional

    const parsedTargetCount = parseInt(targetCount, 10);

    if (!title || isNaN(parsedTargetCount) || parsedTargetCount <= 0) {
        return { error: 'A valid title and target count are required.' };
    }

    const { error } = await supabase.from('goals').insert({
        title,
        target_count: parsedTargetCount,
        target_date: targetDate,
        user_id: user.id,
    });

    if (error) {
        console.error('Error inserting goal:', error);
        return { error: 'Database error: Could not add the goal.' };
    }

    // A goal is added on the main page, so revalidate that path.
    revalidatePath('/');

    // Return success
    return { error: null };
}

export async function incrementGoal(goalId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        if (typeof window !== 'undefined') alert('You must be logged in to increment a goal.');
        return { error: 'You must be logged in to increment a goal.' };
    }
    // Increment current_count by 1
    const { error: incError } = await supabase.rpc('increment_goal_count', { goal_id: goalId });
    if (incError) {
        if (typeof window !== 'undefined') alert('Database error: Could not increment the goal.');
        console.error('Error incrementing goal:', incError);
        return { error: incError.message || 'Database error: Could not increment the goal.' };
    }
    // Fetch the updated goal
    const { data: goal, error: fetchError } = await supabase
        .from('goals')
        .select('id, current_count, target_count')
        .eq('id', goalId)
        .single();
    if (fetchError) {
        console.error('Error fetching updated goal:', fetchError);
        return { error: fetchError.message || 'Could not fetch updated goal.' };
    }
    // If completed, delete the goal
    if (goal.current_count >= goal.target_count) {
        const { error: delError } = await supabase
            .from('goals')
            .delete()
            .eq('id', goalId);
        if (delError) {
            console.error('Error deleting completed goal:', delError);
            return { error: delError.message || 'Could not delete completed goal.' };
        }
        return { error: null, deleted: true };
    }
    return { error: null, deleted: false };
}

export async function deleteGoal(goalId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        if (typeof window !== 'undefined') alert('You must be logged in to delete a goal.');
        return { error: 'You must be logged in to delete a goal.' };
    }
    const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', goalId)
        .eq('user_id', user.id);
    if (error) {
        if (typeof window !== 'undefined') alert('Database error: Could not delete the goal.');
        console.error('Error deleting goal:', error);
        return { error: error.message || 'Database error: Could not delete the goal.' };
    }
    return { error: null };
}

export async function editGoal(goalId: string, updates: { title?: string; target_count?: number; target_date?: string | null }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        if (typeof window !== 'undefined') alert('You must be logged in to edit a goal.');
        return { error: 'You must be logged in to edit a goal.' };
    }
    const { error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', goalId)
        .eq('user_id', user.id);
    if (error) {
        if (typeof window !== 'undefined') alert('Database error: Could not edit the goal.');
        console.error('Error editing goal:', error);
        return { error: error.message || 'Database error: Could not edit the goal.' };
    }
    return { error: null };
} 
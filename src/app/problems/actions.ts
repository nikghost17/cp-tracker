'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addProblem(formData: FormData) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/auth/login?message=You must be logged in to add a problem');
    }

    const problemData = {
        title: formData.get('title') as string,
        platform: formData.get('platform') as string,
        link: formData.get('link') as string,
        difficulty: formData.get('difficulty') as string,
        status: formData.get('status') as string,
        tags: (formData.get('tags') as string)?.split(',').map(tag => tag.trim()).filter(tag => tag) ?? [],
        notes: formData.get('notes') as string,
        user_id: user.id,
    };

    if (!problemData.title || !problemData.platform) {
        return redirect('/problems/add?message=Title and Platform are required');
    }

    const { error } = await supabase.from('problems').insert([problemData]);

    if (error) {
        console.error('Error inserting problem:', error);
        return redirect(`/problems/add?message=Database error: Could not add problem.`);
    }

    revalidatePath('/problems');
    redirect('/problems');
}

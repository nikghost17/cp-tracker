import { createClient } from '@/lib/supabase/server';
import AddGoalForm from './AddGoalForm';
import GoalsSectionClient from './GoalsSectionClient';

const GoalsSection = async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data: goals } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('target_date', { ascending: true, nullsFirst: false });

    return (
        <div>
            <GoalsSectionClient goals={goals || []} />
            <div className="pt-6 border-t border-slate-200">
                <AddGoalForm />
            </div>
        </div>
    );
}

export default GoalsSection;
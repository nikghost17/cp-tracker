import { auth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Goal from '@/lib/models/Goal';
import AddGoalForm from './AddGoalForm';
import GoalsSectionClient from './GoalsSectionClient';

const GoalsSection = async () => {
    const session = await auth();

    if (!session?.user?.id) {
        return null;
    }

    await connectDB();
    const goalsRaw = await Goal.find({ user_id: session.user.id })
        .sort({ target_date: 1 })
        .lean();

    const goals = goalsRaw.map((g: any) => ({
        ...g,
        id: g._id.toString(),
        _id: g._id.toString(),
        user_id: g.user_id.toString(),
        target_date: g.target_date ? g.target_date.toISOString() : null,
        created_at: g.created_at ? g.created_at.toISOString() : null,
    }));

    return (
        <div>
            <GoalsSectionClient goals={goals} />
            <div className="pt-6 border-t border-slate-200">
                <AddGoalForm />
            </div>
        </div>
    );
}

export default GoalsSection;
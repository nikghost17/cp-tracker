"use client";
import { useState } from 'react';
import { incrementGoal, deleteGoal, editGoal } from '@/app/goals/actions';

interface Goal {
  id: string;
  title: string;
  target_count: number;
  current_count: number;
  target_date?: string | null;
}

export default function GoalsSectionClient({ goals }: { goals: Goal[] }) {
  const [loadingGoalId, setLoadingGoalId] = useState<string | null>(null);
  const [localGoals, setLocalGoals] = useState<Goal[]>(goals);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ title: string; target_count: number; target_date: string | null }>({ title: '', target_count: 1, target_date: null });

  const handleIncrement = async (goalId: string) => {
    setLoadingGoalId(goalId);
    const result = await incrementGoal(goalId);
    if (result?.deleted) {
      setLocalGoals((prev) => prev.filter((g) => g.id !== goalId));
    } else {
      setLocalGoals((prev) =>
        prev.map((g) =>
          g.id === goalId ? { ...g, current_count: g.current_count + 1 } : g
        )
      );
    }
    setLoadingGoalId(null);
  };

  const handleDelete = async (goalId: string) => {
    setLoadingGoalId(goalId);
    const result = await deleteGoal(goalId);
    if (!result.error) {
      setLocalGoals((prev) => prev.filter((g) => g.id !== goalId));
    }
    setLoadingGoalId(null);
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoalId(goal.id);
    setEditForm({
      title: goal.title,
      target_count: goal.target_count,
      target_date: goal.target_date || '',
    });
  };

  const handleEditSave = async (goalId: string) => {
    setLoadingGoalId(goalId);
    const result = await editGoal(goalId, editForm);
    if (!result.error) {
      setLocalGoals((prev) => prev.map((g) => g.id === goalId ? { ...g, ...editForm } : g));
      setEditingGoalId(null);
    }
    setLoadingGoalId(null);
  };

  // Only show goals that are not completed
  const activeGoals = localGoals.filter(
    (goal) => goal.current_count < goal.target_count
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Your Goals
        </h2>
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Active Goals</span>
        </div>
      </div>
      {activeGoals && activeGoals.length > 0 ? (
        activeGoals.map((goal) => {
          const progressPercentage = goal.target_count > 0 ? (goal.current_count / goal.target_count) * 100 : 0;
          return (
            <div key={goal.id} className="bg-gradient-to-r from-slate-50 to-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow duration-200">
              {editingGoalId === goal.id ? (
                <div className="mb-3">
                  <input
                    className="mb-2 px-2 py-1 border rounded w-full text-gray-700"
                    value={editForm.title}
                    onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                  />
                  <input
                    className="mb-2 px-2 py-1 border rounded w-full text-gray-700"
                    type="number"
                    value={editForm.target_count}
                    onChange={e => setEditForm(f => ({ ...f, target_count: Number(e.target.value) }))}
                  />
                  <input
                    className="mb-2 px-2 py-1 border rounded w-full text-gray-700"
                    type="date"
                    value={editForm.target_date || ''}
                    onChange={e => setEditForm(f => ({ ...f, target_date: e.target.value }))}
                  />
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={() => handleEditSave(goal.id)} disabled={loadingGoalId === goal.id}>Save</button>
                    <button className="px-3 py-1 bg-gray-300 text-black rounded" onClick={() => setEditingGoalId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 text-lg">{goal.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-slate-600">
                        {goal.current_count} of {goal.target_count} completed
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="text-2xl font-bold text-slate-800">
                      {Math.round(progressPercentage)}%
                    </div>
                    <div className="flex flex-row gap-2 mt-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                        disabled={loadingGoalId === goal.id}
                        onClick={() => handleIncrement(goal.id)}
                      >
                        {loadingGoalId === goal.id ? 'Updating...' : '+1'}
                      </button>
                      <button
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-300"
                        disabled={loadingGoalId === goal.id}
                        onClick={() => handleEdit(goal)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
                        disabled={loadingGoalId === goal.id}
                        onClick={() => handleDelete(goal.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-500`}
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12 px-6 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No Active Goals</h3>
          <p className="text-slate-600 mb-4">Set your next goal to start tracking your progress!</p>
        </div>
      )}
    </div>
  );
} 
import mongoose, { Document, Schema } from 'mongoose'

export interface IGoal extends Document {
    _id: mongoose.Types.ObjectId
    user_id: mongoose.Types.ObjectId
    title: string
    target_count: number
    current_count: number
    target_date?: Date | null
    created_at: Date
}

const GoalSchema = new Schema<IGoal>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    title: { type: String, required: true, trim: true },
    target_count: { type: Number, required: true, min: 1 },
    current_count: { type: Number, default: 0 },
    target_date: { type: Date, default: null },
    created_at: { type: Date, default: Date.now },
})

const Goal = mongoose.models.Goal || mongoose.model<IGoal>('Goal', GoalSchema)
export default Goal

import mongoose, { Document, Schema } from 'mongoose'

export interface IProblem extends Document {
    _id: mongoose.Types.ObjectId
    user_id: mongoose.Types.ObjectId
    title: string
    platform: string
    link?: string
    difficulty?: string
    status?: string
    tags: string[]
    notes?: string
    created_at: Date
}

const ProblemSchema = new Schema<IProblem>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    title: { type: String, required: true, trim: true },
    platform: { type: String, required: true, trim: true },
    link: { type: String, trim: true },
    difficulty: { type: String, trim: true },
    status: { type: String, trim: true },
    tags: { type: [String], default: [] },
    notes: { type: String, trim: true },
    created_at: { type: Date, default: Date.now },
})

const Problem = mongoose.models.Problem || mongoose.model<IProblem>('Problem', ProblemSchema)
export default Problem

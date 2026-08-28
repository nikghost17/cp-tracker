import mongoose, { Document, Schema } from 'mongoose'

export interface IFriend extends Document {
    _id: mongoose.Types.ObjectId
    user_id: mongoose.Types.ObjectId
    nickname: string
    platform: string
    handle: string
    created_at: Date
}

const FriendSchema = new Schema<IFriend>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    nickname: { type: String, required: true, trim: true },
    platform: { type: String, required: true, trim: true },
    handle: { type: String, required: true, trim: true },
    created_at: { type: Date, default: Date.now },
})

// Ensure a user can't add the same handle+platform combo twice
FriendSchema.index({ user_id: 1, platform: 1, handle: 1 }, { unique: true })

const Friend = mongoose.models.Friend || mongoose.model<IFriend>('Friend', FriendSchema)
export default Friend

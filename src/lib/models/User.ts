import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId
    email: string
    password: string
    username?: string
    full_name?: string
    website?: string
    codeforces_handle?: string
    leetcode_handle?: string
    codechef_handle?: string
    created_at: Date
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: { type: String, trim: true },
    full_name: { type: String, trim: true },
    website: { type: String, trim: true },
    codeforces_handle: { type: String, trim: true },
    leetcode_handle: { type: String, trim: true },
    codechef_handle: { type: String, trim: true },
    created_at: { type: Date, default: Date.now },
})

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
export default User

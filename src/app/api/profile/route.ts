import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'

export async function GET() {
    const session = await auth()

    if (!session?.user?.id) {
        return NextResponse.json({ profile: null }, { status: 200 })
    }

    await connectDB()

    const user = await User.findById(session.user.id)
        .select('-password')
        .lean() as any

    if (!user) {
        return NextResponse.json({ profile: null }, { status: 200 })
    }

    const profile = {
        ...user,
        id: user._id.toString(),
        _id: user._id.toString(),
        created_at: user.created_at ? user.created_at.toISOString() : null,
    }

    return NextResponse.json({ profile }, { status: 200 })
}

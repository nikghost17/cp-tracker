import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Goal from '@/lib/models/Goal'

export async function GET() {
    const session = await auth()

    if (!session?.user?.id) {
        return NextResponse.json({ goals: [] }, { status: 200 })
    }

    await connectDB()

    const goals = await Goal.find({ user_id: session.user.id })
        .sort({ target_date: 1 })
        .lean()

    // Serialize _id to string for client consumption
    const serialized = goals.map((g: any) => ({
        ...g,
        id: g._id.toString(),
        _id: g._id.toString(),
        user_id: g.user_id.toString(),
        target_date: g.target_date ? g.target_date.toISOString() : null,
        created_at: g.created_at ? g.created_at.toISOString() : null,
    }))

    return NextResponse.json({ goals: serialized }, { status: 200 })
}

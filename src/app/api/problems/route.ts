import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Problem from '@/lib/models/Problem'

export async function GET() {
    const session = await auth()

    if (!session?.user?.id) {
        return NextResponse.json({ problems: [] }, { status: 200 })
    }

    await connectDB()

    const problems = await Problem.find({ user_id: session.user.id })
        .sort({ created_at: -1 })
        .lean()

    const serialized = problems.map((p: any) => ({
        ...p,
        id: p._id.toString(),
        _id: p._id.toString(),
        user_id: p.user_id.toString(),
        created_at: p.created_at ? p.created_at.toISOString() : null,
    }))

    return NextResponse.json({ problems: serialized }, { status: 200 })
}

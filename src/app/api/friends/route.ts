import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Friend from '@/lib/models/Friend'

// GET /api/friends — fetch friends for current user
export async function GET() {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ friends: [] }, { status: 200 })
    }

    await connectDB()
    const friends = await Friend.find({ user_id: session.user.id })
        .sort({ created_at: -1 })
        .lean()

    const serialized = friends.map((f: any) => ({
        ...f,
        id: f._id.toString(),
        _id: f._id.toString(),
        user_id: f.user_id.toString(),
        created_at: f.created_at ? f.created_at.toISOString() : null,
    }))

    return NextResponse.json({ friends: serialized }, { status: 200 })
}

// POST /api/friends — add a friend
export async function POST(req: NextRequest) {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { nickname, platform, handle } = await req.json()
    if (!handle || !platform) {
        return NextResponse.json({ error: 'Handle and platform are required' }, { status: 400 })
    }

    await connectDB()

    try {
        const friend = await Friend.create({
            user_id: session.user.id,
            nickname: nickname?.trim() || handle,
            platform,
            handle,
        })
        return NextResponse.json({
            friend: {
                ...friend.toObject(),
                id: friend._id.toString(),
                _id: friend._id.toString(),
                user_id: friend.user_id.toString(),
            }
        }, { status: 201 })
    } catch (err: any) {
        if (err.code === 11000) {
            return NextResponse.json({ error: 'This friend is already in your list!' }, { status: 409 })
        }
        return NextResponse.json({ error: 'Failed to save friend' }, { status: 500 })
    }
}

// DELETE /api/friends?id=xxx — remove a friend
export async function DELETE(req: NextRequest) {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = req.nextUrl.searchParams.get('id')
    if (!id) {
        return NextResponse.json({ error: 'Friend ID required' }, { status: 400 })
    }

    await connectDB()
    await Friend.findOneAndDelete({ _id: id, user_id: session.user.id })
    return NextResponse.json({ success: true }, { status: 200 })
}

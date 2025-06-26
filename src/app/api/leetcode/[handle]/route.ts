import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: { handle: string } }
) {
    const handle = params.handle

    if (!handle) {
        return NextResponse.json(
            { error: 'LeetCode handle is required' },
            { status: 400 }
        )
    }

    try {
        const response = await fetch(
            `https://alfa-leetcode-api.onrender.com/userProfile/${handle}`
        )
        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json(
                { error: `Failed to fetch LeetCode data: ${errorData.message || response.statusText}` },
                { status: response.status }
            )
        }
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching LeetCode data:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 
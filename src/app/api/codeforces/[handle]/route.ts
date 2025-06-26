import { NextResponse } from 'next/server'

export async function GET(
    { params }: { params: Promise<{ handle: string }> }
) {
    const handle = (await params).handle

    if (!handle) {
        return NextResponse.json({ error: 'Handle is required' }, { status: 400 })
    }

    try {
        const [userInfoResponse, ratingHistoryResponse] = await Promise.all([
            fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
            fetch(`https://codeforces.com/api/user.rating?handle=${handle}`),
        ]);

        const userInfo = await userInfoResponse.json();
        const ratingHistory = await ratingHistoryResponse.json();

        if (userInfo.status !== 'OK' || ratingHistory.status !== 'OK') {
            return NextResponse.json({ error: 'Failed to fetch data from Codeforces API. The handle might be incorrect.' }, { status: 500 });
        }

        return NextResponse.json({
            userInfo: userInfo.result[0],
            ratingHistory: ratingHistory.result,
        });
    } catch (error) {
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
} 
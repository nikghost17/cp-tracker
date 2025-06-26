import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { handle: string } }
) {
    const handle = params.handle;

    if (!handle) {
        return NextResponse.json({ error: 'CodeChef handle is required' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://codechef-api.vercel.app/${handle}`);
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch CodeChef data.' }, { status: response.status });
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching CodeChef data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 
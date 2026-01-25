import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { resourceId, type } = await req.json();

        if (!resourceId || !['up', 'down'].includes(type)) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        // Get Client IP for bot/duplicate protection
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        const voteKey = `vote:${resourceId}:${ip}`;

        // Check if this IP has already voted for this resource in the last 24 hours
        const alreadyVoted = await kv.get(voteKey);
        if (alreadyVoted) {
            return NextResponse.json({ error: 'You have already voted for this resource' }, { status: 429 });
        }

        // Record the vote
        const countKey = `votes:${resourceId}:${type}`;
        const newCount = await kv.incr(countKey);

        // Mark this IP as voted for 24 hours
        await kv.set(voteKey, true, { ex: 24 * 60 * 60 });

        return NextResponse.json({ resourceId, type, count: newCount });
    } catch (error) {
        console.error('Voting error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        if (!process.env.KV_REST_API_URL) {
            return NextResponse.json({ votes: {} });
        }

        // This is a simplified fetch of all vote counts. 
        // In a real app, you might want to fetch only for the current resources.
        // For simplicity, we fetch all keys matching votes:*
        const keys = await kv.keys('votes:*');
        const counts: Record<string, { upvotes: number, downvotes: number }> = {};

        for (const key of keys) {
            // key format: votes:resourceId:type
            const parts = key.split(':');
            if (parts.length === 3) {
                const resourceId = parts[1];
                const type = parts[2] as 'up' | 'down';
                const count = await kv.get<number>(key) || 0;

                if (!counts[resourceId]) {
                    counts[resourceId] = { upvotes: 0, downvotes: 0 };
                }

                if (type === 'up') counts[resourceId].upvotes = count;
                else counts[resourceId].downvotes = count;
            }
        }

        return NextResponse.json({ votes: counts });
    } catch (error) {
        console.error('Error fetching votes:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

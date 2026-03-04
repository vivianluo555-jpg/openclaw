import { NextResponse } from 'next/server';
import { desc, eq, and } from 'drizzle-orm';

import { db } from '@/core/db';
import { video } from '@/config/db/schema';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const contentCategory = searchParams.get('contentCategory');
    const ipCategory = searchParams.get('ipCategory');
    const styleCategory = searchParams.get('styleCategory');

    const conditions = [];

    if (contentCategory) {
      conditions.push(eq(video.contentCategory, contentCategory));
    }
    if (ipCategory) {
      conditions.push(eq(video.ipCategory, ipCategory));
    }
    if (styleCategory) {
      conditions.push(eq(video.styleCategory, styleCategory));
    }

    const videos = await db()
      .select()
      .from(video)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(video.createdAt));

    return NextResponse.json(videos);
  } catch (error: any) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

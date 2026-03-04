import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '@/core/db';
import { video, videoBreakdown } from '@/config/db/schema';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const videoRecord = await db()
      .select()
      .from(video)
      .where(eq(video.id, id))
      .limit(1)
      .then((res) => res[0]);

    if (!videoRecord) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const breakdownRecord = await db()
      .select()
      .from(videoBreakdown)
      .where(eq(videoBreakdown.videoId, id))
      .limit(1)
      .then((res) => res[0]);

    return NextResponse.json({
      video: videoRecord,
      breakdown: breakdownRecord || null,
    });
  } catch (error: any) {
    console.error('Error fetching video breakdown:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db().delete(videoBreakdown).where(eq(videoBreakdown.videoId, id));
    await db().delete(video).where(eq(video.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting video:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

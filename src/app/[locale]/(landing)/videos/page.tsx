import { Suspense } from 'react';
import { desc, eq, and, like, or } from 'drizzle-orm';
import Link from 'next/link';

import { db } from '@/core/db';
import { video } from '@/config/db/schema';
import { getSignUser } from '@/shared/models/user';
import { AnalyzeVideoModal } from './analyze-video-modal';
import { SidebarFilters } from './components/sidebar-filters';
import { SearchBar } from './components/search-bar';
import { VideoCard } from './components/video-card';

export const revalidate = 0;

export default async function VideosGalleryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ content?: string; ip?: string; style?: string; q?: string }>;
}) {
  const { locale } = await params;
  const { content, ip, style, q } = await searchParams;

  // Check admin access
  const currentUser = await getSignUser();
  const adminEmail = process.env.ADMIN_EMAIL;
  const isAdmin = !!(currentUser && adminEmail && currentUser.email === adminEmail);

  const conditions = [];
  if (content && content !== 'all') conditions.push(eq(video.contentCategory, content));
  if (ip && ip !== 'all') conditions.push(eq(video.ipCategory, ip));
  if (style && style !== 'all') conditions.push(eq(video.styleCategory, style));
  if (q) {
    conditions.push(
      or(
        like(video.title, `%${q}%`),
        like(video.description, `%${q}%`)
      )!
    );
  }

  const videos = await db()
    .select()
    .from(video)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(video.createdAt));

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans flex pt-20">
      {/* Sidebar */}
      <Suspense fallback={null}>
        <SidebarFilters />
      </Suspense>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {locale === 'zh' ? '爆款拆解库' : 'Viral Breakdown Library'}
            </h2>
            <p className="text-black/50 text-sm">
              {locale === 'zh'
                ? '深度分析 YouTube 千万级播放视频的底层逻辑'
                : "Deep analysis of the underlying logic behind YouTube's top viral videos"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Suspense fallback={null}>
              <SearchBar />
            </Suspense>
            {isAdmin && <AnalyzeVideoModal />}
          </div>
        </header>


        {/* Video Grid */}
        {videos.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-black/5">
            <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">
              {locale === 'zh' ? '暂无视频' : 'No Videos'}
            </h3>
            <p className="text-black/40 text-sm">
              {locale === 'zh'
                ? '调整筛选条件，或导入新视频开始分析'
                : 'Adjust the filters or import a new video to start analysis'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {videos.map((vid: any) => (
              <VideoCard
                key={vid.id}
                id={vid.id}
                title={vid.title}
                thumbnailUrl={vid.thumbnailUrl}
                views={vid.views}
                contentCategory={vid.contentCategory}
                ipCategory={vid.ipCategory}
                styleCategory={vid.styleCategory}
                description={vid.description}
                duration={vid.duration}
                locale={locale}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

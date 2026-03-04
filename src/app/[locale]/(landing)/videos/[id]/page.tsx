import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Eye,
  ThumbsUp,
  Zap,
  BookOpen,
  Target,
  Repeat,
  Image as ImageIcon,
  Star,
  PlayCircle,
  Magnet,
  Brain,
  Sparkles,
  Tag,
  BookMarked,
} from 'lucide-react';

import { db } from '@/core/db';
import { video as videoSchema, videoBreakdown as breakdownSchema } from '@/config/db/schema';

export const revalidate = 60;

export default async function VideoBreakdownPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const videoRecord = await db()
    .select()
    .from(videoSchema)
    .where(eq(videoSchema.id, id))
    .limit(1)
    .then((res: any) => res[0]);

  if (!videoRecord) {
    notFound();
  }

  const breakdownRecord = await db()
    .select()
    .from(breakdownSchema)
    .where(eq(breakdownSchema.videoId, id))
    .limit(1)
    .then((res: any) => res[0]);

  const hookElementsData = breakdownRecord?.hookElements ? JSON.parse(breakdownRecord.hookElements) : [];
  const keyTakeawaysData = breakdownRecord?.keyTakeaways ? JSON.parse(breakdownRecord.keyTakeaways) : [];
  const viralElementsData = breakdownRecord?.viralElements ? JSON.parse(breakdownRecord.viralElements) : [];
  const storyStructure: { beginning?: string; conflictAndTurning?: string; ending?: string } | null =
    breakdownRecord?.emotionalCurve ? (() => { try { return JSON.parse(breakdownRecord.emotionalCurve); } catch { return null; } })() : null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number): string => {
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
    return views.toString();
  };

  const replicability = breakdownRecord?.replicability ?? 0;

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 text-sm font-medium text-black/40 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回爆款库
        </Link>
      </div>

      {/* ── TOP SECTION: Video + Meta ── */}
      <div className="max-w-6xl mx-auto px-6 pt-6 pb-0">
        <div className="bg-black rounded-3xl overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row">
            {/* Video Embed — fixed 16:9 */}
            <div className="w-full lg:w-[560px] flex-shrink-0">
              <div className="relative aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoRecord.youtubeId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            {/* Meta info — grows to fill */}
            <div className="flex-1 p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-white text-xl font-bold mb-4 leading-tight">{videoRecord.title}</h1>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-white/50 mb-5">
                  {videoRecord.views != null && (
                    <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{formatViews(videoRecord.views)}</span>
                  )}
                  {videoRecord.likes != null && (
                    <span className="flex items-center gap-1.5"><ThumbsUp className="w-3.5 h-3.5" />{videoRecord.likes.toLocaleString()}</span>
                  )}
                  {videoRecord.duration != null && (
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{formatTime(videoRecord.duration)}</span>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {videoRecord.contentCategory && (
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest border border-white/20 px-2.5 py-1 rounded">
                      {videoRecord.contentCategory === 'format' ? '形式类' : '故事类'}
                    </span>
                  )}
                  {videoRecord.styleCategory && (
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest border border-white/20 px-2.5 py-1 rounded">
                      {videoRecord.styleCategory === 'live_action' ? '真人' : '动画'}
                    </span>
                  )}
                  {videoRecord.ipCategory && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
                      {videoRecord.ipCategory}
                    </span>
                  )}
                </div>

                {/* Description */}
                {videoRecord.description && (
                  <p className="text-sm text-white/40 leading-relaxed mb-5">{videoRecord.description}</p>
                )}
              </div>

              <div className="space-y-3">
                {/* Replicability */}
                {replicability > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">可复制指数</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className={`w-4 h-4 ${n <= replicability ? 'text-emerald-400 fill-emerald-400' : 'text-white/20'}`} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Viral Formula */}
                {breakdownRecord?.viralFormula && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Repeat className="w-3 h-3" /> 爆款公式
                    </p>
                    <p className="text-sm text-emerald-300 font-medium leading-relaxed">{breakdownRecord.viralFormula}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM SECTION: Analysis Grid ── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {breakdownRecord ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Story Structure — full width */}
            {storyStructure && (storyStructure.beginning || storyStructure.conflictAndTurning || storyStructure.ending) && (
              <section className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-black/5">
                <h3 className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                  <BookMarked className="w-3.5 h-3.5 text-indigo-500" /> 故事结构分析
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {storyStructure.beginning && (
                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">① 开端</p>
                      <p className="text-sm leading-relaxed text-indigo-900">{storyStructure.beginning}</p>
                    </div>
                  )}
                  {storyStructure.conflictAndTurning && (
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-2">② 冲突与转折</p>
                      <p className="text-sm leading-relaxed text-orange-900">{storyStructure.conflictAndTurning}</p>
                    </div>
                  )}
                  {storyStructure.ending && (
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">③ 结局</p>
                      <p className="text-sm leading-relaxed text-emerald-900">{storyStructure.ending}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Golden Hook */}
            {breakdownRecord.hook && (
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-black/5">
                <h3 className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Magnet className="w-3.5 h-3.5 text-red-500" /> 黄金开头 · 3秒钩子
                </h3>
                <div className="p-5 bg-red-50 rounded-2xl border border-red-100">
                  <p className="text-sm leading-relaxed text-red-900 font-medium">{breakdownRecord.hook}</p>
                </div>
              </section>
            )}

            {/* Retention Strategy */}
            {breakdownRecord.retentionStrategy && (
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-black/5">
                <h3 className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-blue-500" /> 留存策略
                </h3>
                <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-sm leading-relaxed text-blue-900 whitespace-pre-line">{breakdownRecord.retentionStrategy}</p>
                </div>
              </section>
            )}

            {/* Core Logic */}
            {breakdownRecord.coreLogic && (
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-black/5">
                <h3 className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Brain className="w-3.5 h-3.5 text-purple-500" /> 底层爆火逻辑
                </h3>
                <div className="p-5 bg-purple-50 rounded-2xl border border-purple-100">
                  <p className="text-sm leading-relaxed text-purple-900 whitespace-pre-line">{breakdownRecord.coreLogic}</p>
                </div>
              </section>
            )}

            {/* Viral Element Tags */}
            {viralElementsData.length > 0 && (
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-black/5">
                <h3 className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-pink-500" /> 爆款元素标签
                </h3>
                <div className="flex flex-wrap gap-2">
                  {viralElementsData.map((tag: string, idx: number) => (
                    <span key={idx} className="px-3 py-1.5 bg-black text-white text-xs font-bold rounded-full">{tag}</span>
                  ))}
                </div>
              </section>
            )}

            {/* Hook Elements Timeline — full width */}
            {hookElementsData.length > 0 && (
              <section className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-black/5">
                <h3 className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-orange-500" /> 钩子时间线
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {hookElementsData.map((hook: any, idx: number) => (
                    <div key={idx} className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
                          {formatTime(hook.timestampSeconds)}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider font-bold text-orange-400">{hook.type}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-orange-900 font-medium">{hook.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Takeaways */}
            {keyTakeawaysData.length > 0 && (
              <section className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-black/5">
                <h3 className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-pink-500" /> 核心洞察 · 可学习要点
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {keyTakeawaysData.map((takeaway: string, idx: number) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                      <p className="text-sm leading-relaxed font-medium text-black/80 pt-0.5">{takeaway}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Pacing Analysis */}
            {breakdownRecord.pacingAnalysis && (
              <section className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-black/5">
                <h3 className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-yellow-500" /> 节奏分析
                </h3>
                <p className="text-sm leading-relaxed text-black/70 whitespace-pre-line">{breakdownRecord.pacingAnalysis}</p>
              </section>
            )}

            {/* Video Replication Script (CSV Table) */}
            {breakdownRecord.videoPrompt && (() => {
              // Parse CSV: split rows, split columns, strip surrounding quotes
              const parseCSV = (csv: string) => {
                const rows = csv.trim().split('\n').filter(r => r.trim());
                return rows.map(row => {
                  const cols: string[] = [];
                  let inQuote = false, cur = '';
                  for (let i = 0; i < row.length; i++) {
                    const ch = row[i];
                    if (ch === '"') { inQuote = !inQuote; }
                    else if (ch === ',' && !inQuote) { cols.push(cur); cur = ''; }
                    else { cur += ch; }
                  }
                  cols.push(cur);
                  return cols;
                });
              };
              const rows = parseCSV(breakdownRecord.videoPrompt!);
              if (rows.length < 2) return null;
              const [header, ...dataRows] = rows;
              return (
                <section className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-black/5">
                  <h3 className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-violet-500" /> 逐镜头复刻脚本 · Sora 级导演模板
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-black/8">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-black text-white">
                          {header.map((h, i) => (
                            <th key={i} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border-r border-white/10 last:border-r-0">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dataRows.map((row, ri) => (
                          <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                            {header.map((_, ci) => (
                              <td key={ci} className={`px-4 py-3 align-top border-r border-black/5 last:border-r-0 leading-relaxed text-black/80 ${ci === 0 ? 'text-center font-bold text-black w-12 whitespace-nowrap' : ''}`}>
                                {row[ci] ?? ''}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              );
            })()}


            {/* Full Script */}
            {breakdownRecord.scriptContent && (
              <section className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-black/5">
                <h3 className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <PlayCircle className="w-3.5 h-3.5 text-blue-500" /> 完整脚本
                </h3>
                <div className="bg-gray-50 rounded-2xl p-6 border border-black/5 max-h-[400px] overflow-y-auto">
                  {breakdownRecord.scriptContent.split('\n').map((paragraph: string, i: number) => (
                    <p key={i} className="text-sm text-black/60 leading-loose mb-3">{paragraph}</p>
                  ))}
                </div>
              </section>
            )}

          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-black/5">
            <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-black/20" />
            </div>
            <h3 className="text-xl font-bold mb-2">暂无分析数据</h3>
            <p className="text-black/40 text-sm max-w-md mx-auto">此视频还没有 AI 分析数据，请返回视频库重新提交分析。</p>
          </div>
        )}
      </div>
    </div>
  );
}

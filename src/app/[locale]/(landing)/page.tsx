'use client';

import React from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Zap,
  TrendingUp,
  Filter,
  Clock,
  Repeat,
  Image as ImageIcon,
  Play,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-[10vw] md:text-[7vw] font-black leading-[0.9] tracking-tighter uppercase mb-12">
              The Ultimate <br />
              <span className="text-emerald-500">爆款库</span> <br />
              For Creators.
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1 bg-black text-white text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
                全球领先的内容爆款库
              </div>
              <p className="text-xl md:text-2xl text-black/60 leading-relaxed max-w-xl mb-8">
                欢迎来到{' '}
                <span className="text-black font-bold">HotVault 爆款库</span>
                。我们致力于打造全球最深度、最实用的视频内容爆款库。
                这里不仅是一个素材堆砌地，更是一个深度拆解 YouTube
                千万级播放视频底层逻辑的
                <span className="text-black font-bold">知识爆款库</span>。
              </p>
              <p className="text-lg text-black/50 leading-relaxed max-w-xl mb-12">
                在我们的爆款库中，每一条视频都经过专业团队的深度剖析。我们为你提供可复用的内容公式、精准的情绪曲线分析以及直接可用的
                AI 创作提示词。
                无论你是短视频创作者、营销专家还是品牌主，这个爆款库都将是你捕捉流量密码的终极武器。
              </p>
              <Link href="/videos">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full text-lg font-bold overflow-hidden"
                >
                  <span className="relative z-10">立即开启爆款库</span>
                  <ChevronRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="relative"
            >
              <div className="relative aspect-square md:aspect-[4/5] bg-black rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://picsum.photos/seed/viral-vault/1200/1500"
                  alt="HotVault 爆款库预览"
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/20 mb-8">
                    <Play className="w-8 h-8 fill-white text-white" />
                  </div>
                  <h3 className="text-white text-3xl font-bold mb-4">
                    千万级播放拆解
                  </h3>
                  <p className="text-white/60">实时更新的全球视频爆款库</p>
                </div>
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-black/5 hidden lg:block">
                <div className="flex gap-8">
                  <div>
                    <div className="text-3xl font-black">10,000+</div>
                    <div className="text-xs font-bold text-black/40 uppercase tracking-wider">
                      爆款库案例
                    </div>
                  </div>
                  <div className="w-px h-12 bg-black/10" />
                  <div>
                    <div className="text-3xl font-black">500M+</div>
                    <div className="text-xs font-bold text-black/40 uppercase tracking-wider">
                      总播放覆盖
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Why This 爆款库 */}
      <section id="about" className="px-8 py-32 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-[5vw] font-black tracking-tighter uppercase mb-6">
              为什么选择我们的爆款库？
            </h2>
            <p className="text-xl text-black/50 max-w-2xl">
              市面上有很多素材库，但真正的"爆款库"应该提供的是逻辑而非简单的画面。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '千万级播放爆款库',
                desc: '我们只收录播放量超过 1000 万的顶级案例，确保爆款库中的每一个视频都具有极高的参考价值。',
                icon: TrendingUp,
              },
              {
                title: '深度拆解爆款库',
                desc: '不仅仅是看视频。我们的爆款库为你拆解黄金3秒、留存钩子和底层心理学逻辑。',
                icon: Zap,
              },
              {
                title: 'AI 驱动爆款库',
                desc: '爆款库内置 AI 提示词生成器，将爆款视觉风格转化为可直接使用的 Midjourney 或 Stable Diffusion 提示词。',
                icon: ImageIcon,
              },
              {
                title: '实时更新爆款库',
                desc: '内容趋势瞬息万变。我们的爆款库每日更新，确保你始终掌握全球最新的流量风向标。',
                icon: Clock,
              },
              {
                title: '多维度分类爆款库',
                desc: '根据 IP、风格、内容形式进行精细化分类，让你在爆款库中快速找到最适合自己的创作灵感。',
                icon: Filter,
              },
              {
                title: '实战公式爆款库',
                desc: '我们将复杂的爆款案例浓缩为简单的创作公式，让爆款库真正成为你的创作说明书。',
                icon: Repeat,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-3xl border border-black/5 hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-black/50 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section
        id="methodology"
        className="px-8 py-32 bg-black text-white overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/10 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-[5vw] font-black tracking-tighter uppercase mb-12 leading-none">
                如何使用 <br />
                我们的爆款库？
              </h2>
              <div className="space-y-12">
                {[
                  {
                    step: '01',
                    title: '在爆款库中搜索灵感',
                    desc: '利用我们强大的搜索和筛选功能，在海量爆款库案例中定位你的目标风格。',
                  },
                  {
                    step: '02',
                    title: '研究爆款库拆解报告',
                    desc: '查看视频的底层逻辑、情绪曲线和留存策略，理解它为什么能爆。',
                  },
                  {
                    step: '03',
                    title: '套用爆款库创作公式',
                    desc: '直接复制我们为你总结的复用公式，结合你的内容进行二次创作。',
                  },
                  {
                    step: '04',
                    title: '利用爆款库 AI 提示词',
                    desc: '使用爆款库提供的提示词，快速生成高质量的视觉素材。',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8">
                    <span className="text-4xl font-black text-emerald-500 opacity-50">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-white/40 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] bg-white/5 rounded-3xl border border-white/10 p-8 backdrop-blur-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-6">
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                  <div className="h-4 w-1/2 bg-white/10 rounded" />
                  <div className="h-32 w-full bg-emerald-500/20 rounded-2xl border border-emerald-500/30 flex items-center justify-center">
                    <span className="text-emerald-500 font-bold">
                      爆款库核心公式展示区
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/5 rounded" />
                    <div className="h-2 w-full bg-white/5 rounded" />
                    <div className="h-2 w-2/3 bg-white/5 rounded" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500 blur-[100px] opacity-20" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 blur-[100px] opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-40 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
            准备好进入 <br />
            这个流量爆款库了吗？
          </h2>
          <p className="text-xl text-black/50 mb-12 leading-relaxed">
            加入数千名创作者的行列，利用我们的爆款库停止盲目创作，开始有逻辑地生产爆款内容。
            这是你离千万播放最近的一次机会。
          </p>
          <Link href="/videos">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-emerald-500/20 transition-all"
            >
              立即免费开启爆款库
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}

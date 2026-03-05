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
import { useLocale } from 'next-intl';

const content = {
  en: {
    badge: "World's #1 Viral Content Library",
    heroDesc1: (
      <>
        Welcome to{' '}
        <span className="text-black font-bold">HotVault</span>. We&apos;re
        dedicated to building the world&apos;s most in-depth and actionable
        viral video library. This is not just a collection of clips — it&apos;s
        a knowledge base that deeply dissects the underlying logic of YouTube
        videos with tens of millions of views.
      </>
    ),
    heroDesc2:
      "Every video in our library has been professionally analyzed. We provide reusable content formulas, precise emotional arc analysis, and ready-to-use AI creative prompts. Whether you're a short-form creator, marketing expert, or brand owner, HotVault is your ultimate weapon for cracking the viral code.",
    heroCta: 'Explore HotVault',
    heroImageTitle: '10M+ View Breakdowns',
    heroImageSub: 'Real-time updated global viral library',
    statLabel1: 'Viral Cases',
    statLabel2: 'Total Views Covered',
    whyTitle: 'Why Choose HotVault?',
    whySub:
      "There are many asset libraries out there, but a true viral library should provide logic, not just clips.",
    features: [
      {
        title: '10M+ View Case Library',
        desc: 'We only curate top cases with over 10 million views, ensuring every video has exceptional reference value.',
        icon: TrendingUp,
      },
      {
        title: 'Deep-Dive Analysis Library',
        desc: 'More than just watching. We break down the golden 3 seconds, retention hooks, and underlying psychology of each viral video.',
        icon: Zap,
      },
      {
        title: 'AI-Powered Library',
        desc: 'Built-in AI prompt generator converts viral visual styles into ready-to-use Midjourney or Stable Diffusion prompts.',
        icon: ImageIcon,
      },
      {
        title: 'Real-Time Updated Library',
        desc: 'Content trends change fast. Our library is updated daily so you always have the latest global viral benchmarks.',
        icon: Clock,
      },
      {
        title: 'Multi-Dimension Categories',
        desc: 'Organized by IP, style, and content format for fast discovery of the perfect creative inspiration.',
        icon: Filter,
      },
      {
        title: 'Battle-Tested Formula Library',
        desc: 'We distill complex viral cases into simple creation formulas — your ultimate creator&apos;s playbook.',
        icon: Repeat,
      },
    ],
    howTitle: 'How to Use HotVault?',
    steps: [
      {
        step: '01',
        title: 'Search for Inspiration',
        desc: 'Use our powerful search and filters to pinpoint your target style among thousands of viral case studies.',
      },
      {
        step: '02',
        title: 'Study the Breakdown Reports',
        desc: 'Review the underlying logic, emotional arc, and retention strategies to understand exactly why it went viral.',
      },
      {
        step: '03',
        title: 'Apply the Content Formulas',
        desc: 'Copy the reusable formulas we&apos;ve summarized and apply them to your own content for maximum impact.',
      },
      {
        step: '04',
        title: 'Use the AI Prompt Generator',
        desc: 'Use the AI prompts from HotVault to quickly generate high-quality visual assets for your creations.',
      },
    ],
    demoLabel: 'Core Formula Preview',
    ctaTitle: (
      <>
        Ready to Enter <br />
        the Viral Library?
      </>
    ),
    ctaDesc:
      'Join thousands of creators using HotVault to stop guessing and start producing viral content with strategy. This is your closest shot at 10 million views.',
    ctaCta: 'Start for Free',
  },
  zh: {
    badge: '全球领先的内容爆款库',
    heroDesc1: (
      <>
        欢迎来到{' '}
        <span className="text-black font-bold">HotVault 爆款库</span>
        。我们致力于打造全球最深度、最实用的视频内容爆款库。
        这里不仅是一个素材堆砌地，更是一个深度拆解 YouTube
        千万级播放视频底层逻辑的
        <span className="text-black font-bold">知识爆款库</span>。
      </>
    ),
    heroDesc2:
      '在我们的爆款库中，每一条视频都经过专业团队的深度剖析。我们为你提供可复用的内容公式、精准的情绪曲线分析以及直接可用的 AI 创作提示词。无论你是短视频创作者、营销专家还是品牌主，这个爆款库都将是你捕捉流量密码的终极武器。',
    heroCta: '立即开启爆款库',
    heroImageTitle: '千万级播放拆解',
    heroImageSub: '实时更新的全球视频爆款库',
    statLabel1: '爆款库案例',
    statLabel2: '总播放覆盖',
    whyTitle: '为什么选择我们的爆款库？',
    whySub: '市面上有很多素材库，但真正的"爆款库"应该提供的是逻辑而非简单的画面。',
    features: [
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
    ],
    howTitle: '如何使用我们的爆款库？',
    steps: [
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
    ],
    demoLabel: '爆款库核心公式展示区',
    ctaTitle: (
      <>
        准备好进入 <br />
        这个流量爆款库了吗？
      </>
    ),
    ctaDesc:
      '加入数千名创作者的行列，利用我们的爆款库停止盲目创作，开始有逻辑地生产爆款内容。这是你离千万播放最近的一次机会。',
    ctaCta: '立即免费开启爆款库',
  },
};

export default function HomePage() {
  const locale = useLocale();
  const t = content[locale as keyof typeof content] ?? content.en;

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
                {t.badge}
              </div>
              <p className="text-xl md:text-2xl text-black/60 leading-relaxed max-w-xl mb-8">
                {t.heroDesc1}
              </p>
              <p className="text-lg text-black/50 leading-relaxed max-w-xl mb-12">
                {t.heroDesc2}
              </p>
              <Link href="/videos">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full text-lg font-bold overflow-hidden"
                >
                  <span className="relative z-10">{t.heroCta}</span>
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
                  alt="HotVault Preview"
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/20 mb-8">
                    <Play className="w-8 h-8 fill-white text-white" />
                  </div>
                  <h3 className="text-white text-3xl font-bold mb-4">
                    {t.heroImageTitle}
                  </h3>
                  <p className="text-white/60">{t.heroImageSub}</p>
                </div>
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-black/5 hidden lg:block">
                <div className="flex gap-8">
                  <div>
                    <div className="text-3xl font-black">10,000+</div>
                    <div className="text-xs font-bold text-black/40 uppercase tracking-wider">
                      {t.statLabel1}
                    </div>
                  </div>
                  <div className="w-px h-12 bg-black/10" />
                  <div>
                    <div className="text-3xl font-black">500M+</div>
                    <div className="text-xs font-bold text-black/40 uppercase tracking-wider">
                      {t.statLabel2}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Why This Library */}
      <section id="about" className="px-8 py-32 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-[5vw] font-black tracking-tighter uppercase mb-6">
              {t.whyTitle}
            </h2>
            <p className="text-xl text-black/50 max-w-2xl">{t.whySub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.map((item, i) => (
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
                {t.howTitle}
              </h2>
              <div className="space-y-12">
                {t.steps.map((item, i) => (
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
                      {t.demoLabel}
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
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-black/50 mb-12 leading-relaxed">
            {t.ctaDesc}
          </p>
          <Link href="/videos">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-emerald-500/20 transition-all"
            >
              {t.ctaCta}
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}

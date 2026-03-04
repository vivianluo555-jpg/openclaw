import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { YoutubeTranscript } from 'youtube-transcript';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/core/db';
import { user, video, videoBreakdown } from '@/config/db/schema';
import { getSignUser } from '@/shared/models/user';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


const AnalysisSchema = z.object({
  title: z.string(),
  description: z.string(),
  contentCategory: z.enum(['format', 'story']),
  ipCategory: z.enum(['kpop', 'celebrity', 'naruto', 'anime', 'other']).nullable(),
  styleCategory: z.enum(['live_action', 'animation']).nullable(),
  keyTakeaways: z.array(z.string()),
  hookElements: z.array(z.object({
    timestampSeconds: z.number(),
    description: z.string(),
    type: z.string()
  })),
  storyStructure: z.object({
    beginning: z.string(),
    conflictAndTurning: z.string(),
    ending: z.string(),
  }),
  pacingAnalysis: z.string(),
  // Hotvault-specific fields
  hook: z.string(),
  retentionStrategy: z.string(),
  coreLogic: z.string(),
  viralFormula: z.string(),
  replicability: z.number().min(1).max(5).int(),
  viralElements: z.array(z.string()),
  imagePrompt: z.string(),
  videoPrompt: z.string(),
});

export async function POST(req: Request) {
  try {
    // Admin-only guard
    const currentUser = await getSignUser();
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!currentUser || !adminEmail || currentUser.email !== adminEmail) {
      return NextResponse.json({ error: '无权限：仅管理员可分析视频' }, { status: 403 });
    }

    const { youtubeUrl } = await req.json();

    if (!youtubeUrl) {
      return NextResponse.json({ error: 'YouTube URL is required' }, { status: 400 });
    }

    // 1. Extract Video ID
    const urlObj = new URL(youtubeUrl);
    let videoId = urlObj.searchParams.get('v');
    if (!videoId && urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
    }
    // Handle shorts
    if (!videoId && urlObj.pathname.startsWith('/shorts/')) {
      videoId = urlObj.pathname.replace('/shorts/', '');
    }

    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    // Check for duplicate
    const existing = await db().select().from(video).where(eq(video.youtubeId, videoId)).limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ error: '该视频已存在于库中', videoId: existing[0].id }, { status: 409 });
    }

    // 2. Fetch Transcript (supplementary only, not required)
    let transcriptText = '';
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      transcriptText = transcript.map(t => t.text).join(' ');
    } catch (e) {
      console.warn('Could not fetch transcript for video:', videoId);
    }

    const transcriptSection = transcriptText
      ? `\n\n补充参考——视频字幕文本：\n"""\n${transcriptText.substring(0, 30000)}\n"""`
      : '';

    // 3. Prompt Gemini with the YouTube video directly (Gemini natively understands video)
    const prompt = `你是一个专业的 YouTube 爆款视频分析师，擅长分析中文和英文内容。

请仔细观看上面这段 YouTube 视频，深度分析其内容，提取以下所有信息，**所有文字内容必须用中文输出**：${transcriptSection}

---

分析维度：

1. **基础信息**：生成标题和摘要
2. **分类**：
   - contentCategory: 'format'（形式类，以形式取胜）或 'story'（故事类，以情节取胜）
   - ipCategory: 'kpop'/'celebrity'/'naruto'/'anime'/'other'，若无明确 IP 则为 null
   - styleCategory: 'live_action'（真人）/'animation'（动画），若无法判断则为 null
3. **钩子分析** (hookElements)：列出视频各时间点的留存钩子，包含时间戳（秒）、描述、类型（visual/audio/text/pattern_interrupt）
4. **故事结构** (storyStructure)：用三部分分析视频叙事结构：
   - beginning（开端）：视频如何建立场景、引出主题
   - conflictAndTurning（冲突与转折）：核心矛盾是什么、关键转折点在哪里
   - ending（结局）：如何收尾、给观众留下什么情绪或信息
5. **节奏分析** (pacingAnalysis)：300字以内描述视频整体节奏特点
6. **关键收获** (keyTakeaways)：5-7 条创作者可学习的要点
7. **黄金开头** (hook)：描述视频前 3 秒的黄金钩子，说明为何能吸引观众不滑走
8. **留存策略** (retentionStrategy)：分析视频如何持续留住观众，使用了哪些万能留存技巧
9. **底层逻辑** (coreLogic)：分析这个视频为什么能爆火，底层驱动力是什么（好奇心/共鸣/社交货币等）
10. **爆款公式** (viralFormula)：将此视频的成功提炼成一个可复用的内容公式模板
11. **可复制指数** (replicability)：1-5 分评估此视频风格对普通创作者的可复制程度
12. **爆款元素标签** (viralElements)：抽取 4-8 个关键爆款元素标签（如：反转结局、情感共鸣、高信息密度）
13. **图片生成提示词** (imagePrompt)：生成一段可用于 Midjourney/Stable Diffusion 的英文提示词，描述此视频的视觉风格
14. **视频生成提示词** (videoPrompt)：生成一段可用于 AI 视频生成工具的英文提示词，描述此视频的运镜和风格

仅返回以下格式的 JSON，不要包含任何其他内容：
{
  "title": "生成的吸引人标题",
  "description": "视频摘要（100字以内）",
  "contentCategory": "format",
  "ipCategory": null,
  "styleCategory": "live_action",
  "keyTakeaways": ["要点1", "要点2", "要点3", "要点4", "要点5"],
  "hookElements": [{"timestampSeconds": 0, "description": "开场钩子描述", "type": "visual"}],
  "storyStructure": {
    "beginning": "开端分析...",
    "conflictAndTurning": "冲突与转折分析...",
    "ending": "结局分析..."
  },
  "pacingAnalysis": "节奏分析文字",
  "hook": "黄金开头3秒分析",
  "retentionStrategy": "留存策略分析",
  "coreLogic": "底层逻辑分析",
  "viralFormula": "可复用内容公式：[XXX] + [YYY] = 爆款",
  "replicability": 4,
  "viralElements": ["反转结局", "情感共鸣"],
  "imagePrompt": "cinematic, viral style, ...",
  "videoPrompt": "smooth camera movement, ..."
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          parts: [
            {
              fileData: {
                mimeType: 'video/mp4',
                fileUri: `https://www.youtube.com/watch?v=${videoId}`,
              },
            },
            { text: prompt },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
      },
    });

    const resultText = response.text || '{}';
    let analysisData: any;
    try {
      analysisData = JSON.parse(resultText);
    } catch {
      throw new Error('Gemini returned invalid JSON. Raw: ' + resultText.substring(0, 200));
    }

    // Validate output format
    const parsedData = AnalysisSchema.parse(analysisData);

    // 4b. Generate shot-by-shot CSV video replication script (Sora Director Template)
    const directorSystemPrompt = `你是一个具备极致视频解析与视觉还原能力的专家（Sora级视频全能解析与复刻导演 v8.0）。
你的任务是将 YouTube 视频转化为一份高精度的逐镜头视频生成脚本。不需要任何改编，直接输出 CSV。

核心工作原则：
[!!!] 铁律零：单一镜头原则 —— 一个镜头 = 摄影机从开启到录制停止。严禁将同一机位内的连续动作拆分为多行。
[!!!] 铁律一：起幅画面原则 —— 图片提示词只描述镜头的第一帧静态画面，使用"处于...姿态"句式。
铁律二：视角（平视/仰视/俯视/鸟瞰）与景别（远景/全景/中景/近景/特写）必须明确标注。
铁律三：表情限选 —— 开心 / 无奈 / 兴奋 / 愤怒 / 烦躁 / 悲伤 / 失落 / 惊讶 / 惊恐 / 震惊。
铁律四：视频提示词必须包含 [核心画面] + [主体动作多段变化] + [环境动态] + [镜头运动]。
铁律五：多段动作链 —— 必须描述时间顺序上的多个动作（如：A先看向B，随后B拿出道具，A见状露出惊恐表情并后退）。
铁律六：每条视频提示词结尾必须加："视频画面连贯，流畅，符合现实运动规则，不要出现其他角色。"
角色命名：首次出现使用"名称(视觉特征详细描述)"，后续镜头必须一字不差完整复用该标识。
环境描述必须包含：物理空间（材质、反光度）、光照（色温、对比度）、3个以上标志性道具。
目标画面风格：极致超写实主义，顶级数码单反相机质感，8K分辨率，自然色彩。

输出格式：严格 CSV，用 Markdown 代码块(csv)包裹，英文逗号分隔，每个单元格用英文双引号包裹。
表头："镜号","图片提示词 (静态起幅)","视频提示词 (动态指令)","对白/音频"
`;

    let videoScriptCsv = '';
    try {
      const scriptResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            parts: [
              {
                fileData: {
                  mimeType: 'video/mp4',
                  fileUri: `https://www.youtube.com/watch?v=${videoId}`,
                },
              },
              { text: directorSystemPrompt + '\n\n请立即为此视频生成完整的逐镜头 CSV 复刻脚本。' },
            ],
          },
        ],
      });
      const rawScript = scriptResponse.text || '';
      // Extract CSV block from markdown code fence
      const csvMatch = rawScript.match(/```csv\n([\s\S]*?)```/);
      videoScriptCsv = csvMatch ? csvMatch[1].trim() : rawScript.trim();
    } catch (e) {
      console.warn('Video script generation failed, skipping:', e);
    }

    // 4. Save to Database
    // Ensure a system user exists (to satisfy FK constraint without requiring login)
    const SYSTEM_USER_ID = 'hotvault-system-user';
    const existingUser = await db().select().from(user).where(eq(user.id, SYSTEM_USER_ID)).limit(1);
    if (existingUser.length === 0) {
      await db().insert(user).values({
        id: SYSTEM_USER_ID,
        name: 'HotVault System',
        email: 'system@hotvault.app',
        emailVerified: true,
      });
    }

    const newVideoId = crypto.randomUUID();
    await db().insert(video).values({
      id: newVideoId,
      youtubeId: videoId,
      userId: SYSTEM_USER_ID,
      title: parsedData.title,
      description: parsedData.description,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      contentCategory: parsedData.contentCategory,
      ipCategory: parsedData.ipCategory,
      styleCategory: parsedData.styleCategory,
      status: 'published',
    });

    await db().insert(videoBreakdown).values({
      id: crypto.randomUUID(),
      videoId: newVideoId,
      scriptContent: transcriptText || null,
      hookElements: JSON.stringify(parsedData.hookElements),
      emotionalCurve: JSON.stringify(parsedData.storyStructure),
      pacingAnalysis: parsedData.pacingAnalysis,
      keyTakeaways: JSON.stringify(parsedData.keyTakeaways),
      // Hotvault-specific fields
      hook: parsedData.hook,
      retentionStrategy: parsedData.retentionStrategy,
      coreLogic: parsedData.coreLogic,
      viralFormula: parsedData.viralFormula,
      replicability: parsedData.replicability,
      viralElements: JSON.stringify(parsedData.viralElements),
      imagePrompt: parsedData.imagePrompt,
      videoPrompt: videoScriptCsv || parsedData.videoPrompt,
    });

    return NextResponse.json({ success: true, videoId: newVideoId, data: parsedData });

  } catch (error: any) {
    console.error('Error analyzing video:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

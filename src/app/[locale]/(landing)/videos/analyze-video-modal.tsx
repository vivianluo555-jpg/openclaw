"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

export function AnalyzeVideoModal(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const locale = useLocale();
  const isZh = locale === 'zh';

  const handleAnalyze = async () => {
    if (!url) {
      setError("Please enter a YouTube URL");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("/api/videos/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtubeUrl: url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze video");
      }

      setOpen(false);
      setUrl("");
      // Redirect to the new video's detail page
      router.push(`/videos/${data.videoId}`);
      router.refresh();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Analyze New Video
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isZh ? '分析 YouTube 爆款视频' : 'Analyze YouTube Viral Video'}
          </DialogTitle>
          <DialogDescription>
            {isZh
              ? '输入 YouTube 视频链接，Gemini 2.5 Flash 将自动提取字幕，生成黄金钩子、情绪曲线、留存策略、爆款公式等深度分析。'
              : 'Enter a YouTube URL. Gemini 2.5 Flash will automatically extract the transcript and generate deep analysis including golden hooks, emotional arc, retention strategies, and viral formulas.'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <Input
              id="youtube-url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
            {error && <p className="text-sm text-destructive font-medium">{error}</p>}
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="button" onClick={handleAnalyze} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing (Takes ~10s)...
              </>
            ) : (
              "Start Analysis"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

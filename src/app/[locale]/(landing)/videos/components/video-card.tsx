import React from "react";
import Link from "next/link";
import { Play, Star } from "lucide-react";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnailUrl?: string | null;
  views?: number | null;
  contentCategory?: string | null;
  ipCategory?: string | null;
  styleCategory?: string | null;
  description?: string | null;
  duration?: number | null;
}

function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  return views.toString();
}

export function VideoCard({
  id,
  title,
  thumbnailUrl,
  views,
  contentCategory,
  ipCategory,
  styleCategory,
  description,
  duration,
}: VideoCardProps) {
  return (
    <Link href={`/videos/${id}`}>
      <div className="group bg-white rounded-2xl border border-black/5 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
        {/* Thumbnail */}
        <div className="aspect-video relative overflow-hidden bg-gray-100">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-sm">
              No Thumbnail
            </div>
          )}
          {/* Views Badge */}
          {views != null && views > 0 && (
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
              {formatViews(views)} Views
            </div>
          )}
          {/* Duration Badge */}
          {duration != null && duration > 0 && (
            <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white px-2 py-0.5 rounded text-xs font-medium">
              {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, "0")}
            </div>
          )}
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-5 h-5 fill-black text-black" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-2 flex-wrap">
              {contentCategory && (
                <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest border border-black/10 px-2 py-0.5 rounded">
                  {contentCategory === "format" ? "形式" : "故事"}
                </span>
              )}
              {styleCategory && (
                <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest border border-black/10 px-2 py-0.5 rounded">
                  {styleCategory === "live_action" ? "真人" : "动画"}
                </span>
              )}
            </div>
            {ipCategory && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                {ipCategory}
              </span>
            )}
          </div>
          <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-black transition-colors line-clamp-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-black/50 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

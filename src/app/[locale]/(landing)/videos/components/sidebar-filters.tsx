"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Layers, MonitorPlay, Flame, Zap } from "lucide-react";
import { cn } from "@/shared/lib/utils";

function FilterSection({
  title,
  icon: Icon,
  items,
  paramKey,
  currentValue,
  buildUrl,
}: {
  title: string;
  icon: React.ElementType;
  items: { value: string; label: string }[];
  paramKey: string;
  currentValue: string;
  buildUrl: (key: string, value: string) => string;
}) {
  return (
    <section>
      <h2 className="text-[11px] font-semibold text-black/40 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Icon className="w-3 h-3" /> {title}
      </h2>
      <div className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.value}
            href={buildUrl(paramKey, item.value)}
            className={cn(
              "block w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
              currentValue === item.value
                ? "bg-black text-white"
                : "hover:bg-black/5 text-black/70"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SidebarFilters() {
  const searchParams = useSearchParams();
  const content = searchParams.get("content") || "all";
  const ip = searchParams.get("ip") || "all";
  const style = searchParams.get("style") || "all";
  const search = searchParams.get("q") || "";

  const buildUrl = (key: string, value: string) => {
    const sp = new URLSearchParams();
    if (content && content !== "all") sp.set("content", content);
    if (ip && ip !== "all") sp.set("ip", ip);
    if (style && style !== "all") sp.set("style", style);
    if (search) sp.set("q", search);

    if (value === "all") {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }
    const qs = sp.toString();
    return `/videos${qs ? `?${qs}` : ""}`;
  };

  const contentTypes = [
    { value: "all", label: "全部形式" },
    { value: "format", label: "形式类" },
    { value: "story", label: "故事类" },
  ];

  const styleTypes = [
    { value: "all", label: "全部风格" },
    { value: "live_action", label: "真人" },
    { value: "animation", label: "动画" },
  ];

  const ipCategories = [
    { value: "all", label: "全部 IP" },
    { value: "kpop", label: "K-Pop" },
    { value: "celebrity", label: "Celebrity" },
    { value: "naruto", label: "Naruto" },
    { value: "anime", label: "Anime" },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-black/5 bg-white p-6 flex flex-col gap-8 sticky top-0 h-screen overflow-y-auto hidden lg:flex">
      {/* 筛选项从顶部开始，无需重复 logo */}

      <FilterSection
        title="内容形式"
        icon={Layers}
        items={contentTypes}
        paramKey="content"
        currentValue={content}
        buildUrl={buildUrl}
      />

      <FilterSection
        title="风格分类"
        icon={MonitorPlay}
        items={styleTypes}
        paramKey="style"
        currentValue={style}
        buildUrl={buildUrl}
      />

      <FilterSection
        title="热门 IP"
        icon={Flame}
        items={ipCategories}
        paramKey="ip"
        currentValue={ip}
        buildUrl={buildUrl}
      />
    </aside>
  );
}

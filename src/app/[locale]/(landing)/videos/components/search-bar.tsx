"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useLocale } from "next-intl";

export function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const sp = new URLSearchParams(searchParams.toString());
      if (query) {
        sp.set("q", query);
      } else {
        sp.delete("q");
      }
      const qs = sp.toString();
      router.push(`/videos${qs ? `?${qs}` : ""}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
      <input
        type="text"
        placeholder={locale === 'zh' ? '搜索爆款元素、逻辑...' : 'Search viral elements, logic...'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-all placeholder:text-black/30"
      />
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import type { App } from "@/data/apps";
import { articles } from "@/data/articles";
import { playClick } from "@/lib/sounds";

interface SidebarProps {
  apps: App[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ apps, selectedId, onSelect }: SidebarProps) {
  return (
    <aside className="shrink-0 flex flex-col gap-4">
      <p className="text-base font-medium tracking-tight text-black">
        before
      </p>
      <div className="flex flex-col gap-3">
        <p className="text-[10px] font-medium tracking-tight text-[#a1a1a1]">
          Applications
        </p>
        <nav className="flex flex-col">
          {apps.map((app) => {
            const isActive = app.id === selectedId;
            return (
              <button
                key={app.id}
                onClick={() => {
                  playClick();
                  onSelect(app.id);
                }}
                className="sidebar-item flex items-center gap-2 text-left min-h-11 -mx-1.5 px-1.5 rounded-lg"
              >
                <div className="relative squircle-sm shrink-0 size-6 overflow-hidden">
                  <Image
                    src={app.icon}
                    alt={app.name}
                    fill
                    className="object-cover"
                    sizes="24px"
                    unoptimized
                  />
                </div>
                <p
                  className={`text-base font-medium tracking-tight whitespace-nowrap transition-colors duration-150 ease ${
                    isActive ? "text-black" : "text-[#a1a1a1]"
                  }`}
                >
                  {app.id === "family" ? "family" : app.name}
                </p>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-medium tracking-tight text-[#a1a1a1]">
          Insights
        </p>
        <nav className="flex flex-col">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="sidebar-item flex items-center gap-2 text-left min-h-9 -mx-1.5 px-1.5 rounded-lg"
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="article-icon shrink-0"
                aria-hidden="true"
              >
                <circle className="article-icon-dot" cx="4.75" cy="4.75" r="2.75" fill="#A1A1A1" />
                <path className="article-icon-line1" fillRule="evenodd" clipRule="evenodd" d="M2 11.75C2 11.3358 2.33579 11 2.75 11H15.25C15.6642 11 16 11.3358 16 11.75C16 12.1642 15.6642 12.5 15.25 12.5H2.75C2.33579 12.5 2 12.1642 2 11.75Z" fill="#A1A1A1" fillOpacity="0.4" />
                <path className="article-icon-line2" fillRule="evenodd" clipRule="evenodd" d="M2 15.25C2 14.8358 2.33579 14.5 2.75 14.5H9.25C9.66421 14.5 10 14.8358 10 15.25C10 15.6642 9.66421 16 9.25 16H2.75C2.33579 16 2 15.6642 2 15.25Z" fill="#A1A1A1" fillOpacity="0.4" />
              </svg>
              <p className="text-base font-medium tracking-tight whitespace-nowrap text-[#a1a1a1] hover:text-black transition-colors duration-150 ease">
                {article.title.length > 20
                  ? article.title.split(":")[0]
                  : article.title}
              </p>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

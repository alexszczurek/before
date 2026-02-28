"use client";

import { useState, useEffect } from "react";

interface Section {
  id: string;
  title: string;
}

interface ArticleSidebarProps {
  sections: Section[];
}

export default function ArticleSidebar({ sections }: ArticleSidebarProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that's intersecting (visible)
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="flex flex-col gap-2">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(section.id)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className={`text-[13px] leading-snug transition-colors duration-150 ${
            activeId === section.id
              ? "text-black font-medium"
              : "text-[#b0b0b0] hover:text-[#666]"
          }`}
        >
          {section.title}
        </a>
      ))}
    </nav>
  );
}

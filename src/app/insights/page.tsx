import Link from "next/link";
import { articles } from "@/data/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "insights — before",
  description: "Insights about the App Store, ASO, and app design.",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[680px] mx-auto px-6 py-16 md:py-24">
        <header className="mb-16">
          <Link
            href="/"
            className="text-[13px] font-medium text-[#a1a1a1] hover:text-black transition-colors"
          >
            before
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-black mt-6">
            Insights
          </h1>
        </header>

        <div className="flex flex-col gap-1">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="group flex items-baseline justify-between gap-4 py-3 -mx-3 px-3 rounded-lg hover:bg-[#fafafa] transition-colors"
            >
              <span className="text-[15px] font-medium tracking-tight text-black group-hover:text-black">
                {article.title}
              </span>
              <time className="text-[13px] text-[#a1a1a1] shrink-0 tabular-nums">
                {formatDate(article.date)}
              </time>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

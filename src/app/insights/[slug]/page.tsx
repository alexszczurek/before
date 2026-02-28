import Link from "next/link";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import ArticleRenderer from "@/components/ArticleRenderer";
import { extractSections } from "@/lib/articles";
import ArticleSidebar from "@/components/ArticleSidebar";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} — before`,
    description: article.content.slice(0, 160).trim(),
  };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  const sections = extractSections(article.content);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-24">
        {/* Mobile back link */}
        <div className="lg:hidden mb-8">
          <Link
            href="/"
            className="text-[13px] font-medium text-[#a1a1a1] hover:text-black transition-colors"
          >
            &larr; home
          </Link>
        </div>

        <div className="flex gap-16">
          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-[200px] shrink-0">
            <div className="sticky top-24">
              <Link
                href="/"
                className="text-[13px] font-medium text-[#a1a1a1] hover:text-black transition-colors"
              >
                &larr; home
              </Link>
              <div className="mt-10">
                <ArticleSidebar sections={sections} />
              </div>
            </div>
          </aside>

          {/* Article content */}
          <article className="min-w-0 max-w-[680px]">
            <header className="mb-12">
              <h1 className="text-[32px] md:text-[36px] font-semibold tracking-tight leading-[1.15] text-black">
                {article.title}
              </h1>
              <time className="block text-[13px] text-[#a1a1a1] mt-3">
                {formatDate(article.date)}
              </time>
            </header>

            <ArticleRenderer content={article.content} />
          </article>
        </div>
      </div>
    </div>
  );
}

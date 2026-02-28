"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const components: Components = {
  h2: ({ children }) => {
    const text = typeof children === "string" ? children : extractText(children);
    const id = slugify(text);
    return (
      <h2
        id={id}
        className="text-[22px] font-semibold tracking-tight text-black mt-14 mb-4 scroll-mt-24"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold tracking-tight text-black mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[15px] leading-[1.8] text-[#444] mb-5">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-black">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-black underline decoration-[#ccc] underline-offset-[3px] hover:decoration-black transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="text-[15px] leading-[1.8] text-[#444] mb-5 pl-5 list-disc marker:text-[#ccc]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-[15px] leading-[1.8] text-[#444] mb-5 pl-5 list-decimal marker:text-[#999]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="mb-1.5 pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[#e5e5e5] pl-5 my-6 text-[#666]">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="text-[13px] leading-relaxed">{children}</code>
      );
    }
    return (
      <code className="text-[13.5px] font-mono bg-[#f5f5f5] text-[#333] px-1.5 py-0.5 rounded">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-[#f5f5f5] rounded-lg p-5 my-6 overflow-x-auto font-mono">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-none h-px bg-[#e5e5e5] my-12" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-[14px] text-[#444]">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-[#e5e5e5] text-left text-black">
      {children}
    </thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-[#f0f0f0]">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="py-2.5 pr-4 font-semibold text-[13px] tracking-wide">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-2.5 pr-4 leading-relaxed">{children}</td>
  ),
};

// Extract plain text from React children (for generating heading IDs)
function extractText(node: unknown): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: unknown } }).props;
    if (props?.children) return extractText(props.children);
  }
  return "";
}

interface ArticleRendererProps {
  content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}


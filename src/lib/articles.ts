function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function extractSections(
  content: string
): { id: string; title: string }[] {
  const lines = content.split("\n");
  const sections: { id: string; title: string }[] = [];

  for (const line of lines) {
    const match = line.match(/^## (.+)$/);
    if (match) {
      const title = match[1].trim();
      sections.push({ id: slugify(title), title });
    }
  }

  return sections;
}

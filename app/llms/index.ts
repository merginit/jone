import { source } from '@/lib/source';

export async function loader() {
  const lines: string[] = [];
  lines.push('# Jone Documentation');
  lines.push('');
  for (const page of source.getPages()) {
    lines.push(`- [${page.data.title}](${page.url}): ${page.data.description}`);
  }
  return new Response(lines.join('\n'));
}

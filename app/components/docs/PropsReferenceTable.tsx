import type { ReactNode } from 'react';

interface PropsReferenceTableProps {
  data: Record<string, { type: string; description: string; default?: string }>;
  type?: 'return' | 'props';
}

export function PropsReferenceTable({ data, type = 'props' }: PropsReferenceTableProps) {
  if (!data || Object.keys(data).length === 0) return null;

  return (
    <div className="not-prose flex flex-col gap-4">
      <div className="relative w-full overflow-auto rounded-lg border bg-fd-background shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-fd-muted/50 border-b">
            <tr>
              <th className="h-10 px-4 text-left align-middle font-medium text-fd-muted-foreground w-1/4">
                {type === 'return' ? 'Property' : 'Name'}
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-fd-muted-foreground w-1/4">Type</th>
              {type !== 'return' && (
                <th className="h-10 px-4 text-left align-middle font-medium text-fd-muted-foreground w-[15%]">Default</th>
              )}
              <th className="h-10 px-4 text-left align-middle font-medium text-fd-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-fd-border/50">
            {Object.entries(data).map(([name, prop]) => (
              <tr key={name} className="hover:bg-fd-muted/30 transition-colors">
                <td className="p-4 align-top">
                  <code className="rounded bg-fd-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{name}</code>
                </td>
                <td className="p-4 align-top">
                  <code className="rounded text-fd-primary font-mono text-xs">{prop.type.replaceAll('\\|', '|')}</code>
                </td>
                {type !== 'return' && (
                  <td className="p-4 align-top">
                    {prop.default && prop.default !== '-' ? (
                      <code className="rounded bg-fd-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">{prop.default}</code>
                    ) : (
                      <span className="text-fd-muted-foreground/60">—</span>
                    )}
                  </td>
                )}
                <td className="p-4 align-top text-fd-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {prop.description && prop.description !== '-' ? prop.description : <span className="text-fd-muted-foreground/60">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

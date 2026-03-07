import type { ReactNode } from 'react';
import apiDataRaw from '../../../content/docs/baseui-api.json';

const apiData = apiDataRaw as Record<
  string,
  Record<
    string,
    { name: string; type: string; defaultValue: string; description: string }[]
  >
>;

interface ReferenceProps {
  component: string;
  parts?: string; // Comma separated list of parts, e.g. "Root, Item, Header"
}

export function Reference({ component, parts }: ReferenceProps) {
  const componentApi = apiData[component];
  
  if (!componentApi) {
    return <p className="text-red-500">API Documentation for {component} not found.</p>;
  }

  const partsToRender = parts ? parts.split(',').map(p => p.trim()) : Object.keys(componentApi);

  return (
    <div className="not-prose flex flex-col gap-12">
      {partsToRender.map(part => {
        const props = componentApi[part];
        if (!props || props.length === 0) return null;

        return (
          <div key={part} className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold tracking-tight">{part}</h3>
            
            <div className="relative w-full overflow-auto rounded-lg border bg-fd-background shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-fd-muted/50 border-b">
                  <tr>
                    <th className="h-10 px-4 text-left align-middle font-medium text-fd-muted-foreground w-1/4">Name</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-fd-muted-foreground w-1/4">Type</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-fd-muted-foreground w-[15%]">Default</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-fd-muted-foreground">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-fd-border/50">
                  {props.map(prop => (
                    <tr key={prop.name} className="hover:bg-fd-muted/30 transition-colors">
                      <td className="p-4 align-top">
                        <code className="rounded bg-fd-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{prop.name.replace('?', '')}</code>
                        {prop.name.endsWith('?') ? (
                          <span className="ml-2 text-xs text-fd-muted-foreground">Optional</span>
                        ) : (
                          <span className="ml-2 text-xs font-semibold text-red-500 dark:text-red-400">Required</span>
                        )}
                      </td>
                      <td className="p-4 align-top">
                        <code className="rounded text-fd-primary font-mono text-xs">{prop.type.replaceAll('\\|', '|')}</code>
                      </td>
                      <td className="p-4 align-top">
                        {prop.defaultValue !== '-' ? (
                          <code className="rounded bg-fd-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">{prop.defaultValue}</code>
                        ) : (
                          <span className="text-fd-muted-foreground/60">—</span>
                        )}
                      </td>
                      <td className="p-4 align-top text-fd-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {prop.description !== '-' ? prop.description : <span className="text-fd-muted-foreground/60">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

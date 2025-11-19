import { stegaClean } from 'next-sanity';

import { stegaValueDecode } from '@/lib/stega';
import { Markdown } from '@/components/general/markdown';

export function ContentMarkdown({ value }: { value?: string }) {
  return (
    <div data-sanity={stegaValueDecode(value)}>
      <Markdown>{stegaClean(value)}</Markdown>
    </div>
  );
}

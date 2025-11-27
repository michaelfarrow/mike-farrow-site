import clsx from 'clsx';
import { stegaClean } from 'next-sanity';
import { ComponentPropsWithoutRef } from 'react';

import { stegaValueDecode } from '@/lib/stega';
import { Markdown } from '@/components/general/markdown';

export interface ContentMarkdownProps extends ComponentPropsWithoutRef<'div'> {
  value?: string;
}

export function ContentMarkdown({
  className,
  value,
  ...rest
}: ContentMarkdownProps) {
  return (
    <div
      className={clsx(className, 'prose')}
      {...rest}
      data-sanity={stegaValueDecode(value)}
    >
      <Markdown>{stegaClean(value)}</Markdown>
    </div>
  );
}

import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

import type { CommonSchemaType } from '@/types/content';
import { ContentMarkdown } from '@/components/content/markdown';
import { MaybeLink } from '@/components/content/maybe-link';

export type SanityQuote = CommonSchemaType<'quote'>;

export interface SanityQuoteProps extends ComponentPropsWithoutRef<'div'> {
  quote: SanityQuote;
}

export function SanityQuote({
  quote: { quote, attribution, link },
  className,
  ...rest
}: SanityQuoteProps) {
  return (
    <div {...rest} className={clsx(className)} data-sanity-edit-group>
      <blockquote cite={link?.url}>
        <ContentMarkdown value={quote} />
      </blockquote>
      <p>
        —
        <MaybeLink {...link} target='_blank'>
          {attribution}
        </MaybeLink>
      </p>
    </div>
  );
}

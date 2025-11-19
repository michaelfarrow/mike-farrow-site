import clsx from 'clsx';
import { stegaClean } from 'next-sanity';
import React from 'react';

import type { CommonSchemaType } from '@/types/content';
import { stegaValueDecode } from '@/lib/stega';
import { Code } from '@/components/general/code';

export type SanityCode = CommonSchemaType<'code'>;

export interface SanityCodeProps extends React.ComponentPropsWithoutRef<'div'> {
  code: SanityCode;
}

export function SanityCode({
  code: { code, filename, language = 'typescript', highlightedLines },
  className,
  ...rest
}: SanityCodeProps) {
  if (!code) return null;

  return (
    <div
      {...rest}
      className={clsx(className)}
      data-sanity={stegaValueDecode(code, { popPath: true })}
    >
      {(filename && <p>{stegaClean(filename)}</p>) || null}
      <Code
        language={stegaClean(language)}
        value={stegaClean(code)}
        markers={highlightedLines}
      />
    </div>
  );
}

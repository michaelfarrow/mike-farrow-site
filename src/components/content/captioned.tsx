import { ComponentPropsWithoutRef } from 'react';

import { stegaCleanObject } from '@/lib/stega';
import { Figure } from '@/components/general/figure';

export interface CaptionedProps extends ComponentPropsWithoutRef<'div'> {
  caption?: string;
}

export function Captioned({ caption, children, ...rest }: CaptionedProps) {
  const _caption = stegaCleanObject(caption);

  return (
    <div {...rest}>
      {caption ? (
        <Figure {...rest} caption={_caption}>
          {children}
        </Figure>
      ) : (
        children
      )}
    </div>
  );
}

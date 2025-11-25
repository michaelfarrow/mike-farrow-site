import { CSSProperties } from 'react';

import { Falsey } from '@/lib/types';

export type CSSPropertiesWithVars = CSSProperties & {
  [key: `--${string}`]: unknown;
};

export function styleWithVars(
  styles: CSSProperties | undefined,
  vars: Falsey | CSSPropertiesWithVars | undefined
) {
  return { ...styles, ...vars } as CSSProperties;
}

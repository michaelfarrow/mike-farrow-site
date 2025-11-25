import { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface FigureProps extends ComponentPropsWithoutRef<'figure'> {
  caption: ReactNode;
  captionClassName?: string;
}

export function Figure({
  caption,
  captionClassName,
  children,
  ...rest
}: FigureProps) {
  return (
    <figure {...rest}>
      {children}
      <figcaption className={captionClassName}>{caption}</figcaption>
    </figure>
  );
}

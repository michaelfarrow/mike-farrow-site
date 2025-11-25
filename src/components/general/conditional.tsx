import { JSX } from 'react';

export interface ConditionalProps<T> {
  value?: T;
  children: (value: NonNullable<T>) => JSX.Element | null | undefined;
  numerical?: boolean;
}

export function Conditional<T>({
  value,
  numerical,
  children,
}: ConditionalProps<T>) {
  if (typeof value === 'string' && !value.trim().length) return null;
  if (numerical && typeof value === 'number') return children(value);
  return value ? children(value) : null;
}

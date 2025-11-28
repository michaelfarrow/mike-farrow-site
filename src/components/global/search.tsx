'use client';

import { debounce } from 'lodash-es';
import { ChangeEventHandler, ComponentPropsWithRef, useState } from 'react';

import { SearchResults } from '@/components/global/search-results';

function sanitizeQuery(input: string): string {
  return input
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export interface SearchProps extends ComponentPropsWithRef<'div'> {
  queryLengthMin?: number;
}

export function Search({ queryLengthMin = 3, ...rest }: SearchProps) {
  const [query, setQuery] = useState<string>();

  const setSearchQueryDebounced = debounce(
    (q: string) => {
      setQuery(q);
    },
    500,
    { leading: true }
  );

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const q = sanitizeQuery(e.target.value);

    if (q.length < queryLengthMin) {
      setSearchQueryDebounced.cancel();
      setQuery(undefined);
      return;
    }

    setSearchQueryDebounced(q);
  };

  return (
    <div {...rest}>
      <input placeholder='Search' onChange={handleInputChange} />
      {query && <SearchResults query={query} />}
    </div>
  );
}

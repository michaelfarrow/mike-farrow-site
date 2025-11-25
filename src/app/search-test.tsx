'use client';

import { resolve } from '@mikefarrow/cms';
import { keepPreviousData } from '@tanstack/react-query';
import { debounce } from 'lodash-es';
import { ChangeEventHandler, ComponentPropsWithRef, useState } from 'react';
import Link from 'next/link';

import { RouterOutput, trpc } from '@/trpc/react';

type SearchResults = RouterOutput['search'];
type SearchResultsTypes = SearchResults[keyof SearchResults][number]['_type'];

const RESOLVER_MAPPING = {
  album: resolve.album.detail,
  project: resolve.project.detail,
} satisfies Record<SearchResultsTypes, (doc: never) => string>;

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
  const [searchQuery, setSearchQuery] = useState<string>();
  const {
    data: results,
    isFetching,
    isEnabled,
  } = trpc.search.useQuery(
    { query: searchQuery || '' },
    { enabled: Boolean(searchQuery), placeholderData: keepPreviousData }
  );

  const setSearchQueryDebounced = debounce(
    (q: string) => {
      setSearchQuery(q);
    },
    500,
    { leading: true }
  );

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const q = sanitizeQuery(e.target.value);

    if (q.length < queryLengthMin) {
      setSearchQuery(undefined);
      return;
    }

    setSearchQueryDebounced(q);
  };

  const allResults =
    (isEnabled && results && [...results.projects, ...results.albums]) || [];

  return (
    <div {...rest}>
      <input placeholder='Search' onChange={handleInputChange} />
      {allResults.length > 0 && (
        <ul
          className={`transition-opacity duration-300 ${isFetching ? 'opacity-60' : 'opacity-100'}`}
        >
          {allResults.map((result) => {
            if (!result.name || !result?.slug?.current) return null;

            const clients =
              ('client' in result &&
                result.client &&
                result.client
                  .map((client) => client.name)
                  .filter(
                    (client): client is Required<typeof client> => !!client
                  )) ||
              [];

            return (
              <li key={result._id}>
                <Link
                  href={RESOLVER_MAPPING[result._type]({
                    slug: { current: result.slug.current },
                  })}
                >
                  {result.name}
                  {clients.length ? `- ${clients.join(', ')}` : ''}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

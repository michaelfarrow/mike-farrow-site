import { resolve } from '@mikefarrow/cms';
import { keepPreviousData } from '@tanstack/react-query';
import clsx from 'clsx';
import { ComponentPropsWithRef } from 'react';
import Link from 'next/link';

import { RouterOutput, trpc } from '@/trpc/react';

type SearchResults = RouterOutput['search'];
type SearchResultsTypes = SearchResults[keyof SearchResults][number]['_type'];

const RESOLVER_MAPPING = {
  album: resolve.album.detail,
  project: resolve.project.detail,
} satisfies Record<SearchResultsTypes, (doc: never) => string>;

export interface SearchResultsProps extends ComponentPropsWithRef<'div'> {
  query: string;
}

export function SearchResults({
  className,
  query,
  ...rest
}: SearchResultsProps) {
  const { isLoading, isFetching, data } = trpc.search.useQuery(
    { query },
    { placeholderData: keepPreviousData }
  );

  const results = (data && [...data.projects, ...data.albums]) || [];

  return (
    <div
      {...rest}
      className={clsx(
        className,
        `transition-opacity duration-300 ${isFetching ? 'opacity-60' : 'opacity-100'}`
      )}
    >
      {(isLoading && <div>Loading...</div>) ||
        (results.length === 0 && <div>No Results</div>) || (
          <ul>
            {results.map((result) => {
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

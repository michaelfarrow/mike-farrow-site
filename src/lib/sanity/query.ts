/* eslint-disable  @typescript-eslint/no-explicit-any */
import { draftMode } from 'next/headers';

import { sanityClient } from '@/lib/sanity/client';

export type Query = Parameters<typeof sanityClient.fetch>[0];
export type Params = Parameters<typeof sanityClient.fetch>[1];
export type QueryOptions = {
  revalidate?: number;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NullType = {};

type NullsToUndefined<T> = T extends null
  ? undefined
  : T extends Date
    ? T
    : {
        [K in keyof T]: T[K] extends (infer U)[]
          ? NullsToUndefined<U>[]
          : NullsToUndefined<T[K]>;
      };

function nullsToUndefined<T>(obj: T): NullsToUndefined<T> {
  if (obj === null) {
    return undefined as any;
  }

  if (obj?.constructor.name === 'Object') {
    for (const key in obj) {
      obj[key] = nullsToUndefined(obj[key]) as any;
    }
  }

  if (Array.isArray(obj)) {
    return obj.map(nullsToUndefined) as any;
  }

  return obj as any;
}

export async function fetch<T extends Query>(
  query: T,
  params: Params = {},
  { revalidate }: QueryOptions = {}
) {
  let draftModeEnabled = false;

  try {
    draftModeEnabled = (await draftMode()).isEnabled;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {}

  const res = await sanityClient.fetch<NullType, typeof params, typeof query>(
    query,
    params,
    {
      perspective: draftModeEnabled ? 'drafts' : 'published',
      useCdn: !draftModeEnabled,
      stega: draftModeEnabled,
      token: process.env.SANITY_STUDIO_API_READ_TOKEN,
      next: {
        revalidate: revalidate || undefined,
      },
    }
  );

  return nullsToUndefined(res);
}

export function createQuery<T extends Query>(query: T, options?: QueryOptions) {
  const q = (fetchOptions?: QueryOptions) =>
    fetch<T>(query, undefined, { ...options, ...fetchOptions });

  q.withOptions = (fetchOptions: QueryOptions) => {
    return () => q(fetchOptions);
  };

  q.withParams = <P extends Params>() => {
    const q = (params: P, fetchOptions?: QueryOptions) =>
      fetch<T>(query, params, { ...options, ...fetchOptions });

    q.withOptions = (fetchOptions: QueryOptions) => (params: P) =>
      q(params, fetchOptions);

    return q;
  };

  return q;
}

import z from 'zod';

import { getSearchResults } from '@/lib/sanity/queries/search';
import { baseProcedure } from '@/trpc/init';

export const search = baseProcedure
  .input(
    z.object({
      query: z.string(),
    })
  )
  .query((opts) => getSearchResults({ search: opts.input.query }));

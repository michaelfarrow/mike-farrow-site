import { linkQuery } from '@/lib/sanity/queries/common/link';

export const quoteQuery = `
  {
    quote,
    attribution,
    link-> ${linkQuery}
  }
`;

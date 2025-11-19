import { createClient } from '@sanity/client';

import { config } from '@/lib/config';

export const sanityClient = createClient({
  ...config.studio,
  useCdn: false,
  stega: { studioUrl: config.url.studio },
});

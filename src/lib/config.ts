import { defineConfig } from '@mikefarrow/cms';

export const config = defineConfig(
  {
    dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
  },
  ({ production }) => ({
    url: {
      studio: production ? 'https://cms.farrow.io' : 'http://localhost:3333',
    },
  })
);

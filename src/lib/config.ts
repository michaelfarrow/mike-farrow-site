import { defineConfig } from '@mikefarrow/cms';

export const config = defineConfig(
  {
    dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
  },
  ({ production }) => ({
    url: {
      studio: production
        ? 'https://mike-farrow-portfolio-sanity-studio.vercel.app'
        : 'http://localhost:3333',
    },
  })
);

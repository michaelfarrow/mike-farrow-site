import { config as cmsConfig } from '@mikefarrow/cms';

export const config = {
  ...cmsConfig,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
};

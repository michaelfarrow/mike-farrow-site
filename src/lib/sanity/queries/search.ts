import { defineQuery } from 'groq';

import { createQuery } from '@/lib/sanity/query';

export const searchQuery = defineQuery(`
  {
    "projects": *[
      _type == 'project' && (
        name match "*" + $search + "*" ||
        client[]->name match "*" + $search + "*"
      )
    ] {
      _type,
      _id,
      name,
      slug,
      client[]-> {
        name
      }
    },
    "albums": *[
      _type == 'album' && (
        name match "*" + $search + "*"
      )
    ] {
      _type,
      _id,
      name,
      slug
    }
  }
`);

export const getSearchResults = createQuery(searchQuery).withParams<{
  search: string;
}>();

import { defineQuery } from 'groq';

import { linkQuery } from '@/lib/sanity/queries/common/link';
import { createQuery } from '@/lib/sanity/query';

export const cvQuery = defineQuery(`
  *[_type == 'cv' && _id == 'cv'][0] {
    experience[] | order(from desc) {
      _key,
      title,
      employer-> {
        _id,
        name,
        link-> ${linkQuery}
      },
      description,
      from,
      to
    },
    education[] | order(from desc) {
      _key,
      qualification,
      institution-> {
        _id,
        name,
        link-> ${linkQuery}
      },
      from,
      to
    },
    skills[]-> {
      name,
      'skills': *[_type == 'skill' && parent._ref == ^._id] | order(name) {
        name,
        'skills': *[_type == 'skill' && parent._ref == ^._id] | order(name) {
          name,
        }
      }
    }
  }
`);

export const getCV = createQuery(cvQuery);

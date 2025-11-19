import { resolve } from '@mikefarrow/cms';
import Link from 'next/link';

import { hasSlug } from '@/lib/document';
import { createPage } from '@/lib/page';
import { getAlbums } from '@/lib/sanity/queries/album';

const albums = createPage('albums', getAlbums, {
  metadata: () => ({
    title: 'Albums',
  }),
  render: (albums) => {
    return (
      <div>
        <ul>
          {albums.map((album) => {
            if (!hasSlug(album)) return null;
            return (
              <li key={album._id}>
                <Link href={resolve.album.detail(album)}>{album.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
});

export const { generateMetadata } = albums;
export default albums.page;

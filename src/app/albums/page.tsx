import { resolve } from '@mikefarrow/cms';
import Link from 'next/link';

import { hasSlug } from '@/lib/document';
import { createPage } from '@/lib/page';
import { getAlbums } from '@/lib/sanity/queries/album';
import { Container } from '@/components/page/container';

const albums = createPage('albums', getAlbums, {
  metadata: () => ({
    title: 'Albums',
  }),
  render: (albums) => {
    return (
      <Container>
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
      </Container>
    );
  },
});

export const { generateMetadata } = albums;
export default albums.page;

import clsx from 'clsx';
import { stegaClean } from 'next-sanity';

import { getProject } from '@/lib//sanity/queries/project';
import { BREAKPOINTS_MIN, breakpointSizes } from '@/lib/responsive';
import { ContentCode } from '@/components/content/code';
import { ContentImage } from '@/components/content/image';
import { ContentMarkdown } from '@/components/content/markdown';
import { ContentPicture } from '@/components/content/picture';
import { ContentQuote } from '@/components/content/quote';
import { ContentVideo } from '@/components/content/video';
import {
  Array,
  conditionalComponent as cc,
} from '@/components/sanity/array';

const CONTAINER_MAX = BREAKPOINTS_MIN['2xl'].width;

export function ProjectContent({
  project,
}: {
  project: NonNullable<Awaited<ReturnType<typeof getProject>>>;
}) {
  if (!project.content) return null;

  return (
    <div className='grid grid-cols-2 gap-10'>
      {project.content.map((item) => {
        const full = stegaClean(item.span) === 'full';

        const sizes = breakpointSizes(
          { min: CONTAINER_MAX, size: CONTAINER_MAX / (full ? 1 : 2) },
          { min: 'md', size: full ? '100vw' : '50vw' },
          '100vw'
        );

        return (
          <div
            key={item._key}
            className={clsx('col-span-full', !full && 'md:col-auto')}
          >
            <div className='sticky top-0 [.draft-mode_&]:static'>
              <Array
                value={item.content || []}
                wrapper={(child, children) => {
                  return <div key={child._key}>{children}</div>;
                }}
                components={{
                  code: (block) =>
                    cc(block.code?.length, <ContentCode code={block} />),
                  md: (block) =>
                    cc(
                      block.content?.length,
                      <ContentMarkdown value={block.content} />
                    ),
                  responsiveImage: (block) =>
                    cc(
                      block.main?.asset?.url,
                      <ContentPicture image={block} sizes={sizes} />
                    ),
                  image: (block) =>
                    cc(
                      block.asset?.url,
                      <ContentImage image={block} sizes={sizes} />
                    ),
                  video: (block) =>
                    cc(
                      block.file,
                      <ContentVideo video={block} sizes={sizes} />
                    ),
                  remoteVideo: (block) =>
                    cc(block.url, <ContentVideo video={block} sizes={sizes} />),
                  quote: (block) =>
                    cc(
                      block.quote || block.attribution,
                      <ContentQuote quote={block} />
                    ),
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

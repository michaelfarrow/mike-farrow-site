'use client';

import clsx from 'clsx';
import getVideoId from 'get-video-id';
import { stegaClean } from 'next-sanity';
import React, { ComponentType } from 'react';

import type { CommonSchemaType } from '@/types/content';
import { config } from '@/lib/config';
import { sanityImageCroppedSize } from '@/lib/image';
import { stegaValueDecode } from '@/lib/stega';
import { LiteVideoExtendsProps } from '@/components/general/video/lite-video';
import { NativeVideo } from '@/components/general/video/native-video';
import { VimeoVideo } from '@/components/general/video/vimeo-video';
import { YoutubeVideo } from '@/components/general/video/youtube-video';
import { SanityImage } from '@/components/sanity/image';

export type SanityRemoteVideo = CommonSchemaType<'remoteVideo'>;
export type SanityVideo = CommonSchemaType<'video'>;

export interface SanityVideoProps {
  video: SanityVideo | SanityRemoteVideo;
  alt?: string;
  sizes?: string;
}

export const videoComponentMap: Record<
  keyof typeof config.videoTypes,
  ComponentType<LiteVideoExtendsProps & { title: string; id: string }>
> = {
  youTube: YoutubeVideo,
  vimeo: VimeoVideo,
};

export function SanityVideo({ video, alt, sizes }: SanityVideoProps) {
  const src =
    'file' in video
      ? video.file?.asset?.url
      : 'url' in video
        ? video.url
        : undefined;

  if (!src) return;

  const { poster, ratio } = video;
  const title = stegaClean(alt || video.alt || '');

  const croppedSize = poster && sanityImageCroppedSize(poster);

  const parsedRatio = ratio?.match(/(\d+)\s*[/:]\s*(\d+)/);

  const finalRatio = parsedRatio
    ? Number(parsedRatio[1]) / Number(parsedRatio[2])
    : croppedSize?.width && croppedSize.height
      ? croppedSize.width / croppedSize.height
      : undefined;

  const posterComponent = ({ initialised }: { initialised: boolean }) =>
    video.poster && (
      <div
        className={clsx(
          'transition-transform',
          initialised && 'scale-110 duration-500'
        )}
      >
        <SanityImage
          className='h-full object-cover'
          image={video.poster}
          sizes={sizes}
        />
      </div>
    );

  const commonProps = {
    title,
    poster: posterComponent,
    aspect: finalRatio,
    'data-sanity': stegaValueDecode(
      video.alt,
      'url' in video ? { replacePath: 'url' } : { popPath: true }
    ),
  };

  if ('url' in video) {
    if (!video.url) return null;

    const matchedVideo = getVideoId(video.url);
    if (!matchedVideo?.id) return null;

    for (const [key, type] of Object.entries(config.videoTypes)) {
      if (type.test(video.url)) {
        const VideoComponent =
          videoComponentMap[key as keyof typeof config.videoTypes];
        return <VideoComponent id={matchedVideo.id} {...commonProps} />;
      }
    }
  }

  return <NativeVideo src={src} {...commonProps} />;
}

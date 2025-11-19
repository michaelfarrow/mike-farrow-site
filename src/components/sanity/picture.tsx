'use client';

import { stegaClean } from 'next-sanity';

import type { CommonSchemaType } from '@/types/content';
import { sanityImageLoader } from '@/lib/image';
import { BREAKPOINTS_MIN } from '@/lib/responsive';
import { Picture, PictureProps } from '@/components/general/picture';
import { getSanityImageProps } from '@/components/sanity/image';

export type SanityPictureImage = CommonSchemaType<'responsiveImage'>;

export interface SanityPictureProps
  extends Omit<PictureProps, 'loader' | 'images' | 'alt'> {
  image: SanityPictureImage;
  alt?: string;
}

export function SanityPicture({ image, alt, ...rest }: SanityPictureProps) {
  const images = [
    (image.main && { source: image.main, breakpoint: undefined }) || undefined,
    ...(image?.alternative || [])
      .filter((altImage) => !!altImage)
      .map((altImage) => ({
        source: altImage.image,
        breakpoint: altImage.breakpoint,
      })),
  ]
    .filter((image) => !!image)
    .map((image) => {
      const { source, breakpoint } = image;

      if (source) {
        const props = getSanityImageProps(source);

        return (
          (props && {
            ...props,
            min: breakpoint && BREAKPOINTS_MIN[stegaClean(breakpoint)]?.width,
          }) ||
          null
        );
      }

      return null;
    })
    .filter((image) => !!image);

  return (
    <Picture
      {...rest}
      alt={alt || image.main?.alt || ''}
      images={images}
      loader={sanityImageLoader}
    />
  );
}

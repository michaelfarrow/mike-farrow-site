'use client';

import clsx from 'clsx';
import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { default as NextImage, ImageProps as NextImageProps } from 'next/image';

import { useIsMaybePresentation } from '@/hooks/sanity';
import { BREAKPOINTS_MIN } from '@/lib/responsive';

export const IMAGE_DEFAULT_QUALITY = 50;

export interface ImageProps extends NextImageProps {
  onImageLoaded?: () => void;
  backupSrc?: boolean;
  backupSrcSize?: number;
}

export function Image({
  className,
  onImageLoaded,
  quality = IMAGE_DEFAULT_QUALITY,
  overrideSrc,
  backupSrc,
  backupSrcSize = BREAKPOINTS_MIN.lg.width,
  ...rest
}: ImageProps) {
  const image = useRef<HTMLImageElement>(null);
  const isPresentation = useIsMaybePresentation();

  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
    if (onImageLoaded) onImageLoaded();
  };

  const setImageLoaded = useEffectEvent(() => {
    onLoad();
  });

  useEffect(() => {
    if (image.current?.complete) {
      setImageLoaded();
    }
  }, [image]);

  return (
    <NextImage
      loading={isPresentation ? 'eager' : 'lazy'}
      quality={quality}
      {...rest}
      className={clsx(
        'block h-auto w-full transition-opacity',
        loaded ? 'opacity-1 duration-200' : 'opacity-0 duration-0',
        className
      )}
      overrideSrc={
        overrideSrc ||
        (backupSrc &&
          rest.loader &&
          typeof rest.src == 'string' &&
          rest.loader({
            src: rest.src,
            width: backupSrcSize,
            quality: quality && Number(quality),
          })) ||
        undefined
      }
      ref={image}
      onLoad={onLoad}
    />
  );
}

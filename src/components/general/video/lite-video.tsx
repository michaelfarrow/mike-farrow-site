'use client';

import clsx from 'clsx';
import { PiPlay as PlayIcon } from 'react-icons/pi';
import React, { HTMLAttributes, useEffect, useState } from 'react';

const LITE_VIDEO_DEFAULT_CONTAINER: React.ElementType = 'article';

export interface LiteVideoProps<
  T extends React.ElementType = typeof LITE_VIDEO_DEFAULT_CONTAINER,
> {
  title: string;
  aspect?: number;
  announce?: string;
  alwaysLoadIframe?: boolean;
  onIframeAdded?: () => void;
  containerElement?: T;
  containerAttrs?: Partial<HTMLAttributes<T>>;
  children: React.ReactNode;
  preconnect: React.ReactNode;
  poster:
    | React.ReactNode
    | ((props: { initialised: boolean }) => React.ReactNode);
}

export type LiteVideoExtendsProps = Omit<
  LiteVideoProps,
  'preconnect' | 'children'
>;

export function LiteVideo<T extends React.ElementType>({
  title,
  aspect = 16 / 9,
  announce = 'Watch',
  alwaysLoadIframe,
  onIframeAdded,
  containerAttrs,
  containerElement,
  children,
  preconnect,
  poster,
  ...rest
}: LiteVideoProps<T>) {
  const [preconnected, setPreconnected] = useState(false);
  const [initialised, setInitialised] = useState(Boolean(alwaysLoadIframe));

  const Container = containerElement || LITE_VIDEO_DEFAULT_CONTAINER;

  const warmConnections = () => {
    if (preconnected) return;
    setPreconnected(true);
  };

  const addIframe = () => {
    if (initialised) return;
    setInitialised(true);
  };

  useEffect(() => {
    if (initialised && onIframeAdded) {
      onIframeAdded();
    }
  }, [initialised, onIframeAdded]);

  return (
    <>
      <>{preconnected && preconnect}</>
      <Container
        {...rest}
        {...containerAttrs}
        className={clsx([
          'relative overflow-hidden bg-black',
          containerAttrs && containerAttrs.className,
        ])}
        style={{
          ...containerAttrs?.style,
          ...{ paddingTop: `${100 / aspect}%` },
        }}
        onPointerOver={warmConnections}
        onClick={addIframe}
      >
        <span className='*:absolute *:inset-0 *:!h-full *:!w-full'>
          {(initialised && children) || (
            <button
              type='button'
              className='invisible absolute inset-0'
              aria-label={`${announce} ${title}`}
            />
          )}
        </span>
        <span
          className={clsx([
            'group absolute inset-0 block transition-opacity duration-500',
            initialised && 'pointer-events-none opacity-0',
            !initialised && 'cursor-pointer',
          ])}
        >
          <span
            className={clsx(
              'absolute inset-0 block *:absolute *:inset-0 *:!h-full *:!w-full'
            )}
          >
            {typeof poster === 'function' ? poster({ initialised }) : poster}
          </span>
          <PlayIcon
            className={clsx([
              'absolute left-1/2 top-1/2 h-1/2 w-1/2 max-w-[200px] -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-lg transition-[opacity,transform] duration-200 group-hover:scale-125',
              initialised && 'scale-150 opacity-0',
            ])}
          />
        </span>
      </Container>
    </>
  );
}

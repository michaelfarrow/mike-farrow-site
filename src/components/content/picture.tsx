import { Captioned, CaptionedProps } from '@/components/content/captioned';
import {
  SanityPicture,
  SanityPictureProps,
} from '@/components/sanity/picture';

export interface ContentPictureProps
  extends Omit<CaptionedProps, 'caption'>,
    Pick<SanityPictureProps, 'image'> {
  sizes?: string;
}

export function ContentPicture({ image, sizes, ...rest }: ContentPictureProps) {
  return (
    <Captioned {...rest} caption={image.main?.caption}>
      <SanityPicture image={image} sizes={sizes} />
    </Captioned>
  );
}

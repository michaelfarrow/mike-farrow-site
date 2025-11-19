import { fileQuery } from '@/lib/sanity/queries/common/file';
import { imageQuery } from '@/lib/sanity/queries/common/image';

export const videoCommonQuery = `
  poster ${imageQuery},
  alt,
  caption,
  ratio
`;

export const videoQuery = `
  {
    file ${fileQuery},
    ${videoCommonQuery}
  }
`;

export const remoteVideoQuery = `
  {
    url,
    ${videoCommonQuery}
  }
`;

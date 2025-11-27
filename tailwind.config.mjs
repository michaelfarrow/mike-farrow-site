import typography from '@tailwindcss/typography';
import { mapValues } from 'lodash-es';

import { config as appConfig } from './src/lib/config';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // colors: {
    //   inherit: 'inherit',
    //   current: 'currentColor',
    //   transparent: 'transparent',
    //   black: '#000',
    //   white: '#fff',
    //   brand: {
    //     100: '#ff0000',
    //     200: '#fff000',
    //   },
    // },
    screens: mapValues(
      appConfig.breakpoints,
      (breakpoint) => `${breakpoint.width}px`
    ),
  },
  plugins: [typography],
};

export default config;

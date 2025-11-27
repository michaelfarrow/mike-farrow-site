import breakpoints from '@mikefarrow/cms/config/breakpoints';
import typography from '@tailwindcss/typography';
import { mapValues } from 'lodash-es';

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
    screens: mapValues(breakpoints, (breakpoint) => `${breakpoint.width}px`),
  },
  plugins: [typography],
};

export default config;

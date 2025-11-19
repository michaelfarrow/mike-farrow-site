import baseConfig from '@mikefarrow/prettier/config';

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  plugins: [...baseConfig.plugins, 'prettier-plugin-tailwindcss'],
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^react$',
    '^next(/.*)?$',
    '',
    '^@root/(.*)$',
    '^@/types/(.*)$',
    '^@/(lib|hooks|context)/(.*)$',
    '^@/components/(.*)$',
    '^@/(.*)$',
    '',
    '^[./]',
  ],
};

export default config;

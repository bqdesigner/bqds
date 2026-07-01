import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: [
    '../docs/**/*.stories.@(ts|tsx)',
    '../packages/**/*.stories.@(ts|tsx)',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
};

export default config;

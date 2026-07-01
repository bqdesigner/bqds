import type { Preview } from '@storybook/web-components';
import '../packages/tokens/dist/tokens.css';

const applyTheme = (theme: string) => {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  document.body.style.background = 'var(--bq-color-bg)';
  document.body.style.color = 'var(--bq-color-text)';
  document.body.style.fontFamily = 'var(--bq-font-family-sans)';
};

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    // O tema controla o fundo (via tokens); desliga o addon de backgrounds.
    backgrounds: { disable: true },
  },
  initialGlobals: { theme: 'light' },
  globalTypes: {
    theme: {
      description: 'Tema BQDS (light/dark)',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      applyTheme(context.globals.theme ?? 'light');
      return story();
    },
  ],
};

export default preview;

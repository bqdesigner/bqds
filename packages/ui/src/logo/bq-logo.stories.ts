import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './bq-logo';

interface Args {
  size: number;
  color: string;
}

const meta: Meta<Args> = {
  title: 'Brand/Logo',
  component: 'bq-logo',
  argTypes: {
    size: { control: { type: 'range', min: 16, max: 200, step: 4 } },
    color: { control: 'color' },
  },
  args: { size: 96, color: '' },
  render: ({ size, color }) => html`<bq-logo size=${size} color=${color}></bq-logo>`,
};

export default meta;
type Story = StoryObj<Args>;

/** Segue o tema da toolbar (☀️/🌙) — cor via token. */
export const Adaptive: Story = {};

/** Light e dark lado a lado (cores fixas, sempre visíveis). */
export const LightAndDark: Story = {
  render: () => {
    const panel = (bg: string, color: string, label: string) => html`
      <div
        style="flex:1;display:flex;flex-direction:column;align-items:center;gap:24px;padding:48px;border-radius:12px;background:${bg}"
      >
        <bq-logo size="80" color=${color}></bq-logo>
        <code style="font-family:var(--bq-font-family-mono);font-size:12px;color:${color};opacity:.6">${label}</code>
      </div>
    `;
    return html`
      <div style="display:flex;gap:24px">
        ${panel('var(--bq-color-white)', 'var(--bq-color-gray-800)', 'light · #191819')}
        ${panel('var(--bq-color-gray-800)', 'var(--bq-color-gray-100)', 'dark · #F0F0F0')}
      </div>
    `;
  },
};

/** Escalas de uso. */
export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;align-items:flex-end;gap:32px;padding:32px">
      <bq-logo size="24"></bq-logo>
      <bq-logo size="48"></bq-logo>
      <bq-logo size="96"></bq-logo>
    </div>
  `,
};

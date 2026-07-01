import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './bq-button';

// Ícone de exemplo (seta) pra icon-right / icon-only.
const arrow = html`
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;

interface Args {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  iconOnly: boolean;
  iconRight: boolean;
  disabled: boolean;
  label: string;
}

const meta: Meta<Args> = {
  title: 'Components/Button',
  component: 'bq-button',
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    iconOnly: { control: 'boolean' },
    iconRight: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { variant: 'primary', size: 'md', iconOnly: false, iconRight: false, disabled: false, label: 'Button' },
  render: ({ variant, size, iconOnly, iconRight, disabled, label }) =>
    iconOnly
      ? html`<bq-button variant=${variant} size=${size} icon-only ?disabled=${disabled}>${arrow}</bq-button>`
      : html`<bq-button variant=${variant} size=${size} ?disabled=${disabled}
          >${label}${iconRight ? html`<span slot="icon">${arrow}</span>` : ''}</bq-button
        >`,
};

export default meta;
type Story = StoryObj<Args>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };

export const Variants: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center">
      <bq-button variant="primary">Primary</bq-button>
      <bq-button variant="secondary">Secondary</bq-button>
      <bq-button variant="ghost">Ghost</bq-button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center">
      <bq-button size="sm">Small</bq-button>
      <bq-button size="md">Medium</bq-button>
      <bq-button size="lg">Large</bq-button>
    </div>
  `,
};

export const IconRight: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center">
      <bq-button variant="primary">Avançar<span slot="icon">${arrow}</span></bq-button>
      <bq-button variant="secondary">Avançar<span slot="icon">${arrow}</span></bq-button>
      <bq-button variant="ghost">Avançar<span slot="icon">${arrow}</span></bq-button>
    </div>
  `,
};

export const IconOnly: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center">
      <bq-button variant="primary" icon-only aria-label="Avançar">${arrow}</bq-button>
      <bq-button variant="secondary" icon-only aria-label="Avançar">${arrow}</bq-button>
      <bq-button variant="ghost" icon-only aria-label="Avançar">${arrow}</bq-button>
    </div>
  `,
};

export const Disabled: Story = { args: { disabled: true } };

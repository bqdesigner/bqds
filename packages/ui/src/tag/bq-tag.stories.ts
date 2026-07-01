import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './bq-tag';

interface Args {
  variant: 'solid' | 'soft' | 'outline';
  size: 'sm' | 'md';
  shape: 'pill' | 'square';
  label: string;
}

const meta: Meta<Args> = {
  title: 'Components/Tag',
  component: 'bq-tag',
  argTypes: {
    variant: { control: 'select', options: ['solid', 'soft', 'outline'] },
    size: { control: 'select', options: ['sm', 'md'] },
    shape: { control: 'select', options: ['pill', 'square'] },
    label: { control: 'text' },
  },
  args: { variant: 'soft', size: 'sm', shape: 'pill', label: 'Design' },
  render: ({ variant, size, shape, label }) =>
    html`<bq-tag variant=${variant} size=${size} shape=${shape}>${label}</bq-tag>`,
};

export default meta;
type Story = StoryObj<Args>;

export const Soft: Story = {};
export const Solid: Story = { args: { variant: 'solid' } };
export const Outline: Story = { args: { variant: 'outline' } };

export const Variants: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <bq-tag variant="solid">Breve</bq-tag>
      <bq-tag variant="soft">Categoria</bq-tag>
      <bq-tag variant="outline">Tag</bq-tag>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <bq-tag size="sm">Small</bq-tag>
      <bq-tag size="md">Medium</bq-tag>
    </div>
  `,
};

export const Shapes: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <bq-tag variant="solid" shape="pill">Pill</bq-tag>
      <bq-tag variant="solid" shape="square">Square</bq-tag>
    </div>
  `,
};

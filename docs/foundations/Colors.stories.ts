import { html } from 'lit';

export default { title: 'Foundations/Colors' };

const swatch = (name: string) => html`
  <div style="display:flex;align-items:center;gap:12px;margin:8px 0">
    <div
      style="width:40px;height:40px;border-radius:8px;border:1px solid var(--bq-color-border);background:var(--bq-color-${name})"
    ></div>
    <code style="font-family:var(--bq-font-family-mono)">--bq-color-${name}</code>
  </div>
`;

const roles = [
  'bg',
  'surface-hover',
  'border',
  'text-strong',
  'text',
  'text-secondary',
  'text-disabled',
  'accent',
  'on-accent',
];

export const Semantic = {
  render: () => html`<div>${roles.map(swatch)}</div>`,
};

import { html } from 'lit';

export default { title: 'Foundations/Radius' };

const scale: [string, string][] = [
  ['sm', '4px'],
  ['md', '8px'],
  ['lg', '12px'],
  ['xl', '16px'],
  ['2xl', '24px'],
  ['full', 'pill'],
];

export const Scale = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:24px;font-family:var(--bq-font-family-sans)">
      ${scale.map(
        ([n, label]) => html`
          <div style="text-align:center">
            <div
              style="width:96px;height:96px;background:var(--bq-color-surface-hover);border:1px solid var(--bq-color-border);border-radius:var(--bq-radius-${n})"
            ></div>
            <code style="display:block;margin-top:8px;font-family:var(--bq-font-family-mono);font-size:12px;color:var(--bq-color-text-secondary)">--bq-radius-${n}</code>
            <span style="font-size:11px;color:var(--bq-color-text-secondary)">${label}</span>
          </div>
        `,
      )}
    </div>
  `,
};

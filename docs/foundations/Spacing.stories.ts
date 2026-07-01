import { html } from 'lit';

export default { title: 'Foundations/Spacing' };

const scale: [string, string][] = [
  ['1', '4px'],
  ['2', '8px'],
  ['3', '12px'],
  ['4', '16px'],
  ['5', '20px'],
  ['6', '24px'],
  ['7', '28px'],
  ['8', '32px'],
  ['9', '36px'],
  ['10', '40px'],
  ['12', '48px'],
  ['16', '64px'],
  ['20', '80px'],
  ['24', '96px'],
  ['32', '128px'],
  ['40', '160px'],
];

export const Scale = {
  render: () => html`
    <div style="font-family:var(--bq-font-family-sans)">
      ${scale.map(
        ([n, px]) => html`
          <div style="display:flex;align-items:center;gap:16px;margin:6px 0">
            <code style="font-family:var(--bq-font-family-mono);font-size:12px;color:var(--bq-color-text-secondary);width:160px">--bq-space-${n}</code>
            <div style="height:16px;width:var(--bq-space-${n});background:var(--bq-color-accent);border-radius:2px"></div>
            <span style="font-size:12px;color:var(--bq-color-text-secondary)">${px}</span>
          </div>
        `,
      )}
    </div>
  `,
};

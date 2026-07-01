import { html } from 'lit';

export default { title: 'Foundations/Typography' };

const row = (token: string, sample: string, style: string) => html`
  <div style="display:flex;align-items:baseline;gap:24px;padding:12px 0;border-bottom:1px solid var(--bq-color-border)">
    <code style="font-family:var(--bq-font-family-mono);font-size:12px;color:var(--bq-color-text-secondary);width:220px;flex-shrink:0">${token}</code>
    <span style="${style};color:var(--bq-color-text)">${sample}</span>
  </div>
`;

export const TextScale = {
  render: () => html`
    <div style="font-family:var(--bq-font-family-sans)">
      ${row('font-size-xs (12)', 'Grumpy wizards make toxic brew', 'font-size:var(--bq-font-size-xs)')}
      ${row('font-size-sm (14)', 'Grumpy wizards make toxic brew', 'font-size:var(--bq-font-size-sm)')}
      ${row('font-size-base (16)', 'Grumpy wizards make toxic brew', 'font-size:var(--bq-font-size-base)')}
      ${row('font-size-lg (18)', 'Grumpy wizards make toxic brew', 'font-size:var(--bq-font-size-lg)')}
      ${row('font-size-xl (20)', 'Grumpy wizards make toxic brew', 'font-size:var(--bq-font-size-xl)')}
      ${row('font-size-2xl (24)', 'Grumpy wizards make toxic brew', 'font-size:var(--bq-font-size-2xl)')}
    </div>
  `,
};

export const DisplayScale = {
  render: () => html`
    <div style="font-family:var(--bq-font-family-sans)">
      <p style="font-family:var(--bq-font-family-mono);font-size:12px;color:var(--bq-color-text-secondary)">
        Fluido — arraste a janela pra ver escalar (clamp).
      </p>
      ${row('display-sm', 'Design System', 'font-size:var(--bq-font-display-sm);font-weight:500;line-height:1.1')}
      ${row('display-md', 'Design System', 'font-size:var(--bq-font-display-md);font-weight:500;line-height:1.1')}
      ${row('display-lg', 'Design System', 'font-size:var(--bq-font-display-lg);font-weight:500;line-height:1.1')}
      ${row('display-xl', 'Design System', 'font-size:var(--bq-font-display-xl);font-weight:500;line-height:1.1')}
      ${row('display-2xl', 'BQDS', 'font-size:var(--bq-font-display-2xl);font-weight:500;line-height:1')}
    </div>
  `,
};

export const Weights = {
  render: () => html`
    <div style="font-family:var(--bq-font-family-sans)">
      ${row('weight-light (300)', 'Grumpy wizards make toxic brew', 'font-size:24px;font-weight:var(--bq-font-weight-light)')}
      ${row('weight-regular (400)', 'Grumpy wizards make toxic brew', 'font-size:24px;font-weight:var(--bq-font-weight-regular)')}
      ${row('weight-medium (500)', 'Grumpy wizards make toxic brew', 'font-size:24px;font-weight:var(--bq-font-weight-medium)')}
      ${row('weight-semibold (600)', 'Grumpy wizards make toxic brew', 'font-size:24px;font-weight:var(--bq-font-weight-semibold)')}
      ${row('weight-bold (700)', 'Grumpy wizards make toxic brew', 'font-size:24px;font-weight:var(--bq-font-weight-bold)')}
    </div>
  `,
};

export const LineHeight = {
  render: () => {
    const p = (token: string, lh: string) => html`
      <div style="margin-bottom:24px">
        <code style="font-family:var(--bq-font-family-mono);font-size:12px;color:var(--bq-color-text-secondary)">${token}</code>
        <p style="max-width:520px;font-size:16px;color:var(--bq-color-text);line-height:${lh};margin-top:8px">
          O rato roeu a roupa do rei de Roma enquanto o gato dormia tranquilo ao sol da tarde de domingo.
        </p>
      </div>
    `;
    return html`<div style="font-family:var(--bq-font-family-sans)">
      ${p('line-tight (1.1)', 'var(--bq-font-line-tight)')}
      ${p('line-snug (1.25)', 'var(--bq-font-line-snug)')}
      ${p('line-normal (1.5)', 'var(--bq-font-line-normal)')}
      ${p('line-relaxed (1.65)', 'var(--bq-font-line-relaxed)')}
    </div>`;
  },
};

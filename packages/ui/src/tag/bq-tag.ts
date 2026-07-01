import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Tag / badge do BQDS. Label curto, uppercase.
 * Base: nav-tag ("Breve"), categoria de post, badge de artigo/destaque.
 *
 * @slot - texto da tag
 */
@customElement('bq-tag')
export class BqTag extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      gap: var(--bq-space-1);
      font-family: var(--bq-font-family-sans);
      font-weight: var(--bq-font-weight-medium);
      text-transform: uppercase;
      letter-spacing: var(--bq-font-tracking-wide);
      line-height: 1;
      white-space: nowrap;
      border: 1px solid transparent;
    }

    /* Tamanhos */
    .size-sm {
      font-size: var(--bq-font-size-xs);
      padding: var(--bq-space-1) var(--bq-space-3);
    }
    .size-md {
      font-size: var(--bq-font-size-sm);
      padding: var(--bq-space-2) var(--bq-space-4);
    }

    /* Forma */
    .pill {
      border-radius: var(--bq-radius-full);
    }
    .square {
      border-radius: var(--bq-radius-sm);
    }

    /* Variantes */
    .solid {
      background: var(--bq-color-accent);
      color: var(--bq-color-on-accent);
    }
    .soft {
      background: var(--bq-color-surface-hover);
      color: var(--bq-color-text-secondary);
    }
    .outline {
      color: var(--bq-color-text);
      border-color: var(--bq-color-border);
    }
  `;

  /** Estilo visual. */
  @property() variant: 'solid' | 'soft' | 'outline' = 'soft';

  /** Tamanho. */
  @property() size: 'sm' | 'md' = 'sm';

  /** Forma. */
  @property() shape: 'pill' | 'square' = 'pill';

  render() {
    const classes = {
      tag: true,
      [this.variant]: true,
      [`size-${this.size}`]: true,
      [this.shape]: true,
    };
    return html`<span class=${classMap(classes)}><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bq-tag': BqTag;
  }
}

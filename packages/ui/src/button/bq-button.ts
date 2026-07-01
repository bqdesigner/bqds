import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Botão base do BQDS.
 * Forma padrão pill. Consome tokens via CSS custom properties (--bq-*).
 *
 * @slot - conteúdo do botão (label; ou o ícone quando icon-only)
 * @slot icon - ícone à direita do label (modo icon-right)
 */
@customElement('bq-button')
export class BqButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--bq-font-family-sans);
      font-weight: var(--bq-font-weight-medium);
      line-height: var(--bq-font-line-normal);
      border-radius: var(--bq-radius-full);
      border: 1px solid transparent;
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }
    button:focus-visible {
      outline: 2px solid var(--bq-color-accent);
      outline-offset: 2px;
    }
    button[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Tamanhos */
    .size-sm {
      font-size: var(--bq-font-size-sm);
      padding: var(--bq-space-1) var(--bq-space-3);
    }
    .size-md {
      font-size: var(--bq-font-size-base);
      padding: var(--bq-space-2) var(--bq-space-4);
    }
    .size-lg {
      font-size: var(--bq-font-size-lg);
      padding: var(--bq-space-3) var(--bq-space-6);
    }

    /* Icon-only → quadrado (padding igual) */
    .icon-only {
      aspect-ratio: 1;
    }
    .icon-only.size-sm {
      padding: var(--bq-space-2);
    }
    .icon-only.size-md {
      padding: var(--bq-space-3);
    }
    .icon-only.size-lg {
      padding: var(--bq-space-4);
    }

    /* Variantes */
    .primary {
      background: var(--bq-color-accent);
      color: var(--bq-color-on-accent);
    }
    .primary:hover:not([disabled]) {
      filter: brightness(0.95);
    }
    .secondary {
      background: transparent;
      color: var(--bq-color-text);
      border-color: var(--bq-color-border);
    }
    .secondary:hover:not([disabled]) {
      background: var(--bq-color-surface-hover);
    }
    .ghost {
      background: transparent;
      color: var(--bq-color-text);
    }
    .ghost:hover:not([disabled]) {
      background: var(--bq-color-surface-hover);
    }

    /* Ícone à direita: gap só existe quando há ícone no slot */
    ::slotted([slot='icon']) {
      display: inline-flex;
      margin-left: var(--bq-space-2);
    }
    .size-sm ::slotted([slot='icon']) {
      margin-left: var(--bq-space-1);
    }
  `;

  /** Estilo visual. */
  @property() variant: 'primary' | 'secondary' | 'ghost' = 'primary';

  /** Tamanho. */
  @property() size: 'sm' | 'md' | 'lg' = 'md';

  /** Só ícone (vira círculo). Ícone vai no slot padrão. */
  @property({ type: Boolean, attribute: 'icon-only' }) iconOnly = false;

  /** Desabilita o botão. */
  @property({ type: Boolean }) disabled = false;

  render() {
    const classes = {
      [this.variant]: true,
      [`size-${this.size}`]: true,
      'icon-only': this.iconOnly,
    };
    return html`
      <button class=${classMap(classes)} ?disabled=${this.disabled}>
        <slot></slot>
        ${this.iconOnly ? nothing : html`<slot name="icon"></slot>`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bq-button': BqButton;
  }
}

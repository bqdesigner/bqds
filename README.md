# BQDS

Design System do Bruno. Base por trás do site, blog e projetos futuros.

- **Tokens** (`packages/tokens`) — fonte única de cores, tipografia, espaçamento (escala 4px), raio e sombra. Gera `dist/tokens.css` (CSS custom properties `--bq-*`) e `dist/tokens.js`.
- **UI** (`packages/ui`) — Web Components (Lit), prefixo `bq-` (ex: `<bq-button>`). Funcionam em qualquer HTML: vanilla, React, app futuro.
- **Storybook** — documentação viva, na raiz.

## Requisitos

- Node 20+
- pnpm 9 (`npm i -g pnpm@9`)

## Comandos

```bash
pnpm install
pnpm build:tokens     # gera packages/tokens/dist/*
pnpm storybook        # sobe Storybook em :6006 (builda tokens antes)
pnpm build-storybook  # build estático do Storybook
```

## Estrutura

```
packages/
  tokens/   src/*.json → dist/tokens.css + tokens.js  (Style Dictionary)
  ui/       src/<componente>/bq-*.ts (+ .stories.ts)  (Lit)
.storybook/  config + toolbar light/dark
docs/        foundations (cores etc) + SETUP.md
```

## Tokens

Duas camadas:

1. **Primitive** (`src/primitive.json`) — paleta crua, escalas. Não usar direto em componente.
2. **Semantic** (`src/semantic.light.json` / `semantic.dark.json`) — papéis (`bg`, `text`, `border`, `accent`…) que mapeiam pros primitivos. Componentes consomem **só estes**.

Tema via atributo no `<html>`: `data-theme="dark"`.

## Fontes

Os tokens nomeiam a **mesma família do site**: `DM Sans` (`--bq-font-family-sans`) e `DM Mono` (`--bq-font-family-mono`). O DS **não empacota** a webfont — o app consumidor precisa carregá-la (o portfolio já faz, via Google Fonts). O Storybook carrega em `.storybook/preview-head.html`.

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet" />
```

Sem a webfont, cai no fallback (`system-ui` / `ui-monospace`).

## Dark mode

O `tokens.css` já traz os dois temas: `:root` (light) + `[data-theme="dark"]`. Os componentes herdam automaticamente — os tokens semânticos (`--bq-color-*`) atravessam o shadow DOM. **Nenhuma mudança no componente é necessária.**

Ativar no consumidor (mesma mecânica do site atual):

```js
// dark
document.documentElement.setAttribute('data-theme', 'dark');
// light
document.documentElement.setAttribute('data-theme', 'light');
```

Persistir a escolha (opcional, como o portfolio faz):

```js
const saved = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', saved);
// no toggle:
localStorage.setItem('theme', next);
```

No **Storybook**, use o toggle **Theme** (sol/lua) na toolbar pra alternar light/dark em qualquer story.

## Consumir no portfolio (migração — fase posterior)

1. Importar `packages/tokens/dist/tokens.css`.
2. Substituir o `:root` de `css/core.css` pelos `--bq-*`.
3. Trocar componentes um a um por `<bq-*>`.

> Os nomes antigos do portfolio (`--color-dark`, `--color-accent`…) podem ganhar aliases mapeando pros `--bq-*` durante a transição, pra não quebrar o site de uma vez.

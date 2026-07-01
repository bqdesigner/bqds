# CLAUDE.md — BQDS

Design System que serve o portfolio (site + blog) e projetos futuros. Vira repo separado no GitHub (`bqds`, público).

## Princípios

- **Componentes = Web Components (Lit)**, prefixo `bq-`. Nada de framework-specific. Devem rodar em vanilla, React e app futuro.
- **Componente nunca usa primitive nem hex.** Só tokens semânticos (`var(--bq-color-text)` etc).
- **Token semântico** decide o tema. Adicionou cor nova? Define em `semantic.light.json` E `semantic.dark.json`.
- **Escala 4px** pra spacing/radius. Não inventar valores soltos.
- Surgical changes, simplicidade primeiro (ver guidelines da raiz).

## Fluxo ao adicionar componente

1. `packages/ui/src/<nome>/bq-<nome>.ts` (Lit, consome `--bq-*`).
2. `bq-<nome>.stories.ts` ao lado.
3. Export em `packages/ui/src/index.ts`.
4. `pnpm storybook` → verificar nos dois temas (toolbar light/dark).

## Fluxo ao adicionar/alterar token

1. Editar `packages/tokens/src/*.json` (primitive vs semantic conforme o caso).
2. `pnpm build:tokens` → confere `--bq-*` em `dist/tokens.css`.
3. Storybook recarrega via import do `dist/tokens.css`.

## Comandos

```bash
pnpm install
pnpm build:tokens
pnpm storybook
```

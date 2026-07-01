# BQDS — Setup Proposal

> Design System do Bruno. Base por trás do site, blog e projetos futuros.
> **Status:** proposta para validação. Nada construído ainda.

---

## 1. Objetivo e escopo

- **O que é:** design system único que serve o `portfolio` (site + blog) hoje e qualquer projeto futuro.
- **Consumidores:** portfolio vanilla (site) + blog Next.js hoje. Stack futura indefinida (web agora, app depois).
- **Não-consumidores:** `melon-focus`, `recorder-awesome` (fora de escopo, por decisão).
- **Futuro:** vira repositório separado no GitHub. Por isso nasce isolado e autocontido.
- **Web primeiro, app depois.** Arquitetura precisa não travar a versão app no futuro.

### Critério de sucesso do setup
1. `pnpm install && pnpm storybook` sobe o Storybook com 1 token doc + 1 componente exemplo. → verify: abre no browser
2. `pnpm build` em `packages/tokens` gera `tokens.css` consumível por CSS vanilla. → verify: arquivo existe com `--bq-*`
3. Portfolio consegue importar `tokens.css` e renderizar igual ao atual. → verify: comparação visual

---

## 2. Decisões já validadas

| Decisão | Escolha | Por quê |
|---|---|---|
| Camada de componente | **Web Components** | `<bq-button>` funciona em vanilla, React, app futuro — sem reescrever. Não prende a framework. |
| Estrutura do repo | **Monorepo leve (pnpm workspaces)** | `tokens` consumível sozinho pelo portfolio sem puxar componentes. Padrão de DS. |
| Fonte dos tokens | **Extrair do portfolio** | Já existe tema light/dark (`--color-*`, DM Sans/Mono). Mantém o site consistente na migração. |

---

## 3. Decisões pendentes (preciso do seu ok)

| # | Decisão | Recomendação | Alternativa |
|---|---|---|---|
| D1 | Lib de Web Components | **Lit** — pequena (~5kb), TS nativo, ótimo suporte no Storybook, menos boilerplate | Custom elements puros (zero dep, mais verboso) |
| D2 | Tooling de tokens | **Style Dictionary** — padrão de mercado, gera CSS + JS + (futuro) iOS/Android do mesmo source | CSS vars escritas à mão (simples, mas sem saída multiplataforma pro app) |
| D3 | Camadas de token | **Primitive + Semantic** (2 camadas) | Só semantic (como o portfolio é hoje) |
| D4 | Prefixo | **`bq`** (`--bq-color-*`, `<bq-button>`) | outro |

> D1 e D2 são as que mais mudam o boilerplate. Se quiser começar minimalista, dá pra adiar Style Dictionary e escrever CSS vars à mão na v0.

---

## 4. Estrutura proposta

```
projects/bqds/
├── package.json            # workspace root, scripts (storybook, build)
├── pnpm-workspace.yaml      # aponta pra packages/*
├── tsconfig.base.json
├── .storybook/             # config do Storybook (web-components-vite)
│   ├── main.ts
│   └── preview.ts          # carrega tokens.css + toolbar light/dark
├── docs/
│   └── SETUP.md            # este arquivo
└── packages/
    ├── tokens/
    │   ├── src/            # source de verdade dos tokens
    │   │   ├── primitive.json   # paleta crua, escala type/space
    │   │   └── semantic.json    # papéis (bg, text, accent) + light/dark
    │   ├── build.ts        # Style Dictionary (se D2 = sim)
    │   └── dist/           # gerado: tokens.css, tokens.js, theme.ts
    └── ui/
        ├── src/
        │   ├── button/
        │   │   ├── bq-button.ts        # web component (Lit)
        │   │   └── bq-button.stories.ts
        │   └── index.ts
        └── package.json
```

---

## 5. Tokens — base extraída do portfolio

Valores reais hoje em `portfolio/css/core.css`. Viram o source do BQDS.

### Tipografia
- `--bq-font-sans: 'DM Sans', system-ui, sans-serif`
- `--bq-font-mono: 'DM Mono', ui-monospace, monospace`
- Escala type/space/radius/shadow: **a definir** (portfolio não tem escala formal — oportunidade de criar no DS).

### Cor — semantic (light / dark)
| Token (semantic) | Light | Dark | Papel |
|---|---|---|---|
| `--bq-color-dark`   | `#111111` | `#F0F0F0` | texto forte / inversão |
| `--bq-color-deep`   | `#191819` | `#E8E8E8` | texto principal |
| `--bq-color-mid`    | `#6C757D` | `#9CA3AF` | texto secundário |
| `--bq-color-low`    | `#E9ECEF` | `#2A2A2A` | bordas / divisores |
| `--bq-color-light`  | `#FFFFFF` | `#191819` | fundo |
| `--bq-color-muted`  | `#ADB5BD` | `#6B7280` | texto desabilitado |
| `--bq-color-accent` | `#1DA1F2` | `#1DA1F2` | marca / ação |
| `--bq-color-hover`  | `#F7F7F7` | `#2A2A2A` | hover surface |
| `--bq-color-fixed-dark`  | `#191819` | — | fixo (não inverte) |
| `--bq-color-fixed-light` | `#FFFFFF` | — | fixo (não inverte) |

> **Nota:** os nomes atuais são por *tom* (dark/mid/low), não por *papel* (bg/text/border). Recomendo D3 = adicionar camada semantic por papel (`--bq-color-text`, `--bq-color-bg`, `--bq-color-border`) mapeando pros primitivos. Facilita troca de tema e leitura. Mantemos os nomes antigos como alias na migração pra não quebrar o portfolio.

---

## 6. Stack do setup

| Camada | Ferramenta | Versão alvo |
|---|---|---|
| Package manager | pnpm (workspaces) | 9.x |
| Linguagem | TypeScript | 5.x |
| Componentes | Lit (D1) | 3.x |
| Tokens | Style Dictionary (D2) | 4.x |
| Storybook | `@storybook/web-components-vite` | 8.x |
| Bundler | Vite | 5.x |

---

## 7. Migração do portfolio (fase posterior, não no setup)

1. BQDS publica `tokens.css` (local via workspace ou build copiado).
2. Portfolio importa `tokens.css` no lugar do `:root` em `core.css`.
3. Aliases garantem que `--color-*` continue funcionando durante a transição.
4. Componentes migram um a um: `.btn` → `<bq-button>`.

> Blog (Next.js) consome os mesmos tokens via CSS import — Web Components funcionam em React/Next sem adaptação.

---

## 8. Plano de execução do setup (após validação)

```
1. Scaffold monorepo (package.json, pnpm-workspace, tsconfig)   → verify: pnpm install ok
2. packages/tokens: source JSON + build → dist/tokens.css        → verify: --bq-* no output
3. .storybook config + 1 doc page de tokens (cores/type)         → verify: storybook sobe
4. packages/ui: <bq-button> exemplo + story                      → verify: render no storybook
5. README + CLAUDE.md do projeto                                 → verify: instruções rodam
```

Entrega do setup = esqueleto rodando com tokens + 1 componente. Biblioteca completa vem depois, incremental.

---

## 9. Perguntas abertas pra você

- D1–D4 acima.
- Escala de **spacing / radius / type** — defino eu (proposta baseada em 4/8px) ou você já tem preferência?
- Nome no GitHub: `bqds` mesmo? Público ou privado?
```

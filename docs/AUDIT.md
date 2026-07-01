# BQDS — Audit do site + blog

> Mapeamento do que o **portfolio** (site vanilla) e o **blog** (Next.js) usam hoje,
> já filtrado pelas decisões de curadoria do Bruno. Base pra evoluir tokens e criar componentes.
>
> **Fonte:** `portfolio/css/{core,index,case,manda-freelas}.css` + `portfolio/blog/app/**/*.module.css`.
> **Fora de escopo:** componentes exclusivos da página **manda-freelas** (form multi-step, service/payment cards).

---

## Decisões travadas (30/06/2026)

1. **Radius:** escala enxuta (colapsar os 10 valores atuais).
2. **Tipografia:** texto fixo + display fluido (clamp); line-height e tracking colapsados. *(recomendação abaixo — confirmar)*
3. **Spacing:** adicionar os grandes (80/96/128/160) e 28/36; off-grid arredonda pro grid 4px.
4. **Botões:** forma padrão **pill**; enxugar variantes; toda variante ganha modificadores **icon-right** e **icon-only**.
5. **Componentes:** implementar os marcados ✅ na tabela — exceto os de manda-freelas.

---

## 1. Spacing (escala 4px)

Estado atual do token: `space-0..16`. **Alterações a aplicar:**

| Token | px | Status |
|---|---|---|
| space-0 | 0 | ok |
| space-1 | 4 | ok |
| space-2 | 8 | ok |
| space-3 | 12 | ok |
| space-4 | 16 | ok |
| space-5 | 20 | ok |
| space-6 | 24 | ok |
| **space-7** | **28** | ➕ adicionar |
| space-8 | 32 | ok |
| **space-9** | **36** | ➕ adicionar |
| space-10 | 40 | ok |
| space-12 | 48 | ok |
| space-16 | 64 | ok |
| **space-20** | **80** | ➕ adicionar |
| **space-24** | **96** | ➕ adicionar |
| **space-32** | **128** | ➕ adicionar |
| **space-40** | **160** | ➕ adicionar |

**Off-grid encontrados → arredondar:** 2→(caso especial/borda, não tokenizar) · 6→8 · 10→8 ou 12 · 14→16 · 18→20 · 22→24 · 101→(one-off, dropar).

---

## 2. Radius — escala enxuta

Atual no token: `none, sm(4), md(8), lg(12), xl(16), full`. **Adicionar `2xl(24)`** e mapear o resto:

| Token | px | Uso alvo |
|---|---|---|
| radius-none | 0 | reset |
| radius-sm | 4 | tags, focus outline |
| radius-md | 8 | **cards, inputs** (padrão) |
| radius-lg | 12 | superfícies grandes (hero, footer-cta, imagens) |
| radius-xl | 16 | avatar quadrado, cards destaque |
| **radius-2xl** | **24** | ➕ box newsletter / cards grandes |
| radius-full | 9999 | pills, círculos, avatares redondos |

**Colapso dos valores reais:** 6→sm/md · 10→md · 14→lg · 18→xl · 20→2xl · 500px/999px/50%→full.

---

## 3. Tipografia

**Famílias** (já no DS): `font-family-sans` = DM Sans · `font-family-mono` = DM Mono (labels/categoria/código).

### Pesos — adicionar `light`
| Token | valor | uso |
|---|---|---|
| **font-weight-light** | **300** | ➕ hero-sub, case-section-text (texto grande fino) |
| font-weight-regular | 400 | corpo, títulos de artigo |
| font-weight-medium | 500 | **dominante** — títulos, botões, labels |
| font-weight-semibold | 600 | post-title, botões sólidos |
| font-weight-bold | 700 | footer email, admin/login title |

### Escala de TEXTO (fixa)
| Token | px | uso |
|---|---|---|
| font-size-xs | 12 | labels, meta, credit |
| font-size-sm | 14 | corpo secundário, botões |
| font-size-base | 16 | corpo |
| font-size-lg | 18 | corpo grande / lead |
| font-size-xl | 20 | subtítulo |
| font-size-2xl | 24 | subtítulo grande |

> Micro-labels 10/11px (uppercase mono) → usar `xs` + tracking; evitar tokens <12.
> One-off 13/15/17/22px → arredondar pra escala.

### Escala de DISPLAY (fluida — `clamp`) ➕ nova
Derivada dos clamps reais do site/blog. Confirmar valores:
| Token | clamp(min, vw, max) | origem |
|---|---|---|
| font-display-sm | clamp(28px, 4vw, 40px) | case-section-title, títulos de seção |
| font-display-md | clamp(32px, 5vw, 62px) | título de artigo, tag page |
| font-display-lg | clamp(40px, 6vw, 78px) | hero-title (home) |
| font-display-xl | clamp(48px, 7vw, 104px) | blog index title |
| font-display-2xl | clamp(64px, 11vw, 176px) | footer-bigname, freelas hero (display máx) |

### Line-height — colapsar (15 → 4)
| Token | valor | mapeia |
|---|---|---|
| line-tight | 1.1 | 0.9 / 0.95 / 1 / 1.05 / 1.1 / 1.15 |
| line-snug | 1.25 | 1.2 / 1.25 / 1.3 |
| line-normal | 1.5 | 1.4 / 1.5 / 1.55 |
| line-relaxed | 1.65 | 1.6 / 1.65 / 1.75 |

### Letter-spacing / tracking — colapsar (9 → 4)
| Token | valor | uso |
|---|---|---|
| tracking-tighter | -0.03em | display grande |
| tracking-tight | -0.015em | títulos |
| tracking-normal | 0 | corpo |
| tracking-wide | 0.14em | labels UPPERCASE (mono) |

---

## 4. Botões

**Modelo unificado.** Forma padrão = **pill** (`radius-full`).

- **Variantes** (enxutas): `primary` (fill accent) · `secondary` (outline) · `ghost` (texto, sem borda).
- **Tamanhos:** `sm` · `md` (default) · `lg`.
- **Modificadores (em todas as variantes):**
  - `icon-right` — ícone depois do label (slot trailing).
  - `icon-only` — só ícone, vira círculo (pill quadrado). Cobre back-to-top, card-desc-action, menu-trigger.
- Estados: hover, active, focus-visible (outline accent), disabled.

**Consolidação do que existe hoje:**
| Real | → vira |
|---|---|
| newsletterBtn, loginBtn, adminBtn, `.active` de filtros | `primary` |
| shareBtn, cf-tipo-btn, about-me-btn, filterBtn (inativo) | `secondary` |
| adminBtnSecondary, cf-back-btn | `ghost` |
| back-to-top, card-desc-action, menu-trigger | `icon-only` |

> Inconsistência a corrigir: primary hoje aparece ora pill ora radius-10 → **padroniza pill**.
> **Fora do botão** (viram componentes próprios): filtro/chip toggle e segmented (lang/tema) — ver §5.

---

## 5. Backlog de componentes (v1)

Prioridade: **P1** = base, muito reuso · **P2** = importante · **P3** = depois.
Marcados conforme a tabela do chat. Manda-freelas **excluído**.

| Componente | P | Origem (refs) | Notas |
|---|---|---|---|
| `bq-button` | P1 | core (menu-trigger, back-to-top), blog (newsletter/login/admin/share/filter) | já iniciado; expandir p/ §4 |
| `bq-icon-button` | P1 | back-to-top, card-desc-action, menu-trigger | = botão `icon-only`; avaliar se é variante ou componente |
| `bq-tag` / `bq-badge` | P1 | nav-tag, post-cat, article-tag, blog featured badge | radius-sm/full, uppercase, mono |
| `bq-card` | P1 | case cards, post-card, about-me-inner, blog cards | superfície + borda + radius-md; slots |
| `bq-input` | P2 | login, newsletter (blog) | radius-md/8; estados focus/error |
| `bq-textarea` | P3 | (blog n/a — vem de freelas) | ⚠️ só se surgir uso fora de freelas; **hold** |
| `bq-avatar` | P2 | about-quote-photo, blog author | radius-full ou xl; tamanhos |
| `bq-link` | P2 | footer-cta-email, footer-col a | underline reveal animado |
| `bq-chip` (filtro toggle) | P2 | blog filterBtn / filterBtnActive | pill, estado ativo=fill |
| `bq-segmented` (toggle) | P2 | header-controls, menuOverlayControls (lang/tema) | grupo, item ativo |
| `bq-prose` (corpo de artigo) | P2 | blog Article body (h2/h3/blockquote/code/callout/img) | tipografia de conteúdo longo |
| `bq-scroll-indicator` | P3 | index, (freelas) | chevrons animados |
| **Header** (pattern) | P3 | site + blog (**duplicado**) | composição, não átomo |
| **Footer** (pattern) | P3 | site + blog (**duplicado**) | composição (CTA + grid + bigname) |
| **Menu overlay** (pattern) | P3 | site + blog (**duplicado**) | composição fullscreen |

> **Ganho de duplicação:** Header / Footer / Menu estão implementados 2× (site e blog). Unificá-los no DS é o maior retorno — mas são composições, entram depois dos átomos.

---

## 6. Como usar este doc

Bruno vai jogar **referências visuais** numa pasta pra guiar a criação. Sugestão de fluxo:
1. Refs por componente em `docs/refs/<componente>/` (prints, links, anotações).
2. Cada componente novo: cria `packages/ui/src/<componente>/bq-<componente>.ts` + `.stories.ts`, consome só tokens semânticos.
3. Este audit é a fonte da verdade dos tokens-alvo — ao implementar, atualizar `packages/tokens/src/*.json` conforme §1–3.

### Status da tokenização
Tudo do §1–3 **aplicado** em `packages/tokens/src/primitive.json` e visível no Storybook (Foundations):
- Spacing: +space-7/9/20/24/32/40 · Radius: +radius-2xl · Weight: +light(300)
- Display fluido (clamp), line-height (4) e tracking (4) tokenizados
- Micro-labels: **sem** token <12px (usar xs + tracking-wide) — decisão mantida

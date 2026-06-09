# Design Spec — BioSearch Landing Page

**Data:** 2026-06-08
**Arquivo alvo:** `frontend/public/index.html`

---

## Contexto

O `index.html` atual é uma cópia da `start.html` — uma tela de entrada simples sem identidade de produto. O objetivo é substituí-lo por uma landing page completa que reflita o design do Figma: fundo verde escuro, curva SVG orgânica percorrendo o layout, tipografia Nunito arredondada e seções suficientes para comunicar o produto antes do cadastro.

---

## Referência visual

Screenshot do Figma: fundo `#032221` com radial gradient sutil clarendo no canto inferior direito, linha SVG sinuosa como elemento central de decoração, sparkles espalhados, ilustração de planta no hero.

---

## Paleta e tipografia

| Token | Valor |
|---|---|
| Fundo base | `#032221` |
| Fundo radial (glow) | `radial-gradient(ellipse 60% 50% at 80% 80%, #1a4d2e 0%, transparent 70%)` |
| Verde botão | `#335441` |
| Verde botão hover | `#1a3328` |
| Verde médio (upload btn) | `#86b07a` |
| Acento cyan | `#A8FCE9` |
| Acento turquesa | `#4ECDAE` |
| Texto primário | `#ffffff` |
| Texto secundário | `rgba(255,255,255,0.6)` |
| Linha SVG | `rgba(168, 252, 233, 0.25)` |
| Fonte | Nunito (Google Fonts), fallback `Arial, sans-serif` |

---

## Estrutura de seções

### 1. Navbar
- `position: sticky; top: 0`
- Fundo: `rgba(3, 34, 33, 0.85)` com `backdrop-filter: blur(8px)`
- Esquerda: `BioSearch` em Nunito 600
- Centro: links `About`, `What do we offer?`, `Contact`
- Direita: botão pill `Get started` → `pages/signup.html`
- Mobile: links somem, mantém logo + botão

### 2. Hero
- Duas colunas: texto à esquerda, placeholder de planta à direita
- Título: `"Discover all the plants near you."` — Nunito 700, ~64px desktop / 40px mobile
- Subtítulo: uma linha curta descrevendo a IA
- Botão primário: `Get started` pill arredondado
- Grupo de avatares: 3 círculos sobrepostos com iniciais + texto `"Join thousands of plant lovers"`
- Placeholder planta: `div` com borda dashed + texto "[ plant image ]", `200×200px`

### 3. Linha SVG decorativa
- `<svg>` com `position: absolute`, cobrindo toda a altura da página (`100%` width, altura total)
- Um `<path>` único sinuoso: começa no centro-topo, serpenteia em S até o footer
- `stroke: rgba(168, 252, 233, 0.25)`, `stroke-width: 1.5`, `fill: none`
- Não bloqueia cliques: `pointer-events: none`

### 4. Sparkles
- 8–10 elementos `<span class="sparkle">✦</span>` espalhados com `position: absolute`
- Tamanhos variados (10px–18px), opacidade 0.3–0.6
- Posicionados manualmente para não colidir com texto

### 5. What do we offer?
- Título centralizado da seção
- 3 cards em row (desktop) / coluna (mobile):
  - **Discover Species** — identifique espécie e família botânica
  - **Share your progress** — salve e acompanhe suas plantas
  - **Direct informations** — cuidados, saúde e alertas em linguagem simples
- Cards: fundo `rgba(255,255,255,0.05)`, border `rgba(255,255,255,0.08)`, border-radius 16px, sem sombra pesada

### 6. Footer
- Fundo: continua o gradiente, sem cor distinta
- Linha separadora `1px solid rgba(255,255,255,0.1)`
- Esquerda: `BioSearch` + tagline curta
- Direita: links `Sign In`, `Sign Up`, `Privacy`, `Terms`
- Mobile: empilhado, centralizado

---

## Layout e arquivos

| Arquivo | Ação |
|---|---|
| `frontend/public/index.html` | Substituir conteúdo — landing page completa com CSS embutido em `<style>` |
| `frontend/public/src/styles/` | Não criar arquivo CSS separado (landing é auto-contida) |
| Assets referenciados | `src/assets/logo.png` (navbar), placeholder para planta |

O CSS fica dentro do próprio `index.html` em `<style>` para manter a página auto-contida sem dependência de roteamento. Fonte Nunito via Google Fonts CDN.

---

## Responsividade

- Breakpoint único: `768px`
- Hero vira coluna única (placeholder de planta some ou fica abaixo)
- Navbar colapsa links, mantém logo + botão
- Cards de oferta viram coluna

---

## Verificação

1. Abrir `http://localhost:8000/` (servidor Python na raiz)
2. Checar: gradiente visível, linha SVG percorre o layout, sparkles aparecem, Nunito carrega
3. Redimensionar para < 768px: hero empilha, links somem
4. Clicar "Get started": navega para `pages/signup.html`
5. Clicar "Sign In" no navbar: navega para `pages/signin.html`

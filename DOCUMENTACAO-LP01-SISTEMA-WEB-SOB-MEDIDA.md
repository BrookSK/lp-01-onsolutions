# Documentação — Landing Page 01: Sistema Web Sob Medida | ON Solutions Brasil

> Documento técnico de referência para manutenção da landing page. Reflete **o que realmente foi implementado**, não apenas o previsto.

---

## 1. Objetivo e escopo

**Objetivo:** apresentar e converter o serviço de desenvolvimento de **sistemas web sob medida** da ON Solutions Brasil, conduzindo o visitante a iniciar uma conversa com a equipe comercial pelo **WhatsApp**, com a mensagem já pré-preenchida.

**Escopo:** site estático de **página única** — exclusivamente a Landing Page 01. Não há painel administrativo, CMS, banco de dados, backend, rotas adicionais nem arquitetura compartilhada. A entrega é esta landing page, completa e funcional.

---

## 2. Estrutura dos arquivos e responsabilidades

```
lp-01-onsolutions/
├── index.html                              # Marcação, metadados (SEO), estrutura das seções
├── css/
│   └── styles.css                          # Todo o estilo da página (extraído da referência)
├── js/
│   └── main.js                             # Todo o comportamento (WhatsApp, dores, header, carrossel, tracking)
├── assets/
│   └── img/
│       ├── favicon.png                      # Favicon 64×64 (logo ON Solutions, original da referência)
│       ├── on-logo.png                      # Logo ON Solutions 96×96 (header + card WhatsApp)
│       ├── cliente-braziliana.png           # Logos de clientes (originais da referência)
│       ├── cliente-quatri-automacao.png
│       ├── cliente-brooks-construtora.png
│       ├── cliente-crosshr.png
│       ├── cliente-multilife-care.png
│       └── cliente-mafedo-engenharia.png
├── DOCUMENTACAO-LP01-SISTEMA-WEB-SOB-MEDIDA.md
└── README.md
```

Decisão de arquitetura: o projeto estava vazio (apenas Git + README e pastas `assets/`, `css/`, `js/`, `_referencia/`). Como não havia tecnologia de backend, framework ou dependências, a solução mais simples e adequada é um **site estático (HTML + CSS + JS puro)** — exatamente a natureza da referência. HTML, CSS e JS foram **separados em arquivos** para facilitar a manutenção, preservando 100% do comportamento da referência.

---

## 3. Estrutura completa das seções (na ordem)

1. **Header** (`.top`) — logo, nome, telefone e botão "Orçamento". Fixo no topo, com blur e comportamento de ocultar/mostrar no scroll.
2. **Hero** (`.hero`) — selo "Orçamento direto no WhatsApp", título com destaque turquesa, subtítulo, lista de benefícios (desktop), indicadores de confiança e **card ilustrativo de conversa do WhatsApp** com balão de prévia da mensagem.
3. **Dores** (`#dores`) — "Qual é o seu maior problema hoje?" com 4 opções selecionáveis que alimentam a mensagem dinâmica.
4. **Benefícios** (`#beneficios`) — 4 cards (Feito sob medida, Controle de acesso, Relatórios na hora, Conectado ao que você usa).
5. **Clientes e indicadores** (`#clientes`) — stats (100+, 50+, Brasil e exterior) e **carrossel contínuo** de clientes.
6. **Como funciona** (`#como-funciona`) — 3 passos.
7. **Conversa gratuita / Oferta** (`#oferta`) — bloco escuro com o que o cliente leva da conversa.
8. **Dúvidas / FAQ** (`#duvidas`) — 3 perguntas em `<details>`/`<summary>`.
9. **CTA final** (`#conversa`) — reforço para usar o botão fixo.
10. **Footer** (`.foot`) — identidade, e-mail e links legais.
11. **Botão fixo de WhatsApp** (`.sticky`) — "Pedir orçamento no WhatsApp", sempre visível.

---

## 4. Identidade visual

### 4.1. Paleta de cores (variáveis CSS preservadas)

| Variável   | Valor     | Uso principal |
|------------|-----------|---------------|
| `--ink`    | `#0B1220` | Fundos escuros, identidade principal, theme-color |
| `--navy`   | `#0F172A` | Fundos secundários, numeração dos passos |
| `--bg`     | `#F5F8FB` | Fundo claro predominante |
| `--line`   | `#E2E8F0` | Bordas e divisores |
| `--text`   | `#0F172A` | Texto principal |
| `--soft`   | `#52627A` | Texto auxiliar |
| `--mint`   | `#5EEAD4` | Destaques, títulos de contraste, selo |
| `--teal`   | `#0D9488` | Destaque / outline de foco |
| `--tealD`  | `#0F766E` | Textos/elementos verde-petróleo, eyebrow |
| `--wa`     | `#25D366` | Botões de WhatsApp |
| `--waD`    | `#1EBE5B` | Hover dos botões de WhatsApp |

### 4.2. Tipografia

Família **Poppins** (pesos 400, 500, 600, 700, 800) via Google Fonts, com `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com`. Fallback: `"Segoe UI", system-ui, -apple-system, sans-serif`.

### 4.3. Direção visual

Estética tecnológica, moderna, clean, profissional e comercial — tons escuros com verde-petróleo/turquesa e verde WhatsApp. Gradientes radiais discretos no Hero e na seção final.

---

## 5. Funcionalidades implementadas

- **Header dinâmico no scroll:** oculta ao rolar para baixo (`.top.hide`), reaparece ao rolar para cima; permanece visível perto do topo (< 80px) e ao receber foco por teclado (`focusin`).
- **Seleção de dores:** botões `.pain` com `aria-pressed`; permite marcar/desmarcar e selecionar várias. Estado visual (borda verde + ícone de confirmação) quando marcado.
- **Mensagem dinâmica do WhatsApp:** cada seleção reescreve a mensagem de todos os botões principais (`[data-wa-main]`) e atualiza a prévia no balão do Hero (`[data-bubble]`).
- **Texto de orientação (`[data-hint]`, `aria-live="polite"`):** vazio sem seleção; "Pronto! …" com 1 marcada; "Você marcou N. …" com 2+.
- **Carrossel contínuo de clientes:** duplicação dos itens para loop infinito, velocidade proporcional à largura, pausa ao toque; respeita `prefers-reduced-motion`.
- **FAQ expansível:** `<details>`/`<summary>` nativo (acessível por teclado e mobile).
- **Animações:** pulso do selo (`ping`), brilho do CTA (`shine`), entrada do botão fixo (`up`), transições de hover e seleção. Todas desligadas com `prefers-reduced-motion: reduce`.

---

## 6. Integração com WhatsApp e mensagens dinâmicas

- **Número:** `5511972243329` — link-base `https://wa.me/5511972243329`.
- **Codificação:** `encodeURIComponent()` aplicado à mensagem (função `waLink`).
- **Pontos de acesso (todos funcionam):** telefone do header, botão "Orçamento" do header, botão fixo inferior e qualquer elemento com `data-wa`.
- **Mensagem padrão:** `Olá, vim do site e gostaria de saber mais sobre os serviços de Sistemas Web.`
- **Mensagem personalizada:**
  - 1 dor marcada → acrescenta ` Meu maior desafio hoje: [desafio].`
  - 2+ dores → acrescenta ` Meus maiores desafios hoje: [d1]; [d2]; …`
- **Sincronização:** todos os `[data-wa-main]` (header telefone, header botão, barra fixa) usam sempre a mesma mensagem atualizada.
- **Abertura externa:** `target="_blank"` + `rel="noopener"`.
- **Origem de anúncio:** se existirem `utm_term`/`kw`, `utm_campaign` ou `gclid` na URL, acrescenta `\nOrigem: anúncio | Termo: … | Campanha: …` à mensagem. Controlado por `ON_APPEND_ORIGIN = true`. Sem parâmetros, nada é acrescentado.

---

## 7. Configurações de rastreamento (GTM / GA4 / Google Ads)

Estrutura **preparada, porém não ativada** (sem IDs fictícios), em `js/main.js`:

```js
var ON_TRACKING = { gtmId: "", ga4Id: "", gadsId: "", gadsConversionLabel: "" };
```

- **Carregamento condicional:** os scripts externos (GTM, gtag/GA4/Ads) só são carregados quando houver ID preenchido. Com os campos vazios, **nada é carregado** (sem requisições desnecessárias).
- **Eventos:**
  - `whatsapp_click` → `dataLayer.push({ event, service, position })` em todo clique em link `wa.me` (captura por `data-pos`: `topo`, `topo-telefone`, `barra-fixa`, ou `link`).
  - `generate_lead` → disparado via `gtag` quando houver GA4/Ads configurado.
  - `conversion` (Google Ads) → disparado apenas quando existirem `gadsId` **e** `gadsConversionLabel`.
- Sem disparos duplicados; sem conversões fictícias.

**Como ativar (futuro):** preencher os IDs em `ON_TRACKING` no `js/main.js`.

---

## 8. Configurações de SEO e metadados

| Item | Valor |
|------|-------|
| `lang` | `pt-BR` |
| `charset` | `UTF-8` |
| `viewport` | `width=device-width, initial-scale=1, viewport-fit=cover` |
| `theme-color` | `#0B1220` |
| `title` | `Sistema Web Sob Medida \| ON Solutions Brasil` |
| `description` | `Chega de adaptar a rotina a um software de prateleira.` |
| `robots` | `noindex,follow` *(preservado — não alterar por iniciativa própria)* |
| `canonical` | `https://onsolutionsbrasil.com.br/lp/sistema-web-sob-medida/` |
| `favicon` | `assets/img/favicon.png` |

Estrutura semântica com `header`/`main`/`section`/`footer`, hierarquia de headings (`h1` único no Hero, `h2` por seção) e textos alternativos nas imagens relevantes.

---

## 9. Responsividade e breakpoints

Breakpoints preservados da referência:

- **≤ 340px** — reduz tamanho/espaço do CTA e ícone.
- **≤ 380px** — ajuste de fonte/padding do CTA e largura do container.
- **≤ 400px** — oculta o complemento "Brasil" da marca (`.brand .br`).
- **≤ 430px** — oculta a seta do CTA; ajusta padding.
- **≥ 860px (desktop)** — exibe telefone do header, Hero em 2 colunas, lista de benefícios do Hero, 4 cards de benefícios lado a lado, 3 passos, 3 stats, oferta em 2 colunas, footer em 2 colunas.

Além disso: `env(safe-area-inset-bottom)` no botão fixo e no padding inferior do footer (reserva de espaço para o botão fixo).

---

## 10. Acessibilidade

- HTML semântico; navegação por teclado; `:focus-visible` com outline (turquesa em fundos escuros).
- `aria-pressed` nos botões de dores; `aria-live="polite"` no texto de orientação; `aria-hidden` em ícones SVG decorativos; `aria-label` em grupos/carrossel.
- FAQ com `<details>`/`<summary>` (acessível por teclado).
- `prefers-reduced-motion: reduce` desativa animações automáticas e o carrossel.
- Textos alternativos nas imagens do logo.

---

## 11. Performance

- CSS e JS externos e enxutos; sem bibliotecas/frameworks; sem requisições duplicadas.
- Imagens externalizadas em PNG (favicon, logo ON e logos de clientes) em vez de Base64 inline, mantendo o HTML enxuto (~12 KB) e permitindo cache do navegador.
- Scripts de rastreamento carregados apenas sob demanda (quando há IDs).
- Fontes via Google Fonts com `preconnect` e `display=swap`.

---

## 12. Instruções para execução e manutenção

**Executar localmente:** abrir `index.html` no navegador, ou servir a pasta com um servidor estático, por exemplo:

```powershell
# a partir da raiz do projeto
python -m http.server 8000
# acessar http://localhost:8000
```

**Publicar:** copiar `index.html`, `css/`, `js/` e `assets/` para qualquer hospedagem de site estático (o canonical aponta para `https://onsolutionsbrasil.com.br/lp/sistema-web-sob-medida/`).

**Manutenção comum:**
- Alterar número do WhatsApp → `WA_NUMBER` em `js/main.js`.
- Ativar rastreamento → preencher `ON_TRACKING` em `js/main.js`.
- Editar textos/seções → `index.html`.
- Ajustar estilos/cores → variáveis `:root` em `css/styles.css`.

---

## 13. Checklist de testes realizados

Testes automatizados executados contra o `index.html` e `js/main.js` reais (jsdom) — **17/17 aprovados**:

- [x] 3 links `[data-wa-main]` (header telefone, header botão, barra fixa).
- [x] Todos os links apontam para `https://wa.me/5511972243329?text=`.
- [x] Origem de anúncio anexada quando há `utm_term`/`utm_campaign`.
- [x] `target="_blank"` + `rel="noopener"` em todos.
- [x] 4 botões de dores; `aria-pressed` alterna ao clicar.
- [x] Prévia no balão atualiza com 1 dor ("Meu maior desafio hoje: …").
- [x] Hint "Pronto! …" com 1 dor.
- [x] Links sincronizam com a seleção.
- [x] Mensagem plural com 2+ dores ("Meus maiores desafios hoje: …; …").
- [x] Hint "Você marcou 2. …" com 2 dores.
- [x] Desmarcar reverte corretamente; limpar volta à mensagem padrão.
- [x] 3 itens de FAQ em `<details>`.
- [x] `ON_TRACKING` vazio (sem IDs fictícios).
- [x] `gtag` não é carregado sem IDs.
- [x] Evento `whatsapp_click` com `service` e `position`.
- [x] Sintaxe JS validada (`node --check`).
- [x] Imagens válidas: `favicon.png` (64×64), `on-logo.png` (96×96) e os 6 logos de clientes (extraídos da referência).

---

## 14. Pendências e configurações a preencher posteriormente

1. **IDs de rastreamento (externos):** `gtmId`, `ga4Id`, `gadsId`, `gadsConversionLabel` em `js/main.js` estão **vazios**. A integração está *preparada*, não *ativa* — preencher quando houver as contas. Não foram inseridos IDs fictícios.

2. **Logotipos dos clientes e marca ON — RESOLVIDO.** Os 6 logotipos de clientes (Braziliana, Quatri Automação, Brooks Construtora, CrossHR, MultiLife Care, Mafedo Engenharia) e o logotipo da ON Solutions foram extraídos byte-a-byte do arquivo de referência original (`landing-pages/01-lp-sistema-web-sob-medida.html`) e salvos como PNGs reais em `assets/img/`. O carrossel usa agora `<img>` reais; apenas "Central RZ" permanece como chip de texto, pois na própria referência ele já é texto (não havia imagem). A marca ON (`on-logo.png`, 96×96) é usada no header e no card, e o favicon (64×64) é o ícone original.

3. **Links legais do footer:** "LGPD e proteção de dados" e "Política de privacidade" permanecem com `href="#"` (como na referência). Não existem páginas/destinos reais no ambiente atual; nenhum URL fictício foi inventado. Apontar para os documentos reais quando existirem.

---

## 15. Observações de fidelidade à referência

- Conteúdo textual comercial preservado integralmente (copy, benefícios, indicadores 100+/50+, clientes, FAQ).
- Paleta, tipografia, gradientes, sombras, animações e breakpoints preservados.
- Configuração de SEO preservada, incluindo `robots=noindex,follow` e o canonical.
- Nenhum número, cliente ou estatística inventado.
- Logotipos dos clientes e da marca ON são os materiais originais extraídos da referência. "Central RZ" permanece como chip de texto (igual à referência).
- A seção "Dúvidas" (`#duvidas`) teve o eyebrow, o título e o bloco de FAQ centralizados a pedido (ajuste de layout em relação à referência).

// Conteúdo das páginas legais. Cada página tem chave própria (separação de conteúdos).
// Os textos abaixo são EXEMPLOS de teste: substitua pelo conteúdo definitivo da empresa.
var LEGAL_PAGES = {
  "lgpd": {
    title: "LGPD e Proteção de Dados",
    text: "A empresa valoriza a privacidade e a segurança dos dados pessoais de seus usuários, adotando medidas de proteção e tratamento das informações conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)."
  },
  "politica-de-privacidade": {
    title: "Política de Privacidade",
    text: "As informações fornecidas pelos usuários, como nome, e-mail e telefone, poderão ser utilizadas para atendimento, comunicação e prestação dos serviços oferecidos pela empresa, respeitando as finalidades informadas e a legislação aplicável."
  }
};
var LEGAL_PREFIX = "on_legal_v1_";

function legalGet(key) {
  var saved = null;
  try { saved = window.localStorage.getItem(LEGAL_PREFIX + key); } catch (e) {}
  return saved !== null ? saved : LEGAL_PAGES[key].text;
}
function legalSet(key, text) { window.localStorage.setItem(LEGAL_PREFIX + key, text); }
function legalReset(key) { window.localStorage.removeItem(LEGAL_PREFIX + key); }

// Renderiza texto puro em parágrafos (textContent evita injeção de HTML)
function legalRender(el, text) {
  el.innerHTML = "";
  text.split(/\n\s*\n/).forEach(function (block) {
    block = block.trim();
    if (!block) return;
    var p = document.createElement("p");
    p.textContent = block;
    p.style.whiteSpace = "pre-line";
    el.appendChild(p);
  });
}

(function () {
  var el = document.querySelector("[data-legal]");
  if (!el) return;
  var key = el.getAttribute("data-legal");
  if (LEGAL_PAGES[key]) legalRender(el, legalGet(key));
})();

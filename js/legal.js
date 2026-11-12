// Conteúdo das páginas legais (espelha as páginas de referência em onsolutionsbrasil.com.br).
// Formato do texto: "## Título" = subtítulo, "- item" = lista, linha em branco separa blocos.
var LEGAL_PAGES = {
  "lgpd": {
    title: "LGPD e Proteção de Dados",
    text: [
      "Última atualização: 12/11/2026",
      "## Compromisso com a LGPD",
      "A ON Solutions está comprometida com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Tratamos seus dados pessoais com transparência, segurança e responsabilidade.",
      "## Controlador de Dados",
      "**ON Solutions**\nEmail: contato@onsolutionsbrasil.com.br\nEndereço:",
      "## Bases Legais para Tratamento",
      "- **Consentimento:** Newsletter, cookies de marketing\n- **Execução de contrato:** Prestação de serviços contratados\n- **Interesse legítimo:** Análises de uso, melhoria dos serviços\n- **Obrigação legal:** Cumprimento de legislação fiscal e tributária",
      "## Seus Direitos como Titular",
      "Conforme a LGPD, você possui os seguintes direitos:",
      "- Confirmação da existência de tratamento\n- Acesso aos dados\n- Correção de dados incompletos ou desatualizados\n- Anonimização, bloqueio ou eliminação de dados desnecessários\n- Portabilidade dos dados\n- Eliminação dos dados tratados com consentimento\n- Informação sobre compartilhamento\n- Possibilidade de não fornecer consentimento e consequências\n- Revogação do consentimento",
      "## Como Exercer seus Direitos",
      "Para exercer qualquer um dos direitos listados acima, entre em contato conosco através do email: contato@onsolutionsbrasil.com.br\nResponderemos sua solicitação em até 15 dias úteis.",
      "## Segurança",
      "Implementamos medidas de segurança técnicas e administrativas para proteger os dados pessoais, incluindo criptografia, controle de acesso, backups e monitoramento.",
      "## Retenção de Dados",
      "Mantemos seus dados pessoais apenas pelo tempo necessário para as finalidades para as quais foram coletados, ou conforme exigido por lei."
    ].join("\n\n")
  },
  "politica-de-privacidade": {
    title: "Política de Privacidade",
    text: [
      "Última atualização: 12/11/2026",
      "## 1. Informações que Coletamos",
      "A ON Solutions coleta informações pessoais que você nos fornece voluntariamente ao entrar em contato, assinar nossa newsletter, solicitar orçamentos ou utilizar nossos serviços. As informações podem incluir:",
      "- Nome completo\n- Endereço de email\n- Número de telefone\n- Nome da empresa\n- Informações de projeto",
      "## 2. Como Utilizamos suas Informações",
      "Utilizamos as informações coletadas para:",
      "- Responder às suas solicitações e mensagens\n- Enviar orçamentos e propostas comerciais\n- Enviar comunicações sobre nossos serviços (com consentimento)\n- Melhorar nossos serviços e experiência do usuário\n- Cumprir obrigações legais",
      "## 3. Compartilhamento de Dados",
      "Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Podemos compartilhar informações com:",
      "- Prestadores de serviço que nos auxiliam na operação do negócio\n- Autoridades legais, quando exigido por lei",
      "## 4. Segurança dos Dados",
      "Implementamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.",
      "## 5. Seus Direitos",
      "Você tem o direito de:",
      "- Acessar seus dados pessoais\n- Solicitar correção de dados incorretos\n- Solicitar exclusão de seus dados\n- Revogar consentimento\n- Solicitar portabilidade dos dados",
      "## 6. Cookies",
      "Utilizamos cookies para melhorar sua experiência em nosso site. Consulte nossa Política de Cookies para mais informações.",
      "## 7. Contato",
      "Para dúvidas sobre esta política ou exercer seus direitos, entre em contato conosco pelo email: contato@onsolutionsbrasil.com.br"
    ].join("\n\n")
  }
};
var LEGAL_PREFIX = "on_legal_v2_";

function legalGet(key) {
  var saved = null;
  try { saved = window.localStorage.getItem(LEGAL_PREFIX + key); } catch (e) {}
  return saved !== null ? saved : LEGAL_PAGES[key].text;
}
function legalSet(key, text) { window.localStorage.setItem(LEGAL_PREFIX + key, text); }
function legalReset(key) { window.localStorage.removeItem(LEGAL_PREFIX + key); }

// Renderiza o texto em títulos, listas e parágrafos (textContent evita injeção de HTML)
function legalInline(node, str) {
  str.split(/(\*\*[^*]+\*\*)/).forEach(function (part) {
    if (!part) return;
    if (part.length > 4 && part.indexOf("**") === 0 && part.slice(-2) === "**") {
      var b = document.createElement("strong"); b.textContent = part.slice(2, -2); node.appendChild(b);
    } else node.appendChild(document.createTextNode(part));
  });
}
function legalRender(el, text) {
  el.innerHTML = "";
  text.split(/\n\s*\n/).forEach(function (block) {
    var lines = block.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
    if (!lines.length) return;
    if (/^Última atualização:/i.test(lines[0])) {
      var bd = document.createElement("span");
      bd.className = "legal-badge";
      bd.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';
      bd.appendChild(document.createTextNode(lines[0]));
      el.appendChild(bd);
      lines = lines.slice(1);
      if (!lines.length) return;
    }
    if (lines[0].indexOf("## ") === 0) {
      var h = document.createElement("h2");
      h.textContent = lines[0].slice(3);
      el.appendChild(h);
      lines = lines.slice(1);
      if (!lines.length) return;
    }
    if (lines[0].indexOf("- ") === 0) {
      var ul = document.createElement("ul");
      lines.forEach(function (l) {
        var li = document.createElement("li");
        legalInline(li, l.replace(/^-\s+/, ""));
        ul.appendChild(li);
      });
      el.appendChild(ul);
    } else {
      var p = document.createElement("p");
      lines.forEach(function (l, i) {
        if (i) p.appendChild(document.createElement("br"));
        legalInline(p, l);
      });
      el.appendChild(p);
    }
  });
}

(function () {
  var el = document.querySelector("[data-legal]");
  if (!el) return;
  var key = el.getAttribute("data-legal");
  if (LEGAL_PAGES[key]) legalRender(el, legalGet(key));
})();

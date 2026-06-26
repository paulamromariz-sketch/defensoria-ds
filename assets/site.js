/* ===========================================================
   DPERJ DS — partials e comportamento compartilhado
   =========================================================== */

const PAGES = [
  { href: "index.html",        num: "00", label: "Visão geral" },
  { href: "cores.html",        num: "01", label: "Cores" },
  { href: "tipografia.html",   num: "02", label: "Tipografia" },
  { href: "espacamento.html",  num: "03", label: "Espaçamento" },
  { href: "botoes.html",       num: "04", label: "Botões" },
  { href: "inputs.html",       num: "05", label: "Inputs" },
  { href: "cards.html",        num: "06", label: "Cards" },
  { href: "navegacao.html",    num: "07", label: "Navegação" },
  { href: "modais.html",       num: "08", label: "Modais" },
  { href: "tabelas.html",      num: "09", label: "Tabelas" },
];

function currentPage() {
  const path = location.pathname.split("/").pop() || "index.html";
  return path;
}

function renderHeader() {
  const here = currentPage();
  const links = PAGES
    .filter(p => p.href !== "index.html")
    .map(p => `
      <a class="gh__link ${p.href === here ? "is-active" : ""}" href="${p.href}">
        <span class="gh__link-num">${p.num}</span>
        <span class="gh__link-label">${p.label}</span>
      </a>
    `).join("");

  return `
    <header class="gh">
      <div class="gh__inner">
        <a class="gh__brand" href="index.html">
          <div class="gh__mark" aria-hidden="true"></div>
          <div class="gh__brand-text">
            <strong>Defensoria · DS</strong>
            <small>Rio de Janeiro</small>
          </div>
        </a>
        <nav class="gh__nav" aria-label="Seções do design system">
          ${links}
        </nav>
      </div>
    </header>
  `;
}

function renderNextPage() {
  const here = currentPage();
  const idx = PAGES.findIndex(p => p.href === here);
  const next = PAGES[(idx + 1) % PAGES.length];
  return `
    <a class="next-page" href="${next.href}">
      <div>
        <div class="next-page__label">Próximo capítulo</div>
        <div class="next-page__title">
          <span class="num">${next.num}</span>
          ${next.label}
        </div>
      </div>
      <div class="next-page__arrow" aria-hidden="true">→</div>
    </a>
  `;
}

function renderFooter() {
  return `
    <footer class="gf">
      <div class="gf__inner">
        <div class="gf__col">
          <h4>Defensoria · DS</h4>
          <p class="muted" style="margin:0;max-width:32ch;line-height:1.5;">
            Sistema de design da Defensoria Pública do Estado do Rio de Janeiro.
            Construído para clareza, acesso e durabilidade.
          </p>
        </div>
        <div class="gf__col">
          <h4>Fundamentos</h4>
          <ul>
            <li><a href="cores.html">Cores</a></li>
            <li><a href="tipografia.html">Tipografia</a></li>
            <li><a href="espacamento.html">Espaçamento</a></li>
          </ul>
        </div>
        <div class="gf__col">
          <h4>Componentes</h4>
          <ul>
            <li><a href="botoes.html">Botões</a></li>
            <li><a href="inputs.html">Inputs</a></li>
            <li><a href="cards.html">Cards</a></li>
            <li><a href="navegacao.html">Navegação</a></li>
          </ul>
        </div>
        <div class="gf__col">
          <h4>Padrões</h4>
          <ul>
            <li><a href="modais.html">Modais</a></li>
            <li><a href="tabelas.html">Tabelas</a></li>
          </ul>
        </div>
      </div>
      <div class="gf__bottom">
        <span>© 2026 · Defensoria Pública / RJ · uso interno</span>
        <span class="mono">v0.1 · maio 2026</span>
      </div>
    </footer>
  `;
}

function mountPartials() {
  const headerSlot = document.querySelector("[data-slot='header']");
  if (headerSlot) headerSlot.outerHTML = renderHeader();

  const nextSlot = document.querySelector("[data-slot='next']");
  if (nextSlot) nextSlot.outerHTML = renderNextPage();

  const footerSlot = document.querySelector("[data-slot='footer']");
  if (footerSlot) footerSlot.outerHTML = renderFooter();
}

function setupScrollFade() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".fade-up").forEach(el => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  mountPartials();
  setupScrollFade();
});

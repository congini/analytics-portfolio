(function () {
  const data = window.PORTFOLIO_DATA;
  const body = document.body;
  const currentPage = body.dataset.page;
  const basePath = body.dataset.base || ".";

  if (!data) {
    return;
  }

  const hasValue = (value) => Boolean(value && String(value).trim());
  const iconArrow = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const iconExternal = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7.2 5.4h7.4v7.4M14.3 5.7 6 14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const iconDownload = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v9m0 0 3.5-3.5M10 12 6.5 8.5M4.5 15.5h11" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function resolvePath(path) {
    if (!path || path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("#")) {
      return path;
    }

    if (path.startsWith("/")) {
      return path;
    }

    return `${basePath}/${path}`.replace("/./", "/");
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function linkAttrs(item) {
    const href = item.href || item.path;
    const isExternal = href && (href.startsWith("http") || href.startsWith("mailto:"));
    const target = isExternal ? ' target="_blank" rel="noreferrer"' : "";
    const download = item.download ? " download" : "";
    return `href="${escapeHtml(resolvePath(href))}"${target}${download}`;
  }

  function externalActions() {
    const links = data.externalLinks || {};
    return Object.keys(links)
      .map((key) => links[key])
      .filter((item) => item && hasValue(item.href));
  }

  function contactItems() {
    const contact = data.contact || {};
    const items = [];

    if (hasValue(contact.email)) {
      items.push({
        label: "Email",
        value: contact.email,
        href: `mailto:${contact.email}`
      });
    }

    if (hasValue(contact.linkedin || data.externalLinks.linkedin.href)) {
      items.push({
        label: "LinkedIn",
        value: "Connect on LinkedIn",
        href: contact.linkedin || data.externalLinks.linkedin.href
      });
    }

    if (hasValue(contact.github || data.externalLinks.github.href)) {
      items.push({
        label: "GitHub",
        value: "View GitHub",
        href: contact.github || data.externalLinks.github.href
      });
    }

    if (hasValue(contact.x || data.externalLinks.x.href)) {
      items.push({
        label: "X",
        value: "Follow on X",
        href: contact.x || data.externalLinks.x.href
      });
    }

    return items;
  }

  function renderHeader() {
    const header = document.getElementById("site-header");
    if (!header) {
      return;
    }

    const actions = externalActions();
    const nav = data.navigation
      .map((item) => {
        const activeClass = item.page === currentPage ? " is-active" : "";
        return `<a class="nav-link${activeClass}" href="${escapeHtml(resolvePath(item.path))}">${escapeHtml(item.label)}</a>`;
      })
      .join("");

    const actionMarkup = actions
      .map((item) => `<a class="header-action" ${linkAttrs(item)}>${escapeHtml(item.label)} ${iconExternal}</a>`)
      .join("");

    header.innerHTML = `
      <header class="site-header">
        <nav class="nav-shell" aria-label="Primary navigation">
          <a class="brand-link" href="${escapeHtml(resolvePath("index.html"))}" aria-label="Conor Mangini home">
            <span class="brand-mark" aria-hidden="true">CM</span>
            <span class="brand-text">
              <strong>${escapeHtml(data.owner.name)}</strong>
              <small>Sports Analytics</small>
            </span>
          </a>
          <div class="nav-links">${nav}</div>
          ${actions.length ? `<div class="header-actions">${actionMarkup}</div>` : ""}
        </nav>
      </header>
    `;
  }

  function setHeaderScrollBehavior() {
    const header = document.querySelector(".site-header");
    if (!header) {
      return;
    }

    let lastY = window.scrollY;
    let ticking = false;

    function update() {
      const nextY = window.scrollY;
      const scrollingDown = nextY > lastY;

      header.classList.toggle("is-hidden", scrollingDown && nextY > 140);
      header.classList.toggle("is-scrolled", nextY > 12);
      lastY = Math.max(nextY, 0);
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  function renderFooter() {
    const footer = document.getElementById("site-footer");
    if (!footer) {
      return;
    }

    footer.innerHTML = `
      <footer class="site-footer">
        <div class="section-inner footer-inner">
          <p>${escapeHtml(data.owner.name)}</p>
          <p>${escapeHtml(data.owner.title)}</p>
        </div>
      </footer>
    `;
  }

  function renderHome() {
    const root = document.getElementById("home-root");
    if (!root) {
      return;
    }

    const resume = data.externalLinks.resume;
    const contacts = contactItems();
    const proofPoints = (data.owner.proofPoints || [])
      .map((item) => `
        <div class="metric-tile">
          <strong>${escapeHtml(item.value)}</strong>
          <span>${escapeHtml(item.label)}</span>
        </div>
      `)
      .join("");
    const heroActions = [
      `<a class="button button-primary" href="${escapeHtml(resolvePath("projects/index.html"))}">View Projects ${iconArrow}</a>`,
      `<a class="button button-secondary" href="${escapeHtml(resolvePath("visuals/index.html"))}">View Visuals ${iconArrow}</a>`
    ];

    if (resume && hasValue(resume.href)) {
      heroActions.push(`<a class="button button-ghost" ${linkAttrs(resume)}>${iconDownload} ${escapeHtml(resume.label)}</a>`);
    }

    root.innerHTML = `
      <section class="hero-section">
        <div class="section-inner hero-inner">
          <div class="hero-main">
            <p class="hero-kicker">${escapeHtml(data.owner.name)}</p>
            <h1>${escapeHtml(data.owner.title)}</h1>
            <p class="hero-lede">${escapeHtml(data.owner.subtitle)}</p>
            <p class="hero-intro">${escapeHtml(data.owner.intro || data.owner.about)}</p>
            <div class="button-row">${heroActions.join("")}</div>
          </div>
          <div class="hero-panel" aria-label="Portfolio focus summary">
            <p class="panel-label">Working toolkit</p>
            ${proofPoints}
          </div>
          <figure class="hero-film">
            <img src="${escapeHtml(resolvePath("assets/img/hero-analytics.png"))}" alt="Sports analytics field diagram with chart overlays.">
          </figure>
        </div>
      </section>

      <section class="content-section about-section" aria-labelledby="about-title">
        <div class="section-inner split-layout">
          <div>
            <p class="section-label">About Me</p>
            <h2 id="about-title">Front-office style analysis with a builder's mindset.</h2>
          </div>
          <div class="about-copy">
            <p>${escapeHtml(data.owner.about)}</p>
            <div class="focus-list" aria-label="Analytics focus areas">
              ${(data.owner.focusAreas || []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
            </div>
          </div>
        </div>
      </section>

      ${renderResumeSection(resume)}
      ${renderContactSection(contacts)}
    `;
  }

  function renderResumeSection(resume) {
    if (!resume || !hasValue(resume.href)) {
      return "";
    }

    return `
      <section class="content-section resume-section" aria-labelledby="resume-title">
        <div class="section-inner callout-band">
          <div>
            <p class="section-label">Resume</p>
            <h2 id="resume-title">A concise view of the analytics work behind the portfolio.</h2>
          </div>
          <a class="button button-primary" ${linkAttrs(resume)}>${escapeHtml(resume.label)} ${iconExternal}</a>
        </div>
      </section>
    `;
  }

  function renderContactSection(items) {
    if (!items.length) {
      return "";
    }

    const rows = items
      .map((item) => `
        <a class="contact-row" href="${escapeHtml(item.href)}" target="${item.href.startsWith("mailto:") ? "_self" : "_blank"}" rel="${item.href.startsWith("mailto:") ? "" : "noreferrer"}">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
          ${iconExternal}
        </a>
      `)
      .join("");

    return `
      <section id="contact" class="content-section contact-section" aria-labelledby="contact-title">
        <div class="section-inner split-layout">
          <div>
            <p class="section-label">Contact</p>
            <h2 id="contact-title">Reach me through the links below.</h2>
          </div>
          <div class="contact-list">${rows}</div>
        </div>
      </section>
    `;
  }

  function renderProjects() {
    const root = document.getElementById("projects-root");
    if (!root) {
      return;
    }

    const projects = (data.projects || []).map(renderProjectCard).join("");
    root.innerHTML = `
      <section class="projects-hero">
        <div class="section-inner projects-heading">
          <p class="section-label">Analytics work</p>
          <h1>Projects</h1>
          <p>Completed public sports analytics work built around repeatable models, useful dashboards, and decision-ready summaries.</p>
        </div>
      </section>
      <section class="projects-section">
        <div class="section-inner project-list">${projects}</div>
      </section>
    `;
  }

  function renderVisuals() {
    const root = document.getElementById("visuals-root");
    if (!root) {
      return;
    }

    const visuals = data.visuals && data.visuals.enabled ? data.visuals.items || [] : [];
    const cards = visuals.map(renderVisualCard).join("");

    root.innerHTML = `
      <section class="projects-hero visuals-hero">
        <div class="section-inner projects-heading">
          <p class="section-label">Gallery</p>
          <h1>Visuals</h1>
          <p>${escapeHtml(data.visuals.intro || "")}</p>
          <p class="page-support">${escapeHtml(data.visuals.description || "")}</p>
        </div>
      </section>
      <section class="projects-section visuals-section">
        <div class="section-inner visual-list">${cards}</div>
      </section>
    `;
  }

  function renderProjectCard(project) {
    const screenshot = hasValue(project.screenshot)
      ? `<figure class="project-media"><img src="${escapeHtml(resolvePath(project.screenshot))}" alt="${escapeHtml(project.screenshotAlt || project.name)}"></figure>`
      : "";
    const tools = (project.tools || []).map((tool) => `<span>${escapeHtml(tool)}</span>`).join("");
    const highlights = (project.highlights || [])
      .map((highlight) => `<li>${escapeHtml(highlight)}</li>`)
      .join("");
    const cta = hasValue(project.url)
      ? `<a class="button button-primary project-cta" href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">Open The Gini Site ${iconExternal}</a>`
      : "";

    return `
      <article class="project-card">
        ${screenshot}
        <div class="project-body">
          <div class="project-meta">
            <p>${escapeHtml(project.subtitle).toUpperCase()}</p>
            <span>${escapeHtml(project.date)}</span>
          </div>
          <h2>${escapeHtml(project.name)}</h2>
          <p class="project-description">${escapeHtml(project.summary || project.description)}</p>
          ${highlights ? `<ul class="project-highlights">${highlights}</ul>` : ""}
          <div class="tool-list" aria-label="Tools used">${tools}</div>
        </div>
        <aside class="project-launch">
          <p class="panel-label">Live analytics project</p>
          <div class="launch-meter" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>${escapeHtml(project.description)}</p>
          ${cta}
        </aside>
      </article>
    `;
  }

  function renderVisualCard(visual) {
    const tools = (visual.tools || []).map((tool) => `<span>${escapeHtml(tool)}</span>`).join("");
    const imagePath = hasValue(visual.image) ? resolvePath(visual.image) : "";
    const image = hasValue(imagePath)
      ? `
        <a class="visual-media" href="${escapeHtml(imagePath)}" target="_blank" rel="noreferrer">
          <img src="${escapeHtml(imagePath)}" alt="${escapeHtml(visual.alt || visual.title)}">
        </a>
      `
      : "";

    return `
      <article class="visual-card">
        ${image}
        <div class="visual-body">
          <div class="project-meta">
            <p>${escapeHtml(visual.sport || "Visual").toUpperCase()}</p>
          </div>
          <h2>${escapeHtml(visual.title)}</h2>
          <p class="project-description">${escapeHtml(visual.shortDescription || visual.description || "")}</p>
          <div class="tool-list" aria-label="Tools and skills">${tools}</div>
          <details class="visual-detail">
            <summary>
              <span>Project details</span>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </summary>
            <p>${escapeHtml(visual.description || "")}</p>
          </details>
          ${hasValue(imagePath) ? `<a class="button button-primary project-cta" href="${escapeHtml(imagePath)}" target="_blank" rel="noreferrer">View Full Graphic ${iconExternal}</a>` : ""}
        </div>
      </article>
    `;
  }

  function renderVisualsAccordion() {
    if (!data.visuals || !data.visuals.enabled) {
      return "";
    }

    return (data.visuals.items || [])
      .map((visual) => `
        <details class="visual-item">
          <summary>
            <span>${escapeHtml(visual.title)}</span>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </summary>
          <div class="visual-panel">
            ${hasValue(visual.image) ? `<img src="${escapeHtml(resolvePath(visual.image))}" alt="${escapeHtml(visual.title)}">` : ""}
            <p>${escapeHtml(visual.sport || "")}</p>
            <p>${escapeHtml(visual.description || "")}</p>
            <div class="tool-list">${(visual.tools || []).map((tool) => `<span>${escapeHtml(tool)}</span>`).join("")}</div>
          </div>
        </details>
      `)
      .join("");
  }

  renderHeader();
  setHeaderScrollBehavior();
  renderFooter();
  renderHome();
  renderProjects();
  renderVisuals();
  window.renderVisualsAccordion = renderVisualsAccordion;
})();

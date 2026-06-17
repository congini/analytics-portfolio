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

  function primaryNavItems() {
    const items = [...(data.navigation || [])];
    const resume = data.externalLinks?.resume;

    if (resume && hasValue(resume.href)) {
      items.push({
        label: resume.label || "Resume",
        href: resume.href,
        download: resume.download
      });
    }

    return items;
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

    if (hasValue(contact.linkedin || data.externalLinks.linkedin?.href)) {
      items.push({
        label: "LinkedIn",
        value: "Connect on LinkedIn",
        href: contact.linkedin || data.externalLinks.linkedin.href
      });
    }

    if (hasValue(contact.x || data.externalLinks.x?.href)) {
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

    const nav = primaryNavItems()
      .map((item) => {
        const activeClass = item.page === currentPage ? " is-active" : "";
        return `<a class="nav-link${activeClass}" ${linkAttrs(item)}>${escapeHtml(item.label)}</a>`;
      })
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

    const nav = primaryNavItems()
      .map((item) => `<a ${linkAttrs(item)}>${escapeHtml(item.label)}</a>`)
      .join("");
    const contact = contactItems()
      .map((item) => {
        const text = item.label === "Email" ? item.value : item.label;
        return `<a class="footer-contact-link" ${linkAttrs(item)}>${escapeHtml(text)}</a>`;
      })
      .join("");

    footer.innerHTML = `
      <footer class="site-footer">
        <div class="section-inner footer-inner">
          <div>
            <p>${escapeHtml(data.owner.name)}</p>
            <span>${escapeHtml(data.owner.title)}</span>
          </div>
          <nav class="footer-links" aria-label="Footer navigation">${nav}</nav>
          <div class="footer-contact" aria-label="Contact links">${contact}</div>
          <small>Built as a static portfolio.</small>
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
    const toolkit = (data.owner.toolkit || [])
      .map((item) => `<span>${escapeHtml(item)}</span>`)
      .join("");
    const aboutParagraphs = (data.owner.aboutParagraphs || [])
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("");
    const aboutCards = (data.owner.aboutCards || [])
      .map((item) => `<span>${escapeHtml(item)}</span>`)
      .join("");
    const focusCards = (data.owner.focusAreas || [])
      .map((item) => `
        <article class="focus-card">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </article>
      `)
      .join("");
    const heroActions = [
      `<a class="button button-primary" href="${escapeHtml(resolvePath("projects/index.html"))}">Projects ${iconArrow}</a>`,
      `<a class="button button-secondary" href="${escapeHtml(resolvePath("visuals/index.html"))}">Visuals ${iconArrow}</a>`
    ];

    if (resume && hasValue(resume.href)) {
      heroActions.push(`<a class="button button-secondary" ${linkAttrs(resume)}>${iconDownload} ${escapeHtml(resume.label)}</a>`);
    }

    root.innerHTML = `
      <section class="hero-section">
        <div class="section-inner hero-inner">
          <p class="hero-kicker">${escapeHtml(data.owner.name)}</p>
          <h1>${escapeHtml(data.owner.title)}</h1>
          <p class="hero-lede">${escapeHtml(data.owner.subtitle)}</p>
          <p class="hero-intro">${escapeHtml(data.owner.intro)}</p>
          <div class="button-row">${heroActions.join("")}</div>
          <div class="toolkit-strip" aria-label="Skills and tools">${toolkit}</div>
        </div>
      </section>

      <section class="content-section about-section" aria-labelledby="about-title">
        <div class="section-inner split-layout">
          <div>
            <p class="section-label">About Me</p>
            <h2 id="about-title">Front-office thinking, practical analytics tools, and sports questions worth testing.</h2>
          </div>
          <div class="about-copy">
            ${aboutParagraphs}
            <p>${escapeHtml(data.owner.interests)}</p>
            <div class="detail-strip" aria-label="Background details">${aboutCards}</div>
          </div>
        </div>
      </section>

      <section class="content-section focus-section" aria-labelledby="focus-title">
        <div class="section-inner">
          <div class="section-heading-row">
            <p class="section-label">Focus Areas</p>
            <h2 id="focus-title">Where the work is pointed.</h2>
          </div>
          <div class="focus-grid">${focusCards}</div>
        </div>
      </section>

      <section class="content-section direction-section" aria-labelledby="direction-title">
        <div class="section-inner direction-band">
          <div>
            <p class="section-label">Explore</p>
            <h2 id="direction-title">Analytics projects and standalone visuals live on their own pages.</h2>
            <p>For interactive analytics projects, visit Projects. For standalone graphics and shot maps, visit Visuals.</p>
          </div>
          <div class="direction-actions">
            <a class="button button-primary" href="${escapeHtml(resolvePath("projects/index.html"))}">Explore Projects ${iconArrow}</a>
            <a class="button button-secondary" href="${escapeHtml(resolvePath("visuals/index.html"))}">Explore Visuals ${iconArrow}</a>
          </div>
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
      <section class="page-hero">
        <div class="section-inner page-heading">
          <p class="section-label">Analytics Projects</p>
          <h1>Projects</h1>
          <p>Completed public sports analytics work built around repeatable models, useful dashboards, and decision-ready summaries.</p>
        </div>
      </section>
      <section class="projects-section">
        <div class="section-inner project-list">${projects}</div>
      </section>
    `;
  }

  function renderProjectCard(project) {
    const tools = (project.tools || []).map((tool) => `<span>${escapeHtml(tool)}</span>`).join("");
    const highlights = (project.highlights || [])
      .map((highlight) => `<li>${escapeHtml(highlight)}</li>`)
      .join("");
    const cta = hasValue(project.url)
      ? `<a class="button button-primary project-cta" href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">Open The Gini Site ${iconExternal}</a>`
      : "";

    return `
      <article class="project-card">
        <div class="project-card-main">
          <div class="project-meta">
            <p>${escapeHtml(project.subtitle).toUpperCase()}</p>
            <span>${escapeHtml(project.date)}</span>
          </div>
          <h2>${escapeHtml(project.name)}</h2>
          <p class="project-description">${escapeHtml(project.summary || project.description)}</p>
          ${highlights ? `<ul class="project-highlights">${highlights}</ul>` : ""}
          <div class="tool-list" aria-label="Tools used">${tools}</div>
          ${cta}
        </div>
      </article>
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
      <section class="page-hero visuals-hero">
        <div class="section-inner page-heading">
          <p class="section-label">Visual Gallery</p>
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

  renderHeader();
  setHeaderScrollBehavior();
  renderFooter();
  renderHome();
  renderProjects();
  renderVisuals();
})();

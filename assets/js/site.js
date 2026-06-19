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

  function primaryNavItems() {
    return [...(data.navigation || [])];
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

    let ticking = false;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
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

    const contact = contactItems()
      .map((item) => {
        const text = item.label === "Email" ? item.value : item.label;
        return `<a class="footer-contact-link" ${linkAttrs(item)}>${escapeHtml(text)}</a>`;
      })
      .join("");

    footer.innerHTML = `
      <footer class="site-footer">
        <div class="section-inner footer-inner">
          <div class="footer-brand">
            <img
              src="${escapeHtml(resolvePath("assets/img/cm_wordmark_horizontal_white_text.png"))}"
              alt="Conor Mangini Sports Analytics"
              width="1400"
              height="420"
            >
            <span>${escapeHtml(data.owner.title)}</span>
          </div>
          <div class="footer-contact" aria-label="Contact links">${contact}</div>
        </div>
      </footer>
    `;
  }

  function renderHome() {
    const root = document.getElementById("home-root");
    if (!root) {
      return;
    }

    const aboutParagraphs = (data.owner.aboutParagraphs || [])
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
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

    root.innerHTML = `
      <section class="hero-section">
        <div class="section-inner hero-inner">
          <div class="hero-copy">
            <p class="hero-kicker">${escapeHtml(data.owner.name)}</p>
            <h1>${escapeHtml(data.owner.title)}</h1>
            <p class="hero-lede">${escapeHtml(data.owner.subtitle)}</p>
            <div class="button-row">${heroActions.join("")}</div>
          </div>
          <div class="hero-media">
            <img
              class="hero-photo"
              src="${escapeHtml(resolvePath("assets/img/conor-qu-pregame.jpeg"))}"
              data-alternate-src="${escapeHtml(resolvePath("assets/img/mbb-vs-canisius-02052026-035.jpeg"))}"
              alt="Conor Mangini before a Quinnipiac basketball game"
              width="2000"
              height="3000"
            >
            <div class="hero-photo-fallback" aria-hidden="true">
              <span>Quinnipiac Basketball Operations</span>
            </div>
          </div>
        </div>
      </section>

      <section class="content-section about-section" aria-labelledby="about-title">
        <div class="section-inner">
          <div class="identity-heading">
            <p class="section-label">About Conor</p>
            <h2 id="about-title">A little more about me.</h2>
          </div>
          <div class="identity-grid">
            <figure class="about-portrait">
              <img
                src="${escapeHtml(resolvePath("assets/img/conor-headshot.jpeg"))}"
                alt="Conor Mangini sports analytics portfolio headshot"
                width="1484"
                height="1060"
              >
            </figure>
            <div class="about-copy">
              ${aboutParagraphs}
              <blockquote class="about-quote">
                <p>${escapeHtml(data.owner.aboutQuote)}</p>
                <cite>— <span>${escapeHtml(data.owner.aboutQuoteAttribution)}</span></cite>
              </blockquote>
            </div>
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
      <section class="page-hero projects-hero">
        <div class="section-inner page-heading">
          <p class="section-label">Analytics Projects</p>
          <h1>Projects</h1>
          <p>Completed public sports analytics work built around repeatable models, useful dashboards, and decision-ready summaries.</p>
        </div>
        <div class="page-hero-media" aria-hidden="true">
          <img
            src="${escapeHtml(resolvePath("assets/img/projects-hero.jpg"))}"
            alt=""
            width="1206"
            height="784"
          >
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
    const screenshot = renderProjectMedia(project, true);
    const cta = hasValue(project.url)
      ? `<a class="button button-primary project-cta" href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">Open The Gini Site ${iconExternal}</a>`
      : "";

    return `
      <article class="project-card">
        ${screenshot}
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

  function renderProjectMedia(project, linkScreenshot) {
    const screenshotPath = hasValue(project.screenshot) ? resolvePath(project.screenshot) : "";

    if (hasValue(screenshotPath)) {
      const media = `
        <img
          src="${escapeHtml(screenshotPath)}"
          alt="${escapeHtml(project.screenshotAlt || `${project.name} project screenshot`)}"
        >
      `;

      return linkScreenshot
        ? `<a class="project-media" href="${escapeHtml(screenshotPath)}" target="_blank" rel="noreferrer">${media}</a>`
        : `<div class="project-media">${media}</div>`;
    }

    return `
      <div class="project-media project-media-placeholder" role="img" aria-label="${escapeHtml(`${project.name} analytics dashboard preview`)}">
        <div class="placeholder-toolbar">
          <span></span><span></span><span></span>
          <strong>${escapeHtml(project.name)}</strong>
        </div>
        <div class="placeholder-dashboard">
          <div class="placeholder-score">
            <small>Performance index</small>
            <strong>Team evaluation</strong>
            <span></span>
          </div>
          <div class="placeholder-chart" aria-hidden="true">
            <i style="--bar: 46%"></i>
            <i style="--bar: 68%"></i>
            <i style="--bar: 57%"></i>
            <i style="--bar: 84%"></i>
            <i style="--bar: 73%"></i>
          </div>
        </div>
      </div>
    `;
  }

  function setImageFallbacks() {
    document.querySelectorAll("img[data-alternate-src]").forEach((image) => {
      image.addEventListener("error", () => {
        const alternateSrc = image.dataset.alternateSrc;

        if (alternateSrc && image.src !== new URL(alternateSrc, window.location.href).href) {
          image.src = alternateSrc;
          return;
        }

        const media = image.closest(".hero-media");
        if (media) {
          media.classList.add("is-missing");
        }
        image.remove();
      });
    });
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
        <div class="page-hero-media" aria-hidden="true">
          <img
            src="${escapeHtml(resolvePath("assets/img/visuals-hero.jpg"))}"
            alt=""
            width="963"
            height="1280"
          >
        </div>
      </section>
      <section class="projects-section visuals-section">
        <div class="section-inner visual-list">${cards}</div>
      </section>
    `;
  }

  function renderVisualCard(visual, index) {
    const imagePath = hasValue(visual.image) ? resolvePath(visual.image) : "";
    const lightboxId = `visual-lightbox-${index}`;
    const image = hasValue(imagePath)
      ? `
        <button
          class="visual-media"
          type="button"
          data-lightbox-open="${escapeHtml(lightboxId)}"
          aria-label="${escapeHtml(`Open full-size preview of ${visual.title}`)}"
        >
          <img src="${escapeHtml(imagePath)}" alt="${escapeHtml(visual.alt || visual.title)}">
        </button>
      `
      : "";
    const lightbox = hasValue(imagePath)
      ? `
        <dialog
          class="visual-lightbox"
          id="${escapeHtml(lightboxId)}"
          aria-label="${escapeHtml(`${visual.title} full-size preview`)}"
        >
          <div class="visual-lightbox-shell">
            <button class="visual-lightbox-close" type="button" data-lightbox-close>Close</button>
            <img src="${escapeHtml(imagePath)}" alt="${escapeHtml(visual.alt || visual.title)}">
          </div>
        </dialog>
      `
      : "";

    return `
      <details class="visual-card">
        <summary class="visual-summary">
          <span class="visual-summary-copy">
            <span class="visual-summary-title">${escapeHtml(visual.title)}</span>
          </span>
        </summary>
        <div class="visual-expanded">
          ${image}
          <div class="visual-body">
            <p class="project-description">${escapeHtml(visual.shortDescription || visual.description || "")}</p>
          </div>
        </div>
        ${lightbox}
      </details>
    `;
  }

  function setVisualLightboxes() {
    document.querySelectorAll("[data-lightbox-open]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const dialog = document.getElementById(trigger.dataset.lightboxOpen);
        if (dialog && typeof dialog.showModal === "function") {
          dialog.showModal();
        }
      });
    });

    document.querySelectorAll(".visual-lightbox").forEach((dialog) => {
      const closeButton = dialog.querySelector("[data-lightbox-close]");

      if (closeButton) {
        closeButton.addEventListener("click", () => dialog.close());
      }

      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
          dialog.close();
        }
      });

      dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        dialog.close();
      });
    });
  }

  renderHeader();
  setHeaderScrollBehavior();
  renderFooter();
  renderHome();
  renderProjects();
  renderVisuals();
  setImageFallbacks();
  setVisualLightboxes();
})();

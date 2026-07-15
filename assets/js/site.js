(function () {
  const data = window.PORTFOLIO_DATA;
  const body = document.body;
  const currentPage = body.dataset.page;
  const basePath = body.dataset.base || ".";

  if (!data) {
    return;
  }

  const hasValue = (value) => Boolean(value && String(value).trim());
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
    const opensNewTab = isExternal || item.newTab;
    const target = opensNewTab ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `href="${escapeHtml(resolvePath(href))}"${target}`;
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
        const currentAttribute = item.page === currentPage ? ' aria-current="page"' : "";
        return `<a class="nav-link${activeClass}" ${linkAttrs(item)}${currentAttribute}>${escapeHtml(item.label)}</a>`;
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
    const resume = data.externalLinks.resume;
    const heroActions = hasValue(resume?.href)
      ? [`<a class="button button-primary button-resume" ${linkAttrs(resume)}>Resume ${iconExternal}</a>`]
      : [];

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
    const cta = hasValue(project.url)
      ? `<a class="project-link" href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer"><span>View project</span>${iconExternal}</a>`
      : "";

    return `
      <article class="project-card">
        <div class="project-card-main">
          <div class="project-card-copy">
            <div class="project-meta">
              <p>${escapeHtml(project.subtitle).toUpperCase()}</p>
              <span>${escapeHtml(project.date)}</span>
            </div>
            <h2>${escapeHtml(project.name)}</h2>
            <p class="project-description">${escapeHtml(project.summary || project.description)}</p>
          </div>
          ${cta}
        </div>
      </article>
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

  function renderLightbox(lightboxId, title, imagePath, alt) {
    if (!hasValue(imagePath)) {
      return "";
    }

    return `
      <dialog
        class="visual-lightbox"
        id="${escapeHtml(lightboxId)}"
        aria-label="${escapeHtml(`${title} full-size preview`)}"
      >
        <div class="visual-lightbox-shell">
          <button class="visual-lightbox-close" type="button" data-lightbox-close>Close</button>
          <img src="${escapeHtml(imagePath)}" alt="${escapeHtml(alt || title)}">
        </div>
      </dialog>
    `;
  }

  function renderVisualMediaButton(
    imagePath,
    alt,
    title,
    lightboxId,
    className = "",
    mediaWidth = 0,
    mediaHeight = 0
  ) {
    if (!hasValue(imagePath)) {
      return "";
    }

    const width = Number(mediaWidth);
    const height = Number(mediaHeight);
    const hasIntrinsicSize = Number.isFinite(width) && width > 0
      && Number.isFinite(height) && height > 0;
    const aspectRatio = hasIntrinsicSize ? ` style="aspect-ratio: ${width} / ${height};"` : "";
    const intrinsicSize = hasIntrinsicSize ? ` width="${width}" height="${height}"` : "";

    return `
      <button
        class="visual-media${className ? ` ${className}` : ""}"
        type="button"
        data-lightbox-open="${escapeHtml(lightboxId)}"
        aria-label="${escapeHtml(`Open full-size preview of ${title}`)}"
        ${aspectRatio}
      >
        <img src="${escapeHtml(imagePath)}" alt="${escapeHtml(alt || title)}"${intrinsicSize} data-visual-media-image>
        <span class="visual-media-fallback">Visual media could not be loaded.</span>
      </button>
    `;
  }

  function slideImageItems(slide) {
    if (Array.isArray(slide.images) && slide.images.length) {
      return slide.images;
    }

    if (hasValue(slide.image)) {
      return [{ image: slide.image, alt: slide.alt || slide.title }];
    }

    return [];
  }

  function renderVisualSlide(visual, slide, visualIndex, slideIndex) {
    const imageItems = slideImageItems(slide);
    const compareClass = imageItems.length > 1 ? " visual-slide-media--compare" : "";
    const media = imageItems
      .map((item, imageIndex) => {
        const imagePath = resolvePath(item.image || item.path || item.src);
        const lightboxId = `visual-lightbox-${visualIndex}-${slideIndex}-${imageIndex}`;
        return renderVisualMediaButton(
          imagePath,
          item.alt || slide.alt || slide.title,
          item.title || slide.title,
          lightboxId,
          "visual-slide-image"
        );
      })
      .join("");
    const lightboxes = imageItems
      .map((item, imageIndex) => {
        const imagePath = resolvePath(item.image || item.path || item.src);
        const lightboxId = `visual-lightbox-${visualIndex}-${slideIndex}-${imageIndex}`;
        return renderLightbox(
          lightboxId,
          item.title || slide.title,
          imagePath,
          item.alt || slide.alt || slide.title
        );
      })
      .join("");
    const slideHidden = slideIndex === 0 ? "" : " hidden";
    const activeClass = slideIndex === 0 ? " is-active" : "";

    return `
      <article
        class="visual-slide${activeClass}"
        data-carousel-slide
        aria-hidden="${slideIndex === 0 ? "false" : "true"}"${slideHidden}
      >
        <div class="visual-slide-media${compareClass}">${media}</div>
        <div class="visual-slide-body">
          <h3>${escapeHtml(slide.title)}</h3>
          <p class="project-description">${escapeHtml(slide.description || "")}</p>
        </div>
        ${lightboxes}
      </article>
    `;
  }

  function renderVisualCarousel(visual, index) {
    const slides = Array.isArray(visual.slides) ? visual.slides : [];

    if (!slides.length) {
      return "";
    }

    const slidePanels = slides
      .map((slide, slideIndex) => renderVisualSlide(visual, slide, index, slideIndex))
      .join("");
    const dots = slides
      .map((slide, slideIndex) => `
        <button
          class="visual-carousel-dot"
          type="button"
          role="tab"
          data-carousel-dot="${slideIndex}"
          aria-label="${escapeHtml(`Show slide ${slideIndex + 1}: ${slide.title}`)}"
        ></button>
      `)
      .join("");

    return `
      <div class="visual-carousel" data-visual-carousel>
        <div class="visual-carousel-track">${slidePanels}</div>
        <div class="visual-carousel-controls" aria-label="${escapeHtml(`${visual.title} slide controls`)}">
          <button class="visual-carousel-button" type="button" data-carousel-prev>Previous</button>
          <div class="visual-carousel-dots" role="tablist" aria-label="Choose slide">${dots}</div>
          <button class="visual-carousel-button" type="button" data-carousel-next>Next</button>
        </div>
        <p class="visual-carousel-status" data-carousel-status aria-live="polite"></p>
      </div>
    `;
  }

  function renderVisualCard(visual, index) {
    const hasSlides = Array.isArray(visual.slides) && visual.slides.length;
    const imagePath = hasValue(visual.image) ? resolvePath(visual.image) : "";
    const lightboxId = `visual-lightbox-${index}`;
    const detailTitle = visual.detailTitle || visual.title;
    const detailSubtitle = visual.detailSubtitle || "";
    const summarySubtitle = visual.summarySubtitle || "";
    const image = !hasSlides
      ? renderVisualMediaButton(
          imagePath,
          visual.alt || visual.title,
          visual.title,
          lightboxId,
          "",
          visual.mediaWidth,
          visual.mediaHeight
        )
      : "";
    const lightbox = !hasSlides
      ? renderLightbox(lightboxId, visual.title, imagePath, visual.alt || visual.title)
      : "";
    const hasCaseStudyContent = hasValue(visual.detailTitle)
      || hasValue(visual.detailSubtitle)
      || hasValue(visual.methodNote)
      || hasValue(visual.metricNote);
    const videoBeforeDescription = visual.videoBeforeDescription
      && !hasSlides
      && !hasCaseStudyContent;
    const methodNote = hasValue(visual.methodNote)
      ? `<p class="visual-note"><strong>Method / tools:</strong> ${escapeHtml(visual.methodNote)}</p>`
      : "";
    const metricNote = hasValue(visual.metricNote)
      ? `<p class="visual-note"><strong>Metric note:</strong> ${escapeHtml(visual.metricNote)}</p>`
      : "";
    const videoCta = hasValue(visual.fullVideo)
      ? `
          <a
            class="visual-video-link"
            href="${escapeHtml(resolvePath(visual.fullVideo))}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>See full video</span>${iconExternal}
          </a>
        `
      : "";
    const expandedContent = hasSlides
      ? renderVisualCarousel(visual, index)
      : hasCaseStudyContent
        ? `
          <div class="visual-case-study">
            <div class="visual-case-heading">
              <h3>${escapeHtml(detailTitle)}</h3>
              ${hasValue(detailSubtitle) ? `<p>${escapeHtml(detailSubtitle)}</p>` : ""}
            </div>
            ${image}
            <div class="visual-body visual-case-body">
              <p class="project-description">${escapeHtml(visual.description || visual.shortDescription || "")}</p>
              ${methodNote}
              ${metricNote}
            </div>
          </div>
        `
        : `
          ${image}
          ${videoBeforeDescription ? videoCta : ""}
          <div class="visual-body">
            <p class="project-description">${escapeHtml(visual.shortDescription || visual.description || "")}</p>
          </div>
        `;

    return `
      <details class="visual-card">
        <summary class="visual-summary" aria-expanded="false" data-visual-summary>
          <span class="visual-summary-copy">
            <span class="visual-summary-title">${escapeHtml(visual.title)}</span>
            ${hasValue(summarySubtitle) ? `<span class="visual-summary-subtitle">${escapeHtml(summarySubtitle)}</span>` : ""}
          </span>
        </summary>
        <div class="visual-expanded">
          ${expandedContent}
          ${videoBeforeDescription ? "" : videoCta}
        </div>
        ${lightbox}
      </details>
    `;
  }

  function setVisualDetailsBehavior() {
    document.querySelectorAll(".visual-card").forEach((card) => {
      card.open = false;
      const summary = card.querySelector("[data-visual-summary]");

      function syncExpandedState() {
        summary?.setAttribute("aria-expanded", String(card.open));
      }

      card.addEventListener("toggle", syncExpandedState);
      syncExpandedState();
    });
  }

  function setVisualMediaFallbacks() {
    document.querySelectorAll("[data-visual-media-image]").forEach((image) => {
      image.addEventListener("error", () => {
        image.closest(".visual-media")?.classList.add("is-missing");
      });
    });
  }

  function setVisualCarousels() {
    document.querySelectorAll("[data-visual-carousel]").forEach((carousel) => {
      const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
      const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
      const previousButton = carousel.querySelector("[data-carousel-prev]");
      const nextButton = carousel.querySelector("[data-carousel-next]");
      const status = carousel.querySelector("[data-carousel-status]");
      let activeIndex = 0;

      if (!slides.length) {
        return;
      }

      function showSlide(index) {
        activeIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
          const isActive = slideIndex === activeIndex;
          slide.hidden = !isActive;
          slide.classList.toggle("is-active", isActive);
          slide.setAttribute("aria-hidden", String(!isActive));
        });

        dots.forEach((dot, dotIndex) => {
          const isActive = dotIndex === activeIndex;
          dot.classList.toggle("is-active", isActive);
          dot.setAttribute("aria-selected", String(isActive));
        });

        if (status) {
          status.textContent = `Slide ${activeIndex + 1} of ${slides.length}`;
        }
      }

      previousButton?.addEventListener("click", () => showSlide(activeIndex - 1));
      nextButton?.addEventListener("click", () => showSlide(activeIndex + 1));
      dots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => showSlide(dotIndex));
      });

      showSlide(0);
    });
  }

  function setVisualLightboxes() {
    document.querySelectorAll("[data-lightbox-open]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        if (trigger.classList.contains("is-missing")) {
          return;
        }

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
  setVisualDetailsBehavior();
  setVisualMediaFallbacks();
  setVisualCarousels();
  setVisualLightboxes();
})();

# Conor Mangini Sports Analytics Portfolio

Static portfolio site with two public pages:

- Home
- Projects

The site is intentionally data-driven. Add real links and assets in `assets/js/site-data.js`; empty fields are not rendered publicly.

## Configured Links And Assets

- Resume PDF: `assets/resume/conor-mangini-resume.pdf`
- LinkedIn: `https://www.linkedin.com/in/conor-mangini-78b169264/`
- Email: `cmang.1905@gmail.com`
- The Gini Site: `https://gini-site.streamlit.app/`

Optional future additions:

- `externalLinks.github.href`: GitHub profile URL
- `projects[0].screenshot`: project screenshot path, such as `assets/img/gini-site.png`

## Future Visuals Page

The `visuals` data object and `renderVisualsAccordion` helper are prepared for a future accordion gallery. The Visuals page is not exposed in navigation or public routes yet.

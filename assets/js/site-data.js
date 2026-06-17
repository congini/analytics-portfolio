window.PORTFOLIO_DATA = {
  owner: {
    name: "Conor Mangini",
    title: "Sports analytics portfolio",
    subtitle: "I build sports analytics models, dashboards, and interactive tools.",
    about:
      "I bring a business analytics foundation to sports work across basketball operations, football analytics, dashboard development, and sports modeling."
  },

  navigation: [
    { label: "Home", path: "index.html", page: "home" },
    { label: "Projects", path: "projects/index.html", page: "projects" },
    { label: "Visuals", path: "visuals/index.html", page: "visuals" }
  ],

  externalLinks: {
    resume: {
      label: "Resume",
      href: "assets/resume/Conor-Mangini-Resume-2026.pdf",
      download: true
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/conor-mangini-78b169264/"
    },
    github: {
      label: "GitHub",
      href: ""
    }
  },

  contact: {
    email: "cmang.1905@gmail.com",
    linkedin: "https://www.linkedin.com/in/conor-mangini-78b169264/",
    github: ""
  },

  projects: [
    {
      name: "The Gini Site",
      subtitle: "NFL analytics platform",
      date: "May 2026",
      description:
        "The Gini Site is an interactive NFL analytics platform built to evaluate team performance through custom rankings, dashboards, and predictive tools.",
      tools: ["Python", "Streamlit", "GitHub"],
      url: "https://gini-site.streamlit.app/",
      screenshot: "",
      screenshotAlt: "The Gini Site project screenshot"
    }
  ],

  visuals: {
    enabled: true,
    description:
      "A collection of basketball, football, and sports analytics visuals built through data analysis, design, and visual storytelling.",
    items: [
      {
        title: "Spurs Finals Shot-Frequency Fingerprint",
        sport: "Basketball visual",
        shortDescription:
          "A Spurs-specific shot-frequency visual comparing San Antonio's shot distribution in the 2026 NBA Finals to its regular-season profile.",
        description:
          "This visual started in R using hoopR / NBA Stats API data to compare the Spurs' Finals shot profile against their regular-season shot distribution. Pink areas show where San Antonio shot more often, while teal areas show where they shot less often. After building the original half-court data layer, I refined the final graphic into a Spurs hardwood presentation while preserving the shot locations, labels, percentages, and annotations.",
        tools: [
          "R",
          "hoopR",
          "NBA Stats API",
          "Basketball analytics",
          "Shot-frequency mapping",
          "Data visualization",
          "Visual storytelling"
        ],
        image: "assets/img/spurs-finals-fingerprint.png",
        alt:
          "Spurs Finals shot-frequency fingerprint comparing shot distribution to regular season."
      }
    ]
  }
};

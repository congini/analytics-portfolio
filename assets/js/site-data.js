window.PORTFOLIO_DATA = {
  owner: {
    name: "Conor Mangini",
    title: "Sports Analytics Portfolio",
    subtitle:
      "Football and basketball analytics work across R, Python, data visualization, dashboarding, and decision-focused tools.",
    intro:
      "I build sports analytics models, visual stories, and interactive tools that turn player, team, and game data into sharper questions and cleaner decisions.",
    about:
      "I bring a business analytics foundation to sports work across basketball operations, football analytics, dashboard development, and sports modeling.",
    focusAreas: [
      "Football analytics",
      "Basketball operations",
      "R and Python workflows",
      "Dashboard development",
      "Sports modeling",
      "Visual storytelling"
    ],
    proofPoints: [
      { value: "NFL", label: "Team rankings and predictive tools" },
      { value: "NBA", label: "Shot maps and visual storytelling" },
      { value: "R/Python", label: "Reusable analysis workflows" }
    ]
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
    },
    x: {
      label: "X",
      href: ""
    }
  },

  contact: {
    email: "cmang.1905@gmail.com",
    linkedin: "https://www.linkedin.com/in/conor-mangini-78b169264/",
    github: "",
    x: ""
  },

  projects: [
    {
      name: "The Gini Site",
      subtitle: "NFL analytics platform",
      date: "May 2026",
      summary:
        "An interactive NFL analytics platform for evaluating team performance through rankings, dashboards, and predictive tools.",
      description:
        "The Gini Site is an interactive NFL analytics platform built to evaluate team performance through custom rankings, dashboards, and predictive tools.",
      tools: ["Python", "Streamlit", "GitHub", "NFL analytics", "Predictive modeling"],
      highlights: [
        "Custom NFL performance rankings",
        "Dashboard-first exploration",
        "Predictive model workflow"
      ],
      url: "https://gini-site.streamlit.app/",
      screenshot: "",
      screenshotAlt: "The Gini Site project screenshot"
    }
  ],

  visuals: {
    enabled: true,
    intro:
      "On this page are some visuals that I have created and developed in my free time. Most of these are simply things that I was curious about and wanted to see the results.",
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

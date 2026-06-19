window.PORTFOLIO_DATA = {
  owner: {
    name: "Conor Mangini",
    title: "Sports Analytics Portfolio",
    subtitle:
      "I’ve always been a sports guy, especially when it comes to football and basketball. Over time, that passion turned into building analytics projects with R, Python, dashboards, data visuals, and tools that help make smarter decisions. I like taking the numbers behind the game and turning them into something people can actually understand and use.",
    aboutParagraphs: [
      "Sports are a huge part of who I am. I’ve had a lifelong bias toward Colorado and Denver sports, but I don’t discriminate — I’ll watch, follow, and overanalyze just about any team or topic. I’m especially into football analytics, basketball analytics, player evaluation, roster construction, and building tools that make the game easier to understand.",
      "Outside of sports, listening to music is probably my favorite hobby. There's no wrong time to put on music. My Apple Music library contains over 2500 downloaded songs, alongside 26 unique playlists. Pearl Jam is undoubtedly my favorite band of all time - I can't be convinced otherwise."
    ],
    aboutQuote:
      "The best revenge is to live on and prove yourself.",
    aboutQuoteAttribution: "Eddie Vedder",
    focusAreas: [
      {
        title: "Football Analytics",
        description: "Team performance, rankings, predictive tools, and roster evaluation."
      },
      {
        title: "Basketball Analytics",
        description: "Shot profiles, player/team trends, and visual storytelling."
      },
      {
        title: "Data Visualization",
        description: "Clean charts, dashboards, and presentation-ready sports visuals."
      },
      {
        title: "Models & Visuals",
        description: "I use R and Python to create models and visuals."
      }
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
    x: {
      label: "X",
      href: "https://x.com/ginianalytics"
    }
  },

  contact: {
    email: "cmang.1905@gmail.com",
    linkedin: "https://www.linkedin.com/in/conor-mangini-78b169264/",
    x: "https://x.com/ginianalytics"
  },

  projects: [
    {
      name: "The Gini Site",
      subtitle: "NFL Analytics Platform",
      date: "May 2026",
      summary:
        "An interactive NFL analytics platform for evaluating team performance through rankings, dashboards, and predictive tools.",
      description:
        "The Gini Site is an interactive NFL analytics platform built to evaluate team performance through custom rankings, dashboards, and predictive tools.",
      tools: ["Python", "Streamlit", "NFL data", "Dashboards", "Predictive modeling"],
      highlights: [
        "Custom NFL performance rankings",
        "Dashboard-first exploration",
        "Predictive model workflow",
        "Team and season comparison tools"
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
        title: "Spurs Finals Shot Profile",
        shortDescription:
          "Built in R using hoopR and NBA Stats API data, this visual shows where San Antonio’s 2026 Finals shot profile differed from its regular-season shot distribution.",
        image: "assets/img/spurs-finals-fingerprint.png",
        alt:
          "Spurs Finals shot-frequency fingerprint comparing shot distribution to regular season."
      }
    ]
  }
};

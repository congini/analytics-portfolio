window.PORTFOLIO_DATA = {
  owner: {
    name: "Conor Mangini",
    title: "Sports Analytics Portfolio",
    subtitle:
      "I’ve always been a sports guy, especially when it comes to football and basketball. Over time, that passion turned into building analytics projects with R, Python, dashboards, data visuals, and tools that help make smarter decisions. I like taking the numbers behind the game and turning them into something people can actually understand and use.",
    aboutParagraphs: [
      "Sports are a huge part of who I am. I’ve had a lifelong bias toward Colorado and Denver sports, but I don’t discriminate - I’ll watch, follow, and overanalyze just about any team or topic. I’m especially into football analytics, basketball analytics, player evaluation, roster construction, and building tools that make the game easier to understand.",
      "Outside of sports, listening to music is probably my favorite hobby. There's no wrong time to put on music. My Apple Music library contains over 2500 downloaded songs, alongside 26 unique playlists. Pearl Jam is undoubtedly my favorite band of all time - I can't be convinced otherwise."
    ],
    aboutQuote:
      "\u201cThe best revenge is to live on and prove yourself.\u201d",
    aboutQuoteAttribution: "Eddie Vedder \u00b7 Pearl Jam",
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
      newTab: true
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
      },
      {
        title: "Quinnipiac Season Momentum Map",
        shortDescription:
          "A game-by-game view of Quinnipiac men's basketball's 2025-26 season, combining final margin, five-game rolling margin, streaks, and momentum into one timeline.",
        image: "assets/img/quinnipiac-season-momentum-2025-26.png",
        alt:
          "Quinnipiac 2025-26 season momentum timeline showing game margins, rolling margin, and streak map."
      },
      {
        title: "Quinnipiac Late-Season Shot Density Shift",
        shortDescription:
          "A court-density comparison of Quinnipiac's last five games against its first 27, highlighting where shot volume moved and how the late-season profile changed.",
        image: "assets/img/quinnipiac-shot-density-last-five-2025-26.png",
        alt:
          "Quinnipiac shot density comparison showing last five games versus first 27 games for the 2025-26 season."
      }
    ]
  }
};

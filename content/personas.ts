// Persona content for the "Who Is reignara For?" experience.
// Copy is stored verbatim. To add a persona, append an entry to `personas`.
// `callout` is split into before/product/after so the branded product name
// can be rendered as a distinct badge while the surrounding sentence stays intact.

export type Callout = {
  before: string
  product: string
  after: string
}

export type PersonaModule = {
  id: string
  icon: string // lucide-react icon name
  title: string
  description: string
  callout: Callout
}

export type Foundation = {
  description: string
  callout: Callout
  trailing?: string
}

export type Persona = {
  id: string
  label: string
  teaser: string
  icon: string // lucide-react icon name
  headline: string
  intro: string[]
  foundationEyebrow: string
  foundation: Foundation
  modulesEyebrow: string
  modules: PersonaModule[]
  closing: string
}

export const personas: Persona[] = [
  {
    id: "directors",
    label: "Directors",
    teaser: "One connected system to run your whole program.",
    icon: "LayoutDashboard",
    headline: "Reignara is the operating system for your pageant program.",
    intro: [
      "Running a pageant program means being the applications team, the communications department, the scorekeeper, the accountant, the sponsor relations manager, and the historian — often all before lunch. Most directors are stitching that together across six different tools that were never built to talk to each other.",
      "Reignara replaces the patchwork with one connected system, built specifically for how pageant programs actually run.",
    ],
    foundationEyebrow: "The Foundation",
    foundation: {
      description:
        "Everyone on Reignara starts in the same place: your program's command center. This is where applications get managed and customized by division and season, where your calendar and documents live, and where you have a full record of everyone connected to your program — every contestant, titleholder, judge, volunteer, and sponsor contact, along with their full history: participation, role and access, documents submitted, service hours logged, every communication thread. It's the single source of truth your program has probably never had.",
      callout: {
        before: "We call this piece ",
        product: "Director",
        after: " — because it's built to be your command center, the way a director commands a program.",
      },
      trailing:
        "Everything else in Reignara is a module that plugs into this foundation, so you can build out exactly what your program needs.",
    },
    modulesEyebrow: "The Modules",
    modules: [
      {
        id: "podium",
        icon: "MessageSquare",
        title: "Everyone's messages, in one place",
        description:
          "No more announcements buried in a group text, a committee thread on one app, and a DM on another. This is one home for every channel, group conversation, and direct message tied to your program.",
        callout: {
          before: "We call it ",
          product: "Podium",
          after: " — because it's the platform you stand on to address your whole program at once, whether that's one contestant or everyone.",
        },
      },
      {
        id: "merit",
        icon: "Scale",
        title: "Judging that adds up correctly, every time",
        description:
          'No more backstage math, no more "did that score get entered right." Judges score, the system tallies — accurately, instantly.',
        callout: {
          before: "We call it ",
          product: "Merit",
          after: " — because at the end of the day, that's what your titleholders are being recognized for.",
        },
      },
      {
        id: "envoy",
        icon: "CalendarCheck",
        title: "A record of every promise made",
        description:
          "Appearances, obligations, deadlines — for you and for your titleholders, at both the pageant level and the sponsor level — tracked so nothing gets promised and forgotten.",
        callout: {
          before: "We call it ",
          product: "Envoy",
          after: " — because an envoy is the one who represents you and follows through on what's been committed.",
        },
      },
      {
        id: "patron",
        icon: "Handshake",
        title: "Sponsor relationships, handled like real partnerships",
        description:
          "Who your sponsors are, what they've committed, what they're owed in return, and the full history of the relationship — instead of a folder of old emails.",
        callout: {
          before: "We call it ",
          product: "Patron",
          after: " — the traditional word for the person or business that champions and funds a program, which is exactly the role your sponsors play.",
        },
      },
      {
        id: "vault",
        icon: "Wallet",
        title: "Every dollar, accounted for",
        description:
          "Expense tracking and management for both directors and titleholders, so pageant-related spending is documented instead of living in someone's personal Venmo history.",
        callout: {
          before: "We call it ",
          product: "Vault",
          after: " — because it's where your program's financial records are kept secure and organized.",
        },
      },
      {
        id: "spotlight",
        icon: "BarChart3",
        title: "Proof of your program's reach",
        description:
          "Real social media analytics and insight into how your program and your titleholders are performing online — useful for your own strategy, and powerful when you're making the case to a sponsor.",
        callout: {
          before: "We call it ",
          product: "Spotlight",
          after: " — because it shows you exactly where the attention is landing.",
        },
      },
    ],
    closing:
      "You built your program to give women opportunity. Reignara exists so running it doesn't take everything you have left.",
  },
  {
    id: "titleholders",
    label: "Titleholders",
    teaser: "A real system for managing your reign.",
    icon: "Crown",
    headline: "Your crown comes with a full calendar. Reignara helps you actually manage it.",
    intro: [
      "The moment you're crowned, the job changes. Appearances, community service, sponsor commitments, media requests, deadlines from your director — it all lands on you at once, and most titleholders end up managing it in a notes app, a paper planner, and a memory that's already stretched thin.",
      "Reignara gives you a real system for your reign, so you can show up prepared instead of scrambling.",
    ],
    foundationEyebrow: "The Foundation",
    foundation: {
      description:
        "Your director runs your program on Reignara's command center, which means your applications, your documents, and your history with the program all already live in one organized system — you're not starting from scratch, and neither is your director trying to remember your story.",
      callout: {
        before: "That foundation is called ",
        product: "Director",
        after: ", and it's what your program is built on.",
      },
    },
    modulesEyebrow: "Your Tools",
    modules: [
      {
        id: "reign",
        icon: "Smartphone",
        title: "Your reign, in your pocket",
        description:
          "Your calendar, your dashboard, and direct access to your program's announcements — all in one app on your phone, so you always know what's next.",
        callout: {
          before: "We call it ",
          product: "Reign",
          after: " — because this app is built around exactly that: the season you're holding your title.",
        },
      },
      {
        id: "envoy",
        icon: "CalendarCheck",
        title: "Never miss a commitment",
        description:
          "Every obligation tied to your title — pageant appearances and sponsor commitments alike — tracked in one place instead of scattered across texts and emails.",
        callout: {
          before: "It runs on the same system your director uses called ",
          product: "Envoy",
          after: ", because it represents your commitments and makes sure they're followed through on, just like it does for your program.",
        },
      },
      {
        id: "podium",
        icon: "MessageSquare",
        title: "Stay in the loop with your director",
        description:
          "A direct line to your program through channels and messaging, so important updates don't get buried in a group chat with forty other things happening at once.",
        callout: {
          before: "We call it ",
          product: "Podium",
          after: " — it's your platform to speak with, and hear from, your program directly.",
        },
      },
      {
        id: "vault",
        icon: "Wallet",
        title: "Track your spending",
        description:
          "A simple way to track expenses tied to your reign, so when it's time to account for what you've spent representing your title, you're not reconstructing it from memory.",
        callout: {
          before: "We call it ",
          product: "Vault",
          after: " — where your financial records stay secure and organized.",
        },
      },
    ],
    closing:
      "You earned this title. Reignara helps you carry it with the same confidence you competed with.",
  },
  {
    id: "contestants",
    label: "Contestants",
    teaser: "A clear path from application to show night.",
    icon: "Sparkles",
    headline: "Competing is stressful enough. The process shouldn't be.",
    intro: [
      "Before you're a titleholder, you're a contestant trying to navigate an application, a deadline, a fee, a dress code you heard about secondhand — often with no clear place to go when you have a question. A disorganized process doesn't just create stress. It shapes how you feel about the program before you've even stepped on stage.",
      "Reignara gives you a clear, modern way to move through the competition process, from application to show night.",
    ],
    foundationEyebrow: "The Foundation",
    foundation: {
      description:
        "The application you're filling out was built specifically for your program's division and season — not a generic form recycled from three years ago — because your director manages it all from one organized system.",
      callout: {
        before: "That system is called ",
        product: "Director",
        after: ", and it's the foundation your entire program runs on.",
      },
    },
    modulesEyebrow: "Your Tools",
    modules: [
      {
        id: "reign",
        icon: "Smartphone",
        title: "One place for everything",
        description:
          "Your application status, your calendar of important dates, and your program's announcements — all in one app on your phone. No more guessing whether an email got through.",
        callout: {
          before: "We call it ",
          product: "Reign",
          after: " — it's built around your experience during your time in the program, from applicant onward.",
        },
      },
      {
        id: "podium",
        icon: "MessageSquare",
        title: "A direct line to your director",
        description:
          "A real way to ask questions and get updates without it getting lost in a crowded inbox or a group text.",
        callout: {
          before: "We call it ",
          product: "Podium",
          after: " — your platform to communicate directly with your program.",
        },
      },
    ],
    closing:
      "Reignara is built so you can spend your energy preparing to compete — not figuring out how to compete.",
  },
  {
    id: "sponsors",
    label: "Sponsors",
    teaser: "A real window into your partnership.",
    icon: "Handshake",
    headline: "Know exactly what your sponsorship is doing.",
    intro: [
      "Sponsoring a pageant program should mean visibility, goodwill, and a clear return — but too often it means writing a check and hoping someone remembers to post the logo. Reignara gives sponsors a real window into the partnership, not just a promise.",
    ],
    foundationEyebrow: "The Foundation",
    foundation: {
      description:
        "Every program on Reignara runs on the same organized command center — the system your point of contact uses to manage the entire pageant, including their relationship with you.",
      callout: {
        before: "That foundation is called ",
        product: "Director",
        after: ".",
      },
    },
    modulesEyebrow: "Your Tools",
    modules: [
      {
        id: "patron",
        icon: "Handshake",
        title: "Your relationship, professionally managed",
        description:
          "Your commitments, your benefits, and your full history with the program — managed the way a real business partnership should be, instead of tracked informally by whoever happens to remember.",
        callout: {
          before: "We call it ",
          product: "Patron",
          after: " — the word for the person or business that champions and funds a program, which is exactly the role you play.",
        },
      },
      {
        id: "envoy",
        icon: "CalendarCheck",
        title: "Commitments that get honored",
        description:
          "The specific obligations tied to your sponsorship — appearances, mentions, deliverables — tracked for both the program and its titleholders, so what was promised is what actually happens.",
        callout: {
          before: "It runs on the system called ",
          product: "Envoy",
          after: ", built to represent commitments and make sure they're followed through on.",
        },
      },
      {
        id: "spotlight",
        icon: "BarChart3",
        title: "Proof of your reach",
        description:
          "Real social media analytics and insight, so the value of your sponsorship isn't a guess — it's measurable.",
        callout: {
          before: "We call it ",
          product: "Spotlight",
          after: " — because it shows exactly where the attention is landing.",
        },
      },
    ],
    closing:
      "Reignara helps pageant programs treat their sponsors like partners, because that's what you are.",
  },
]

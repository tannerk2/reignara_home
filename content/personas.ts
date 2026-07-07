import {
  BarChart3,
  CalendarCheck,
  Handshake,
  LayoutDashboard,
  MessageSquare,
  Scale,
  Smartphone,
  Sparkles,
  Wallet,
} from "lucide-react"
import { CrownIcon } from "@/components/icons/CrownIcon"

// Icons may be a lucide component or a custom SVG component; both accept
// className (+ optional strokeWidth).
export type PersonaIcon = React.ComponentType<{ className?: string; strokeWidth?: number }>

export type Module = {
  name: string
  icon: PersonaIcon
  title: string
  description: string
  reason?: string
}

export type Cta = {
  label: string
  href: string
}

export type Persona = {
  id: string
  label: string
  icon: PersonaIcon
  teaser: string
  headline: string
  intro: string[]
  foundation: string[]
  foundationReason: string
  toolsLabel: string
  modules: Module[]
  closing: string
  cta: Cta
}

const mailto = (subject: string) => `mailto:benson@reignara.com?subject=${encodeURIComponent(subject)}`

export const personas: Persona[] = [
  {
    id: "directors",
    label: "Directors",
    icon: LayoutDashboard,
    teaser: "Run your whole program.",
    headline: "Reignara is the operating system for your pageant program.",
    intro: [
      "Running a pageant program means being the applications team, the communications department, the scorekeeper, the accountant, the sponsor relations manager, and the historian — often all before lunch. Most directors are stitching that together across six different tools that were never built to talk to each other.",
      "Reignara replaces the patchwork with one connected system, built specifically for how pageant programs actually run.",
    ],
    foundation: [
      "Everyone on Reignara starts in the same place: your program's command center. This is where applications get managed and customized by division and season, where your calendar and documents live, and where you have a full record of everyone connected to your program — every contestant, titleholder, judge, volunteer, and sponsor contact, along with their full history.",
      "It's the single source of truth your program has probably never had. Everything else in Reignara is a module that plugs into this foundation, so you can build out exactly what your program needs.",
    ],
    foundationReason:
      "We call this piece Director — because it's built to be your command center, the way a director commands a program.",
    toolsLabel: "The Modules",
    modules: [
      {
        name: "Podium",
        icon: MessageSquare,
        title: "Everyone's messages, in one place",
        description:
          "No more announcements buried in a group text, a committee thread on one app, and a DM on another. This is one home for every channel, group conversation, and direct message tied to your program.",
        reason:
          "Because it's the platform you stand on to address your whole program at once, whether that's one contestant or everyone.",
      },
      {
        name: "Merit",
        icon: Scale,
        title: "Judging that adds up correctly, every time",
        description:
          'No more backstage math, no more "did that score get entered right." Judges score, the system tallies — accurately, instantly.',
        reason: "Because at the end of the day, that's what your titleholders are being recognized for.",
      },
      {
        name: "Envoy",
        icon: CalendarCheck,
        title: "A record of every promise made",
        description:
          "Appearances, obligations, deadlines — for you and for your titleholders, at both the pageant level and the sponsor level — tracked so nothing gets promised and forgotten.",
        reason: "Because an envoy is the one who represents you and follows through on what's been committed.",
      },
      {
        name: "Patron",
        icon: Handshake,
        title: "Sponsor relationships, handled like real partnerships",
        description:
          "Who your sponsors are, what they've committed, what they're owed in return, and the full history of the relationship — instead of a folder of old emails.",
        reason:
          "The traditional word for the person or business that champions and funds a program, which is exactly the role your sponsors play.",
      },
      {
        name: "Vault",
        icon: Wallet,
        title: "Every dollar, accounted for",
        description:
          "Expense tracking and management for both directors and titleholders, so pageant-related spending is documented instead of living in someone's personal Venmo history.",
        reason: "Because it's where your program's financial records are kept secure and organized.",
      },
      {
        name: "Spotlight",
        icon: BarChart3,
        title: "Proof of your program's reach",
        description:
          "Real social media analytics and insight into how your program and your titleholders are performing online — useful for your own strategy, and powerful when you're making the case to a sponsor.",
        reason: "Because it shows you exactly where the attention is landing.",
      },
    ],
    closing:
      "You built your program to give women opportunity. Reignara exists so running it doesn't take everything you have left.",
    cta: { label: "Book a walkthrough", href: mailto("Reignara — Book a walkthrough") },
  },
  {
    id: "titleholders",
    label: "Titleholders",
    icon: CrownIcon,
    teaser: "Manage your reign.",
    headline: "Your crown comes with a full calendar. Reignara helps you actually manage it.",
    intro: [
      "The moment you're crowned, the job changes. Appearances, community service, sponsor commitments, media requests, deadlines from your director — it all lands on you at once, and most titleholders end up managing it in a notes app, a paper planner, and a memory that's already stretched thin.",
      "Reignara gives you a real system for your reign, so you can show up prepared instead of scrambling.",
    ],
    foundation: [
      "Your director runs your program on Reignara's command center, which means your applications, your documents, and your history with the program all already live in one organized system — you're not starting from scratch, and neither is your director trying to remember your story.",
    ],
    foundationReason: "That foundation is called Director, and it's what your program is built on.",
    toolsLabel: "Your Tools",
    modules: [
      {
        name: "Reign",
        icon: Smartphone,
        title: "Your reign, in your pocket",
        description:
          "Your calendar, your dashboard, and direct access to your program's announcements — all in one app on your phone, so you always know what's next.",
        reason: "Because this app is built around exactly that: the season you're holding your title.",
      },
      {
        name: "Envoy",
        icon: CalendarCheck,
        title: "Never miss a commitment",
        description:
          "Every obligation tied to your title — pageant appearances and sponsor commitments alike — tracked in one place instead of scattered across texts and emails.",
        reason:
          "It runs on the same system your director uses, because it represents your commitments and makes sure they're followed through on.",
      },
      {
        name: "Podium",
        icon: MessageSquare,
        title: "Stay in the loop with your director",
        description:
          "A direct line to your program through channels and messaging, so important updates don't get buried in a group chat with forty other things happening at once.",
        reason: "It's your platform to speak with, and hear from, your program directly.",
      },
      {
        name: "Vault",
        icon: Wallet,
        title: "Track your spending",
        description:
          "A simple way to track expenses tied to your reign, so when it's time to account for what you've spent representing your title, you're not reconstructing it from memory.",
        reason: "Where your financial records stay secure and organized.",
      },
    ],
    closing: "You earned this title. Reignara helps you carry it with the same confidence you competed with.",
    cta: { label: "Bring reignara to your program", href: mailto("Reignara — A titleholder would love this for our program") },
  },
  {
    id: "contestants",
    label: "Contestants",
    icon: Sparkles,
    teaser: "From application to stage.",
    headline: "Competing is stressful enough. The process shouldn't be.",
    intro: [
      "Before you're a titleholder, you're a contestant trying to navigate an application, a deadline, a fee, a dress code you heard about secondhand — often with no clear place to go when you have a question. A disorganized process doesn't just create stress. It shapes how you feel about the program before you've even stepped on stage.",
      "Reignara gives you a clear, modern way to move through the competition process, from application to show night.",
    ],
    foundation: [
      "The application you're filling out was built specifically for your program's division and season — not a generic form recycled from three years ago — because your director manages it all from one organized system.",
    ],
    foundationReason: "That system is called Director, and it's the foundation your entire program runs on.",
    toolsLabel: "Your Tools",
    modules: [
      {
        name: "Reign",
        icon: Smartphone,
        title: "One place for everything",
        description:
          "Your application status, your calendar of important dates, and your program's announcements — all in one app on your phone. No more guessing whether an email got through.",
        reason: "It's built around your experience during your time in the program, from applicant onward.",
      },
      {
        name: "Podium",
        icon: MessageSquare,
        title: "A direct line to your director",
        description:
          "A real way to ask questions and get updates without it getting lost in a crowded inbox or a group text.",
        reason: "Your platform to communicate directly with your program.",
      },
    ],
    closing:
      "Reignara is built so you can spend your energy preparing to compete — not figuring out how to compete.",
    cta: { label: "Tell your director about reignara", href: mailto("Reignara — A contestant thinks our program should see this") },
  },
  {
    id: "sponsors",
    label: "Sponsors",
    icon: Handshake,
    teaser: "See your impact.",
    headline: "Know exactly what your sponsorship is doing.",
    intro: [
      "Sponsoring a pageant program should mean visibility, goodwill, and a clear return — but too often it means writing a check and hoping someone remembers to post the logo. Reignara gives sponsors a real window into the partnership, not just a promise.",
    ],
    foundation: [
      "Every program on Reignara runs on the same organized command center — the system your point of contact uses to manage the entire pageant, including their relationship with you.",
    ],
    foundationReason: "That foundation is called Director.",
    toolsLabel: "Your Tools",
    modules: [
      {
        name: "Patron",
        icon: Handshake,
        title: "Your relationship, professionally managed",
        description:
          "Your commitments, your benefits, and your full history with the program — managed the way a real business partnership should be, instead of tracked informally by whoever happens to remember.",
        reason:
          "The word for the person or business that champions and funds a program, which is exactly the role you play.",
      },
      {
        name: "Envoy",
        icon: CalendarCheck,
        title: "Commitments that get honored",
        description:
          "The specific obligations tied to your sponsorship — appearances, mentions, deliverables — tracked for both the program and its titleholders, so what was promised is what actually happens.",
        reason: "Built to represent commitments and make sure they're followed through on.",
      },
      {
        name: "Spotlight",
        icon: BarChart3,
        title: "Proof of your reach",
        description:
          "Real social media analytics and insight, so the value of your sponsorship isn't a guess — it's measurable.",
        reason: "Because it shows exactly where the attention is landing.",
      },
    ],
    closing: "Reignara helps pageant programs treat their sponsors like partners, because that's what you are.",
    cta: { label: "Recommend reignara to your program", href: mailto("Reignara — A sponsor recommends this for the program we support") },
  },
]

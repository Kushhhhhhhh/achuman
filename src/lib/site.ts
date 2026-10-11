// ── Everything you might want to change lives in this one file. ──────────────

export const site = {
  /** What the site calls her. Shows up in the title, hero and footer. */
  name: "Achu",

  /**
   * Where the site lives once it's deployed — used to build the absolute URL
   * for the link preview image. Set NEXT_PUBLIC_SITE_URL on your host, or just
   * replace the fallback below with your real domain before you share the link.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Tab title while she's off on another tab. */
  awayTitle: "come back 🥺",

  /** Tiny line above the big heading. */
  kicker: "a little corner of the internet, for",

  /** The big heading on the hero. */
  heading: "Every photo here is my favourite one.",

  /** The paragraph under the heading. */
  intro:
    "Twenty moments I quietly kept, shuffled into no particular order — because picking a best one turned out to be impossible.",

  /** Heading + subtitle for the gallery section. */
  gallery: {
    title: "the collection",
    subtitle: "in no particular order, the way memory actually works",
  },

  /**
   * The letter. Each string is one paragraph.
   * ↓↓ This is the bit you should rewrite in your own words. ↓↓
   */
  letter: {
    title: "a note, while you're here",
    paragraphs: [
      "I'm not very good at saying this kind of thing out loud, so I built it instead.",
      "Somewhere between all these photos is the reason this page exists. You have this way of making an ordinary day feel like it was worth remembering — and apparently I've been remembering a lot of them.",
      "You don't have to do anything with this. It isn't a question. It's just a thank you, in the only language I'm actually fluent in.",
      "Hope it made you smile.",
    ],
    signoff: "always rooting for you,",
    signature: "me",
  },

  /** Footer line. */
  footer: "made slowly, and entirely on purpose",
} as const;

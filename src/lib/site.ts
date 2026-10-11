// ── Everything you might want to change lives in this one file. ─────────────

export const site = {
  /** What the site calls her. Shows up in the title, hero and footer. */
  name: "Achu",

  /**
   * Where the site lives once it's deployed, used to build the absolute URL
   * for the link preview image. Set NEXT_PUBLIC_SITE_URL on your host, or just
   * replace the fallback below with your real domain before you share the link.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Tab title while she's off on another tab. */
  awayTitle: "come back 🥺",

  /** Tiny line above the big heading. */
  kicker: "a little corner of the internet, for",

  /** The big heading on the hero. */
  heading: "Saying this out loud is hard, so I built it instead.",

  /** The paragraph under the heading. */
  intro:
    "No occasion, nothing you need to reply to. Just some things about you that I've been meaning to say properly.",

  /** Short line for the link preview card. */
  tagline: "some things I've been meaning to say",

  /** The list. Each item gets a photo beside it. */
  adore: {
    title: "things I adore about you",
    subtitle: "and this is the short version",
    items: [
      {
        lead: "no pretending",
        text: "We can be completely stupid around each other and it never once feels like either of us is performing. No filter, no version of myself I have to keep up. Just us, talking about anything, laughing at things that are honestly not that funny, and having a ridiculous amount of fun doing it.",
      },
      {
        lead: "your day, all of it",
        text: "I love hearing about your day. Not the summary, the whole thing. The detours, the side characters, the parts you think are boring. I want all of it. (Up until another guy's name comes up. Then I'm listening slightly less enthusiastically. Keep going though.)",
      },
      {
        lead: "the time you choose to give",
        text: "You don't owe me any of your time, and you give it anyway. The small pockets of it, the ones that could have gone anywhere else. I notice every single one of them, probably more than you'd guess.",
      },
      {
        lead: "it happened on its own",
        text: "Nothing about this was forced or planned out. It just grew, slowly, without either of us trying to turn it into something. I think that's exactly why it feels as steady as it does.",
      },
      {
        lead: "you just say it",
        text: "You're honest and straightforward about everything. No guessing, no games, no reading between the lines. You have no idea how rare that is, or how much lighter it makes everything feel.",
      },
      {
        lead: "ordinary days",
        text: "Nothing has to be happening for a day to be a good one. A completely unremarkable afternoon turns into something I end up thinking about later, just because you were in it.",
      },
      {
        lead: "you make me want to be better",
        text: "You push me. The gym, work, the things I keep putting off. You believe I'll get there with so much certainty that I start believing it too. I'm better at being me when you're around.",
      },
      {
        lead: "and then there's your face",
        text: "Your eyes, your smile, your cheeks, your nose, all of it. Genuinely unfair. But the thing that actually gets me is that you could look like that and your personality would still somehow be the best part.",
      },
    ],
  },

  /** Heading + subtitle for the photo wall. */
  gallery: {
    title: "my favourite photos of you",
    subtitle: "no particular order, I like them all too much to rank them",
  },

  /**
   * The closing note. Each string is one paragraph.
   * ↓↓ Rewrite this in your own words whenever you're ready. ↓↓
   */
  letter: {
    title: "one last thing",
    paragraphs: [
      "I've been sitting on most of this for a while, which is probably obvious from how much of it there turned out to be.",
      "You know that thing where something just works, no effort, no overthinking? That's been you, this whole time. I kept waiting for it to get complicated and it never did.",
      "I'm not asking you for anything with this. I just didn't want to be someone who felt all of it and never got around to saying it.",
      "Thank you for being exactly who you are. Please don't change a single thing.",
    ],
    signoff: "always rooting for you,",
    signature: "me",
  },

  /** Footer line. */
  footer: "made slowly, and entirely on purpose",
} as const;

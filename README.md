# for Achu 🌸

A small appreciation site: a hero, a list of things he adores about her, a photo wall, and a closing note.

## Run it

```bash
npm run dev
```

## Changing the words

Everything you'd want to edit lives in **`src/lib/site.ts`**: her name, the headings,
the list in `adore.items`, and the closing note in `letter.paragraphs`.

Each entry in `adore.items` has a short `lead` (the handwritten label) and a `text`
paragraph. Add or remove entries freely; each one picks up the next photo in the running
order automatically, and anything left over fills the photo wall below.

Every entry also gets its own flower tucked onto a corner of its photo: sakura, daisy,
tulip, lavender, hibiscus, lotus, forget-me-not, sunflower, in that order. They live in
`src/components/flowers.tsx`, along with `FLOWER_SPOTS`, which decides which corner each
one sits on. Past eight entries the flowers start again from the beginning.

## Changing the photos

**`originals/` is the source of truth. Never edit `public/photos/` by hand.** It's
generated, and everything in it gets overwritten.

To add, replace or remove a photo:

1. Drop new files into `public/` (or straight into `originals/`). To **replace** one,
   overwrite the file in `originals/` keeping the same filename, which keeps its place
   in the running order.
2. Run:

```bash
npm run photos
```

It moves anything found in `public/` into `originals/`, converts everything to WebP
(lossless for PNGs, quality 100 for JPEGs), regenerates `src/lib/photos.ts` with sizes
and blur placeholders, refreshes the link-preview crop, and deletes outputs that no
longer have a source. Photos it has already converted are left alone.

The order lives in `originals/.order.json`, so adding or swapping one photo doesn't
reshuffle the rest. Delete that file to reshuffle everything from scratch. The first
photo in the order is the hero; the rest fill the gallery.

### Why the filenames have hashes

Output files are named `16-84eaca6c.webp`, where the suffix is a hash of the source
image. Change the photo and the URL changes with it, so the browser, the CDN and Next's
image optimizer all fetch the new one. Reusing a filename is what causes a swapped photo
to keep showing the old version. This makes that impossible.

## The link preview

`src/app/opengraph-image.tsx` renders the card people see when you paste the link into
WhatsApp, iMessage, Discord, etc. It's generated at build time from the hero photo and
the text in `site.ts`, so it updates itself when you change her name or the subtitle.

**Before you share the link**, set the real domain, otherwise the preview points at
localhost and won't load for her. Either set `NEXT_PUBLIC_SITE_URL` on your host, or edit
`url` in `src/lib/site.ts`.

The fonts in `src/app/_fonts/` and the JPEG in `src/app/_og/` exist only for that card
(the preview renderer can't read WebP). `npm run photos` keeps the JPEG in sync.

## Notes

- The page is fully static and set to `noindex`, so it won't show up in search results.
  Link previews still work; unfurlers don't honour `noindex`.
- Petals fall every time the page loads, reloads included.
- The flower in the bottom corner is the scroll indicator. It stays hidden at the
  very top, then opens one petal roughly every fifth of the page, with a thin ring
  tracking the exact position. Same five petals as the site icon.
- Both the petals and the page animations are skipped for anyone who has
  "reduce motion" turned on.
- `originals/` keeps your untouched source files; nothing is deleted.

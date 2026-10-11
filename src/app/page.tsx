import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

const [hero, ...rest] = photos;

/** One photo sits beside each thing on the list; the remainder fill the wall. */
const adorePhotos = rest.slice(0, site.adore.items.length);
const galleryPhotos = rest.slice(site.adore.items.length);

/** Fixed, gentle tilts so every card leans a little differently. */
const TILTS = ["-2.5deg", "1.8deg", "-1.2deg", "2.4deg", "-1.9deg", "1.3deg"];

export default function Home() {
  return (
    <main className="relative flex-1">
      <Blobs />

      {/* ── hero ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pt-10 pb-20 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-28">
        <div className="rise order-2 text-center lg:order-1 lg:text-left">
          <p className="font-hand text-2xl text-rose sm:text-3xl">
            {site.kicker} <span className="text-ink/80">{site.name}</span>
          </p>

          <h1 className="mt-3 font-display text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
            {site.heading}
          </h1>

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-pretty text-ink-soft sm:text-lg lg:mx-0">
            {site.intro}
          </p>

          <a
            href="#adore"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-white/80 px-6 py-3 text-sm font-semibold tracking-wide text-ink shadow-[0_12px_30px_-14px_rgba(167,109,167,0.75)] ring-1 ring-white transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_36px_-14px_rgba(167,109,167,0.8)]"
          >
            start here
            <span aria-hidden className="animate-bob">
              ↓
            </span>
          </a>
        </div>

        <div className="rise order-1 [animation-delay:150ms] lg:order-2">
          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden
              className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-petal via-haze to-sky opacity-80 blur-2xl"
            />
            <div className="relative -rotate-2 overflow-hidden rounded-[2.25rem] border-[10px] border-white shadow-[0_30px_60px_-28px_rgba(120,70,130,0.6)]">
              <Image
                src={hero.src}
                alt={`A photo of ${site.name}`}
                width={hero.width}
                height={hero.height}
                placeholder="blur"
                blurDataURL={hero.blurDataURL}
                quality={90}
                preload
                sizes="(min-width: 640px) 24rem, 88vw"
                className="h-auto w-full"
              />
            </div>
            <span
              aria-hidden
              className="animate-bob absolute -top-4 -right-3 text-4xl drop-shadow-sm"
            >
              🌸
            </span>
          </div>
        </div>
      </section>

      {/* ── things I adore about you ─────────────────────────────────────── */}
      <section
        id="adore"
        className="mx-auto w-full max-w-5xl scroll-mt-10 px-5 pb-24"
      >
        <SectionHeading
          title={site.adore.title}
          subtitle={site.adore.subtitle}
        />

        <ol className="mt-14 flex flex-col gap-20 sm:gap-24">
          {site.adore.items.map((item, index) => {
            const photo = adorePhotos[index];
            const flipped = index % 2 === 1;

            return (
              <li key={item.lead}>
                <Reveal className="grid items-center gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                  {photo ? (
                    <PhotoCard
                      photo={photo}
                      index={index}
                      sizes="(min-width: 1024px) 22rem, (min-width: 640px) 20rem, 82vw"
                      className={`mx-auto w-full max-w-xs sm:max-w-sm ${
                        flipped ? "lg:order-2" : "lg:order-1"
                      }`}
                    />
                  ) : null}

                  <div
                    className={`text-center lg:text-left ${
                      flipped ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-3 lg:justify-start">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/80 font-display text-sm font-semibold text-rose ring-1 ring-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-hand text-2xl text-rose sm:text-3xl">
                        {item.lead}
                      </h3>
                    </div>

                    <p className="mt-4 text-base leading-relaxed text-pretty text-ink sm:text-lg sm:leading-8">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── the photo wall ───────────────────────────────────────────────── */}
      <section
        id="gallery"
        className="mx-auto w-full max-w-6xl scroll-mt-10 px-5 pb-24"
      >
        <SectionHeading
          title={site.gallery.title}
          subtitle={site.gallery.subtitle}
        />

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryPhotos.map((photo, index) => (
            <Reveal
              key={photo.src}
              delay={(index % 3) * 90}
              className="mb-5 break-inside-avoid"
            >
              <PhotoCard
                photo={photo}
                index={index}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── the note ─────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-3xl px-5 pb-24">
        <Reveal>
          <article className="relative rounded-[2rem] bg-white/75 px-6 py-10 shadow-[0_30px_70px_-34px_rgba(120,70,130,0.7)] ring-1 ring-white backdrop-blur-sm sm:px-12 sm:py-14">
            <span
              aria-hidden
              className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-2 rounded-[2px] bg-petal/60 shadow-[0_2px_6px_-2px_rgba(120,70,130,0.45)] ring-1 ring-white/50"
            />

            <h2 className="text-center font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {site.letter.title}
            </h2>

            <div className="paper mt-8 font-hand text-2xl leading-9 text-ink sm:text-[1.65rem]">
              {site.letter.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-9 leading-9 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="mt-10 text-right font-hand text-2xl text-ink-soft">
              {site.letter.signoff}
              <br />
              <span className="text-rose">{site.letter.signature}</span>
            </p>
          </article>
        </Reveal>
      </section>

      {/* ── footer ───────────────────────────────────────────────────────── */}
      <footer className="pb-14 text-center">
        <p className="font-hand text-xl text-ink-soft">
          {site.footer}, for {site.name}{" "}
          <span aria-hidden className="text-rose">
            ♡
          </span>
        </p>
      </footer>
    </main>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Reveal className="text-center">
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <p className="mt-2 font-hand text-xl text-ink-soft sm:text-2xl">
        {subtitle}
      </p>
      <span
        aria-hidden
        className="mx-auto mt-5 block h-px w-24 bg-gradient-to-r from-transparent via-rose to-transparent"
      />
    </Reveal>
  );
}

function PhotoCard({
  photo,
  index,
  sizes,
  className = "",
}: {
  photo: (typeof photos)[number];
  index: number;
  sizes: string;
  className?: string;
}) {
  return (
    <figure
      style={{ "--tilt": TILTS[index % TILTS.length] } as React.CSSProperties}
      className={`group relative overflow-hidden rounded-[1.75rem] border-[6px] border-white bg-white shadow-[0_18px_40px_-22px_rgba(120,70,130,0.65)] transition duration-500 ease-out rotate-[var(--tilt)] hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_26px_50px_-20px_rgba(120,70,130,0.7)] ${className}`}
    >
      <Image
        src={photo.src}
        alt={`A photo of ${site.name}`}
        width={photo.width}
        height={photo.height}
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        quality={90}
        sizes={sizes}
        className="h-auto w-full transition duration-700 ease-out group-hover:scale-[1.04]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose/25 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100"
      />
    </figure>
  );
}

/** Decorative soft colour clouds drifting behind everything. */
function Blobs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <span className="animate-drift absolute -top-24 -left-20 h-80 w-80 rounded-full bg-petal/60 blur-3xl" />
      <span className="animate-drift absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-lilac/40 blur-3xl [animation-delay:-6s]" />
      <span className="animate-drift absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-sky/50 blur-3xl [animation-delay:-12s]" />
    </div>
  );
}

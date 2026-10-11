import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `A page made for ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Fonts and the hero photo, as base64 so the result is serializable and this
 * whole route can be prerendered instead of rebuilt on every unfurl.
 */
async function loadAssets() {
  "use cache";
  cacheLife("max");

  const dir = join(process.cwd(), "src/app");
  const read = (file: string) =>
    readFile(join(dir, file)).then((buffer) => buffer.toString("base64"));

  const [fraunces, caveat, hero] = await Promise.all([
    read("_fonts/fraunces-600.ttf"),
    read("_fonts/caveat-600.ttf"),
    read("_og/hero.jpg"),
  ]);

  return { fraunces, caveat, hero };
}

export default async function Image() {
  const assets = await loadAssets();

  const fraunces = Buffer.from(assets.fraunces, "base64");
  const caveat = Buffer.from(assets.caveat, "base64");
  const heroSrc = `data:image/jpeg;base64,${assets.hero}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 72px",
          backgroundColor: "#fff7fb",
          backgroundImage:
            "radial-gradient(900px 600px at 5% 0%, #ffd7e9 0%, transparent 60%), radial-gradient(800px 560px at 95% 10%, #e2d7ff 0%, transparent 58%), radial-gradient(700px 520px at 60% 100%, #d4ecff 0%, transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            paddingRight: 56,
          }}
        >
          <div
            style={{
              fontFamily: "Caveat",
              fontSize: 42,
              color: "#e26f9c",
            }}
          >
            {site.kicker}
          </div>

          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 132,
              lineHeight: 1,
              color: "#4a3754",
              marginTop: 6,
            }}
          >
            {site.name}
          </div>

          <div
            style={{
              width: 180,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#f7a8c4",
              margin: "32px 0",
            }}
          />

          <div
            style={{
              fontFamily: "Caveat",
              fontSize: 40,
              color: "#6a5879",
              maxWidth: 520,
            }}
          >
            {site.gallery.subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            transform: "rotate(3deg)",
            borderRadius: 40,
            border: "14px solid white",
            overflow: "hidden",
            boxShadow: "0 40px 70px -30px rgba(120,70,130,0.55)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroSrc} width={380} height={507} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 600 },
        { name: "Caveat", data: caveat, style: "normal", weight: 600 },
      ],
    },
  );
}

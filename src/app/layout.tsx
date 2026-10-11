import type { Metadata } from "next";
import { Caveat, Fraunces, Quicksand } from "next/font/google";
import "./globals.css";
import { Petals } from "@/components/petals";
import { ScrollBloom } from "@/components/scroll-bloom";
import { TabTitle } from "@/components/tab-title";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `for ${site.name}`,
  description: site.intro,
  // it's a private little thing, so keep it out of search results
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title: `for ${site.name}`,
    description: site.intro,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${quicksand.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {/* Runs before the page paints. Without it, nothing is ever hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        <TabTitle away={site.awayTitle} />
        <Petals />
        <ScrollBloom />
        {children}
      </body>
    </html>
  );
}

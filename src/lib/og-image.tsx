import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { ImageResponse } from "next/og";
import type { ProjectLogo } from "@/data/projects";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Satori can't fetch /public paths, so inline the pixel portrait as a data
// URL.
const portrait = `data:image/png;base64,${await readFile(
  join(process.cwd(), "public", site.pixelPortrait.src),
  "base64",
)}`;

// Social cards are images, not themed pages, so colors are fixed here
// (matching the dark theme in globals.css).
const colors = {
  background: "#0d0f15",
  panel: "#1c1e26",
  foreground: "#edeef2",
  muted: "#9a9fa7",
  gold: "#f2bf3f",
};

async function inlineLogo(logo: ProjectLogo) {
  // The card is dark, so prefer the dark-background variant.
  const file = logo.darkSrc ?? logo.src;
  const type = extname(file) === ".svg" ? "svg+xml" : extname(file).slice(1);
  const data = await readFile(join(process.cwd(), "public", file), "base64");
  return `data:image/${type};base64,${data}`;
}

export async function renderOgImage({
  eyebrow,
  title,
  description,
  logo,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  logo?: ProjectLogo;
}) {
  const logoSrc = logo && (await inlineLogo(logo));
  // Wordmarks replace the title; marks sit beside it.
  const logoHeight = logo?.wordmark ? 84 : 62;
  const logoImage = logo && logoSrc && (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoSrc}
      alt=""
      height={logoHeight}
      width={(logoHeight * logo.width) / logo.height}
    />
  );

  // The card is one game window, like the site's: a paper frame under a
  // paper title bar, on a gold hard shadow. (Satori can't load the site's
  // WOFF2 pixel face, so the type is its default sans.)
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "44px 56px 56px 44px",
          background: colors.background,
          color: colors.foreground,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            border: `6px solid ${colors.foreground}`,
            boxShadow: `12px 12px 0 ${colors.gold}`,
            background: colors.background,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 24px",
              background: colors.foreground,
              color: colors.background,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            <div>{eyebrow}</div>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 18, height: 18, background: colors.gold }} />
              <div
                style={{ width: 18, height: 18, background: colors.background }}
              />
              <div
                style={{ width: 18, height: 18, background: colors.background }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexGrow: 1,
              padding: "40px 48px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {logo?.wordmark ? (
                logoImage
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    fontSize: 60,
                    fontWeight: 600,
                    letterSpacing: -2,
                    lineHeight: 1.1,
                  }}
                >
                  {logoImage}
                  {/* Satori ignores \n in text, so each line gets its own
                      block. */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {title.split("\n").map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
              )}
              {description && (
                <div
                  style={{
                    fontSize: 30,
                    lineHeight: 1.4,
                    color: colors.muted,
                  }}
                >
                  {description}
                </div>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {/* The 128px pixel portrait at 1×, in a square frame on a
                  small gold shadow. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portrait}
                alt=""
                width={128}
                height={128}
                style={{
                  background: colors.panel,
                  border: `4px solid ${colors.foreground}`,
                  boxShadow: `6px 6px 0 ${colors.gold}`,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 34, fontWeight: 600 }}>{site.name}</div>
                <div style={{ fontSize: 26, color: colors.muted }}>
                  {site.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}

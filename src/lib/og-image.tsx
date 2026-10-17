import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { ImageResponse } from "next/og";
import type { ProjectLogo } from "@/data/projects";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Satori can't fetch /public paths, so inline the portrait as a data URL.
const portrait = site.photo
  ? `data:image/${extname(site.photo) === ".png" ? "png" : "jpeg"};base64,${await readFile(
      join(process.cwd(), "public", site.photo),
      "base64",
    )}`
  : null;

// Social cards are images, not themed pages, so colors are fixed here
// (matching the dark theme in globals.css).
const colors = {
  background: "#0a0a0a",
  foreground: "#fafafa",
  muted: "#a1a1a1",
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
  const logoHeight = logo?.wordmark ? 88 : 68;
  const logoImage = logo && logoSrc && (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoSrc}
      alt=""
      height={logoHeight}
      width={(logoHeight * logo.width) / logo.height}
    />
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 80,
          background: colors.background,
          color: colors.foreground,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 28, color: colors.muted }}>{eyebrow}</div>
          {logo?.wordmark ? (
            logoImage
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                fontSize: 68,
                fontWeight: 600,
                letterSpacing: -2,
                lineHeight: 1.1,
              }}
            >
              {logoImage}
              {/* Satori ignores \n in text, so each line gets its own block. */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {title.split("\n").map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          )}
          {description && (
            <div style={{ fontSize: 32, lineHeight: 1.4, color: colors.muted }}>
              {description}
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {portrait && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={portrait}
              alt=""
              width={80}
              height={80}
              style={{ borderRadius: 9999, objectFit: "cover" }}
            />
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 30, fontWeight: 600 }}>{site.name}</div>
            <div style={{ fontSize: 24, color: colors.muted }}>{site.role}</div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}

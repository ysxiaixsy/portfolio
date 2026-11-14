// Heights, as a share of each row, of the far hills and the near towers.
const hills = [30, 48, 66, 80, 72, 54, 40, 52, 74, 92, 100, 84, 60, 44, 34, 46];
const towers = [40, 70, 55, 90, 35, 60, 100, 45, 75, 50, 30, 65, 85, 40];

// Where the stars sit: each one is a shadow of a single art pixel.
const stars =
  "60px 30px, 190px 66px, 330px 21px, 470px 84px, 560px 39px, 700px 72px, 820px 27px, 940px 90px, 1040px 48px, 1180px 18px, 1290px 63px, 130px 96px";
const farStars =
  "110px 48px, 250px 24px, 400px 60px, 630px 15px, 760px 45px, 890px 66px, 1000px 21px, 1120px 78px, 1240px 36px";

// The strip above the footer: a pixel skyline that follows the theme. By
// day, a banded sky with a sun and drifting clouds; by night, stars, a moon
// and lit windows. A small figure walks the ground line. It is scenery, so
// it is hidden from assistive tech, and every moving part only translates.
export function Skyline() {
  return (
    <div
      aria-hidden="true"
      className="@container relative h-44 overflow-hidden bg-[linear-gradient(var(--sky-1)_0_30%,var(--sky-2)_30%_58%,var(--sky-3)_58%)]"
    >
      {/* Dither where one band of sky meets the next. */}
      <div className="absolute inset-x-0 top-[calc(30%-var(--pixel))] h-[calc(var(--pixel)*2)] pixel-dither [--dither-color:var(--sky-1)]" />
      <div className="absolute inset-x-0 top-[calc(58%-var(--pixel))] h-[calc(var(--pixel)*2)] pixel-dither [--dither-color:var(--sky-2)]" />

      {/* Stars, at night only: one layer steady, one blinking. */}
      <div
        className="absolute top-0 left-0 hidden size-(--pixel) text-[color:var(--sun)] dark:block"
        style={{ boxShadow: stars }}
      />
      <div
        className="absolute top-0 left-0 hidden size-(--pixel) animate-blink text-[color:var(--sun)] motion-reduce:animate-none dark:block"
        style={{ boxShadow: farStars }}
      />

      {/* The sun, or the moon. */}
      <div className="absolute top-5 right-[12%] size-12 bg-(--sun)" />

      {/* Clouds, stepping slowly across and back. */}
      <div className="absolute top-8 left-[38%] h-[calc(var(--pixel)*6)] w-20 animate-drift bg-background opacity-90 shadow-[18px_-12px_0_0_var(--background),42px_-12px_0_0_var(--background)] motion-reduce:animate-none dark:opacity-15" />
      <div className="absolute top-16 left-[8%] h-[calc(var(--pixel)*5)] w-14 animate-drift bg-background opacity-90 shadow-[15px_-9px_0_0_var(--background)] [animation-duration:85s] motion-reduce:animate-none dark:opacity-15" />

      <div className="absolute inset-x-0 bottom-4 flex h-24 items-end">
        {hills.map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-(--hill)"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-4 flex h-20 items-end gap-(--pixel) px-[3%]">
        {towers.map((height, i) => (
          <div
            key={i}
            className="relative flex-1 bg-(--tower)"
            style={{ height: `${height}%` }}
          >
            {/* Windows: faint by day, lit at night. */}
            <div className="absolute inset-x-[6px] top-[9px] bottom-[6px] bg-[conic-gradient(var(--gold)_0_25%,transparent_0)] bg-[size:12px_12px] opacity-25 dark:opacity-90" />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-4 border-t-(length:--pixel) border-(--tower) bg-(--ground)" />

      {/* The walker: three art pixels per pixel, crossing the strip. */}
      <svg
        viewBox="0 0 4 7"
        shapeRendering="crispEdges"
        className="absolute bottom-4 -left-3 h-[21px] w-[12px] animate-walk motion-reduce:hidden"
      >
        <path d="M1 0h2v2H1z" className="fill-gold" />
        <path d="M0 2h4v3H0z" className="fill-highlight" />
        <path d="M0 5h1v2H0zM3 5h1v2H3z" className="fill-foreground" />
      </svg>
    </div>
  );
}

import Link from "next/link";
import { journey } from "@/data/journey";

export function JourneyTimeline() {
  return (
    <ol className="flex flex-col gap-10 pixel-rule-s ps-6">
      {journey.map((entry) => (
        <li key={`${entry.place}-${entry.start}`} className="relative">
          {/* Dot sitting on the timeline rule. */}
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[calc(--spacing(6)+var(--pixel))] size-[calc(var(--pixel)*3)] bg-foreground"
          />
          <p className="text-sm text-muted-foreground">
            {entry.start}–{entry.end ?? "Present"}
          </p>
          <h4 className="mt-1">
            {entry.title} <span className="text-muted-foreground">at</span>{" "}
            {entry.place}
          </h4>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {entry.involvements.map((item) => (
              <li key={`${item.org}-${item.role}`}>
                <p className="">
                  {item.href ? (
                    <Link
                      href={item.href}
                      transitionTypes={["nav-forward"]}
                      className="text-link"
                    >
                      {item.org}
                    </Link>
                  ) : (
                    item.org
                  )}
                </p>
                <p className="text-muted-foreground">
                  {item.role}
                  {item.years && `, ${item.years}`}
                </p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

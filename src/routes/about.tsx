import { createFileRoute, Link } from "@tanstack/react-router";
import aboutImage from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — AUREL" },
      {
        name: "description",
        content:
          "AUREL makes fewer things, properly. Read the story behind our limited-run menswear, fabrics and finishing.",
      },
      { property: "og:title", content: "Our Story — AUREL" },
      {
        property: "og:description",
        content: "Fewer things, made properly. The AUREL story.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-24">
      <p className="eyebrow">Our story</p>
      <h1 className="mt-4 text-3xl leading-tight font-light lg:text-5xl">
        FEWER THINGS,
        <br />
        <span className="text-primary">MADE PROPERLY.</span>
      </h1>
      <span className="gold-rule mt-6 block" />

      <img
        src={aboutImage}
        alt="AUREL atelier at night, lit by a single warm lamp"
        loading="lazy"
        width={1200}
        height={900}
        className="mt-12 w-full border border-border object-cover"
      />

      <div className="mt-12 space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          AUREL was founded in 2019 above a fabric market in Bengaluru, with two
          tailors, one cutting table and a stubborn belief that most menswear was
          designed for shelves rather than for men.
        </p>
        <p>
          We work in small runs. A pattern is graded on real bodies before it is cut,
          then worn for a season by the people who made it. Only then does it reach the
          collection. Fabrics come from mills we visit — long-staple cottons, dry-finish
          wools, Japanese denim woven on shuttle looms.
        </p>
        <p>
          The palette rarely changes: black, charcoal, ivory and a single line of gold.
          It is not a trend, it is a discipline. Get the black right and everything else
          becomes easy.
        </p>
      </div>

      <div className="mt-16 grid gap-8 border-y border-border py-12 sm:grid-cols-3">
        {[
          ["07", "Years of making"],
          ["120+", "Limited runs released"],
          ["48K", "Men dressed"],
        ].map(([value, label]) => (
          <div key={label}>
            <p className="font-display text-4xl text-primary">{value}</p>
            <p className="eyebrow mt-2">{label}</p>
          </div>
        ))}
      </div>

      <Link
        to="/shop"
        search={{}}
        className="mt-14 inline-block bg-primary px-10 py-4 text-xs tracking-[0.28em] text-primary-foreground transition-opacity hover:opacity-90"
      >
        SHOP THE COLLECTION
      </Link>
    </div>
  );
}

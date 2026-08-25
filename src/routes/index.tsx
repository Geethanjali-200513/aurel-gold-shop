import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import heroImage from "@/assets/hero.jpg";
import aboutImage from "@/assets/about.jpg";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AUREL — Elevate Your Everyday | Premium Menswear" },
      {
        name: "description",
        content:
          "Timeless menswear crafted for the modern man. Shop shirts, denim, tailoring and accessories in black-and-gold luxury.",
      },
      { property: "og:title", content: "AUREL — Elevate Your Everyday" },
      {
        property: "og:description",
        content: "Timeless styles crafted for the modern man.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const arrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const [email, setEmail] = useState("");

  return (
    <>
      <section className="relative">
        <img
          src={heroImage}
          alt="Man in a tailored black overcoat lit by warm gold light"
          width={1600}
          height={1104}
          className="h-[70vh] min-h-[460px] w-full object-cover object-center lg:h-[86vh]"
        />
        <div className="hero-veil absolute inset-0" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="max-w-xl">
              <p className="eyebrow">Autumn Collection 2026</p>
              <h1 className="mt-6 font-display text-4xl leading-[1.05] font-light sm:text-5xl lg:text-6xl">
                ELEVATE YOUR
                <br />
                <span className="text-primary">EVERYDAY</span>
              </h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Timeless styles crafted for the modern man.
              </p>
              <Link
                to="/shop"
                search={{}}
                className="mt-10 inline-block bg-primary px-10 py-4 text-xs tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">Shop by category</p>
          <h2 className="text-3xl font-light lg:text-4xl">The Wardrobe</h2>
          <span className="gold-rule mt-2" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to="/shop"
              search={{ category: cat.slug }}
              className="group relative overflow-hidden border border-border/60"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                width={900}
                height={1100}
                className="aspect-[4/5] w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background to-transparent px-4 py-5 sm:px-6">
                <h3 className="text-base tracking-[0.2em] uppercase sm:text-lg">
                  {cat.name}
                </h3>
                <span className="text-[10px] tracking-[0.2em] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  VIEW
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Most wanted</p>
              <h2 className="mt-3 text-3xl font-light lg:text-4xl">Featured Pieces</h2>
              <span className="gold-rule mt-4 block" />
            </div>
            <Link
              to="/shop"
              search={{}}
              className="border border-primary px-7 py-3 text-[11px] tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              VIEW ALL
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Just landed</p>
            <h2 className="mt-3 text-3xl font-light lg:text-4xl">New Arrivals</h2>
            <span className="gold-rule mt-4 block" />
          </div>
          <Link
            to="/new-arrivals"
            className="text-[11px] tracking-[0.25em] text-primary uppercase hover:opacity-80"
          >
            See everything new
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          {arrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
          <img
            src={aboutImage}
            alt="Dark tailoring atelier lit by a single warm lamp"
            loading="lazy"
            width={1200}
            height={900}
            className="w-full border border-border object-cover"
          />
          <div>
            <p className="eyebrow">The house of AUREL</p>
            <h2 className="mt-5 text-3xl leading-tight font-light lg:text-4xl">
              Built for the man who
              <br />
              <span className="text-primary">dresses with intent.</span>
            </h2>
            <span className="gold-rule mt-6 block" />
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              AUREL began in a single Bengaluru workshop with one rule: make fewer
              things, and make them properly. Every fabric is sourced from mills we
              visit, every pattern is graded on real bodies, and every run is limited so
              nothing feels ordinary.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The result is a wardrobe of quiet, deliberate pieces — black at its core,
              gold at its edges.
            </p>
            <Link
              to="/about"
              className="mt-10 inline-block border border-primary px-8 py-4 text-[11px] tracking-[0.28em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              DISCOVER OUR STORY
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:py-28">
        <p className="eyebrow">Newsletter</p>
        <h2 className="mt-4 text-3xl font-light lg:text-4xl">JOIN THE CLUB</h2>
        <p className="mt-4 text-sm text-muted-foreground">
          Get exclusive access to new drops and special offers.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast("Welcome to the club — check your inbox.");
            setEmail("");
          }}
          className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-label="Email address"
            className="flex-1 border border-border bg-surface px-5 py-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary px-8 py-4 text-[11px] tracking-[0.28em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            SUBSCRIBE
          </button>
        </form>
      </section>
    </>
  );
}

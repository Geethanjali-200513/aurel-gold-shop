import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — AUREL Menswear" },
      {
        name: "description",
        content:
          "Explore AUREL collections by category — t-shirts, shirts, trousers, jeans, jackets and accessories.",
      },
      { property: "og:title", content: "Collections — AUREL Menswear" },
      {
        property: "og:description",
        content: "Six edits, one wardrobe. Explore the AUREL collections.",
      },
    ],
  }),
  component: Collections,
});

function Collections() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <p className="eyebrow">Curated edits</p>
      <h1 className="mt-3 text-3xl font-light lg:text-4xl">COLLECTIONS</h1>
      <span className="gold-rule mt-5 block" />

      <div className="mt-14 space-y-6">
        {CATEGORIES.map((cat, i) => {
          const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
          return (
            <Link
              key={cat.slug}
              to="/shop"
              search={{ category: cat.slug }}
              className={`group grid items-center gap-8 border border-border/60 bg-surface p-4 sm:grid-cols-2 sm:p-6 ${
                i % 2 === 1 ? "sm:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  width={900}
                  height={1100}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-2 sm:px-6">
                <p className="eyebrow">0{i + 1}</p>
                <h2 className="mt-4 text-2xl font-light lg:text-3xl">{cat.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {count} {count === 1 ? "piece" : "pieces"} in the current edit, cut in
                  fabrics chosen for weight, drape and longevity.
                </p>
                <span className="mt-6 inline-block text-[11px] tracking-[0.25em] text-primary uppercase">
                  Explore →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

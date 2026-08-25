import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — AUREL Menswear" },
      {
        name: "description",
        content:
          "The latest AUREL drops: leather outerwear, tailored blazers, raw denim and gold-toned accessories.",
      },
      { property: "og:title", content: "New Arrivals — AUREL Menswear" },
      {
        property: "og:description",
        content: "Freshly landed pieces from the AUREL atelier.",
      },
    ],
  }),
  component: NewArrivals,
});

function NewArrivals() {
  const arrivals = PRODUCTS.filter((p) => p.isNew);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <p className="eyebrow">Just landed</p>
      <h1 className="mt-3 text-3xl font-light lg:text-4xl">NEW ARRIVALS</h1>
      <span className="gold-rule mt-5 block" />
      <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Limited runs, released in small numbers. Once a piece is gone, it rarely returns.
      </p>

      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
        {arrivals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

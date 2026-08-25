import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, PRODUCTS, SIZES, formatINR } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

type ShopSearch = {
  q?: string;
  category?: string;
  size?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "rating";
  max?: number;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
    size: typeof search.size === "string" ? search.size : undefined,
    sort: ["price-asc", "price-desc", "rating", "featured"].includes(
      String(search.sort),
    )
      ? (search.sort as ShopSearch["sort"])
      : undefined,
    max: Number(search.max) > 0 ? Number(search.max) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Menswear — AUREL" },
      {
        name: "description",
        content:
          "Browse the full AUREL collection: t-shirts, shirts, trousers, jeans, jackets and accessories. Filter by size, category and price.",
      },
      { property: "og:title", content: "Shop All Menswear — AUREL" },
      {
        property: "og:description",
        content: "Filter the full AUREL collection by category, size and price.",
      },
    ],
  }),
  component: Shop,
});

const MAX_PRICE = 15000;

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const set = (patch: Partial<ShopSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const max = search.max ?? MAX_PRICE;

  let products = PRODUCTS.filter((p) => {
    if (search.category && p.category !== search.category) return false;
    if (search.size && !p.sizes.includes(search.size as never)) return false;
    if (p.price > max) return false;
    if (search.q) {
      const q = search.q.toLowerCase();
      if (
        !p.name.toLowerCase().includes(q) &&
        !p.category.includes(q) &&
        !p.description.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  if (search.sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  if (search.sort === "price-desc")
    products = [...products].sort((a, b) => b.price - a.price);
  if (search.sort === "rating")
    products = [...products].sort((a, b) => b.rating - a.rating);

  const hasFilters = Boolean(
    search.category || search.size || search.q || search.max || search.sort,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <p className="eyebrow">
        {search.q ? `Results for “${search.q}”` : "All products"}
      </p>
      <h1 className="mt-3 text-3xl font-light lg:text-4xl">THE COLLECTION</h1>
      <span className="gold-rule mt-5 block" />

      <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
        <aside className="space-y-10">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
              <SlidersHorizontal className="size-4 text-primary" /> Filters
            </span>
            {hasFilters && (
              <button
                type="button"
                onClick={() =>
                  navigate({
                    search: {},
                  })
                }
                className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary"
              >
                <X className="size-3" /> Clear
              </button>
            )}
          </div>

          <div>
            <h2 className="eyebrow">Category</h2>
            <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-2.5">
              <button
                type="button"
                onClick={() => set({ category: undefined })}
                className={`border px-3 py-2 text-left text-xs tracking-wide transition-colors ${
                  !search.category
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => set({ category: c.slug })}
                  className={`border px-3 py-2 text-left text-xs tracking-wide transition-colors ${
                    search.category === c.slug
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="eyebrow">Size</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set({ size: search.size === s ? undefined : s })}
                  className={`size-10 border text-xs transition-colors ${
                    search.size === s
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="eyebrow">Max price</h2>
            <input
              type="range"
              min={1000}
              max={MAX_PRICE}
              step={500}
              value={max}
              onChange={(e) => set({ max: Number(e.target.value) })}
              aria-label="Maximum price"
              className="mt-4 w-full accent-[var(--primary)]"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Up to {formatINR(max)}
            </p>
          </div>

          <div>
            <h2 className="eyebrow">Sort by</h2>
            <div className="mt-4 flex flex-col gap-2.5">
              {(
                [
                  ["featured", "Featured"],
                  ["price-asc", "Price: low to high"],
                  ["price-desc", "Price: high to low"],
                  ["rating", "Top rated"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set({ sort: value })}
                  className={`text-left text-xs tracking-wide transition-colors ${
                    (search.sort ?? "featured") === value
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <p className="mb-8 text-xs text-muted-foreground">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
          {products.length === 0 ? (
            <div className="border border-border px-6 py-20 text-center">
              <p className="text-sm text-muted-foreground">
                Nothing matches those filters.
              </p>
              <Link
                to="/shop"
                search={{}}
                className="mt-6 inline-block border border-primary px-6 py-3 text-[11px] tracking-[0.25em] text-primary hover:bg-primary hover:text-primary-foreground"
              >
                RESET
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

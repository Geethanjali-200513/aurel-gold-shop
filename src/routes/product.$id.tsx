import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, RotateCcw, Ruler, Truck } from "lucide-react";
import { toast } from "sonner";
import {
  PRODUCTS,
  SIZES,
  formatINR,
  getProduct,
  type Size,
} from "@/data/products";
import { Stars } from "@/components/Stars";
import { ProductCard } from "@/components/ProductCard";
import { useShop } from "@/lib/shop-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — AUREL" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — AUREL` },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: `${product.name} — AUREL` },
        { property: "og:description", content: product.description.slice(0, 155) },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, inWishlist, setCartOpen } = useShop();
  const navigate = useNavigate();
  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  )
    .concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, 4);

  const requireSize = () => {
    if (!size) {
      toast("Please select a size first.");
      return false;
    }
    return true;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" search={{ category: product.category }} className="hover:text-primary">
          {product.category.replace("-", " ")}
        </Link>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex gap-4 sm:flex-col">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`w-20 border transition-colors ${
                  active === i ? "border-primary" : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  loading="lazy"
                  width={900}
                  height={1100}
                  className="aspect-[4/5] w-full object-cover"
                />
              </button>
            ))}
          </div>
          <div className="flex-1 border border-border bg-surface">
            <img
              src={product.images[active]}
              alt={product.name}
              width={900}
              height={1100}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        <div>
          {product.isNew && (
            <span className="inline-block bg-primary px-3 py-1 text-[10px] tracking-[0.25em] text-primary-foreground">
              NEW
            </span>
          )}
          <h1 className="mt-4 text-3xl leading-tight font-light lg:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <Stars rating={product.rating} reviews={product.reviews} />
            <span className="text-xs text-muted-foreground">
              {product.reviews} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-2xl text-primary">{formatINR(product.price)}</span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through">
                {formatINR(product.compareAt)}
              </span>
            )}
            <span className="text-[11px] text-muted-foreground">incl. of all taxes</span>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="eyebrow">Select size</h2>
              <span className="flex items-center gap-1.5 text-[11px] text-primary">
                <Ruler className="size-3.5" /> Size guide below
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {SIZES.map((s) => {
                const available = product.sizes.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={!available}
                    onClick={() => setSize(s)}
                    className={`size-12 border text-sm transition-colors ${
                      size === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : available
                          ? "border-border text-foreground hover:border-primary"
                          : "cursor-not-allowed border-border/40 text-muted-foreground/40 line-through"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="eyebrow">Quantity</h2>
            <div className="mt-4 inline-flex items-center border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid size-11 place-items-center text-muted-foreground hover:text-primary"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-12 text-center text-sm">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(9, q + 1))}
                className="grid size-11 place-items-center text-muted-foreground hover:text-primary"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                if (!requireSize()) return;
                addToCart(product.id, size!, qty);
                setCartOpen(true);
              }}
              className="flex-1 bg-primary py-4 text-xs tracking-[0.28em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              ADD TO CART
            </button>
            <button
              type="button"
              onClick={() => {
                if (!requireSize()) return;
                addToCart(product.id, size!, qty);
                navigate({ to: "/checkout" });
              }}
              className="flex-1 border border-primary py-4 text-xs tracking-[0.28em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              BUY NOW
            </button>
            <button
              type="button"
              aria-label="Toggle wishlist"
              onClick={() => {
                toggleWishlist(product.id);
                toast(
                  inWishlist(product.id) ? "Removed from wishlist" : "Saved to wishlist",
                );
              }}
              className="grid size-14 shrink-0 place-items-center border border-border transition-colors hover:border-primary"
            >
              <Heart
                className={
                  inWishlist(product.id)
                    ? "size-5 fill-primary text-primary"
                    : "size-5 text-foreground"
                }
              />
            </button>
          </div>

          <div className="mt-8 grid gap-3 border border-border/70 p-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-3">
              <Truck className="size-4 text-primary" /> Free shipping on orders above
              ₹999 · dispatched in 24 hours
            </span>
            <span className="flex items-center gap-3">
              <RotateCcw className="size-4 text-primary" /> 15-day easy returns and free
              size exchange
            </span>
          </div>

          <Accordion type="single" collapsible className="mt-10" defaultValue="desc">
            <AccordionItem value="desc" className="border-border">
              <AccordionTrigger className="text-xs tracking-[0.2em] uppercase hover:no-underline">
                Description
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="size" className="border-border">
              <AccordionTrigger className="text-xs tracking-[0.2em] uppercase hover:no-underline">
                Size guide
              </AccordionTrigger>
              <AccordionContent>
                <table className="w-full text-left text-sm text-muted-foreground">
                  <thead>
                    <tr className="border-b border-border text-[11px] tracking-[0.15em] text-foreground uppercase">
                      <th className="py-2">Size</th>
                      <th className="py-2">Chest (in)</th>
                      <th className="py-2">Waist (in)</th>
                      <th className="py-2">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["S", "36", "30", "27"],
                      ["M", "38", "32", "28"],
                      ["L", "40", "34", "29"],
                      ["XL", "42", "36", "30"],
                      ["XXL", "44", "38", "31"],
                    ].map((row) => (
                      <tr key={row[0]} className="border-b border-border/50">
                        {row.map((cell, i) => (
                          <td key={i} className="py-2.5">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="delivery" className="border-border">
              <AccordionTrigger className="text-xs tracking-[0.2em] uppercase hover:no-underline">
                Delivery information
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p>Metro cities: 2–3 business days. Rest of India: 4–6 business days.</p>
                <p>
                  Cash on delivery available up to ₹10,000. Orders placed before 2 PM IST
                  ship the same day.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <section className="mt-24">
        <p className="eyebrow">Complete the look</p>
        <h2 className="mt-3 text-2xl font-light lg:text-3xl">Related Pieces</h2>
        <span className="gold-rule mt-4 block" />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

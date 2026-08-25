import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { formatINR, type Product } from "@/data/products";
import { useShop } from "@/lib/shop-store";
import { Stars } from "@/components/Stars";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, inWishlist, setCartOpen } = useShop();
  const wished = inWishlist(product.id);

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden border border-border/60 bg-surface">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          aria-label={product.name}
          className="block"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            width={900}
            height={1100}
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        {product.isNew && (
          <span className="absolute left-0 top-3 bg-primary px-3 py-1 text-[10px] font-medium tracking-[0.25em] text-primary-foreground">
            NEW
          </span>
        )}

        <button
          type="button"
          onClick={() => {
            toggleWishlist(product.id);
            toast(wished ? "Removed from wishlist" : "Saved to wishlist");
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute right-3 top-3 grid size-9 place-items-center border border-border/70 bg-background/70 backdrop-blur transition-colors hover:border-primary"
        >
          <Heart
            className={
              wished ? "size-4 fill-primary text-primary" : "size-4 text-foreground"
            }
          />
        </button>

        <button
          type="button"
          onClick={() => {
            addToCart(product.id, product.sizes[Math.min(1, product.sizes.length - 1)]);
            setCartOpen(true);
          }}
          className="absolute inset-x-0 bottom-0 translate-y-full bg-primary py-3 text-xs font-medium tracking-[0.25em] text-primary-foreground transition-transform duration-300 group-hover:translate-y-0 focus-visible:translate-y-0"
        >
          ADD TO CART
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="block text-sm tracking-wide text-foreground transition-colors hover:text-primary"
        >
          {product.name}
        </Link>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-primary">{formatINR(product.price)}</span>
          {product.compareAt && (
            <span className="text-xs text-muted-foreground line-through">
              {formatINR(product.compareAt)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

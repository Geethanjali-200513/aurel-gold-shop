import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatINR } from "@/data/products";
import { useShop } from "@/lib/shop-store";

export function CartDrawer() {
  const { cartOpen, setCartOpen, detailed, updateQty, removeFromCart, subtotal } =
    useShop();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col border-border bg-background sm:max-w-md">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="text-lg font-normal tracking-[0.2em] uppercase">
            Your Bag
          </SheetTitle>
        </SheetHeader>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            <Link
              to="/shop"
              onClick={() => setCartOpen(false)}
              className="border border-primary px-6 py-3 text-xs tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
              {detailed.map(({ item, product }) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    width={900}
                    height={1100}
                    className="h-28 w-20 shrink-0 border border-border object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to="/product/$id"
                        params={{ id: product.id }}
                        onClick={() => setCartOpen(false)}
                        className="text-sm tracking-wide hover:text-primary"
                      >
                        {product.name}
                      </Link>
                      <button
                        type="button"
                        aria-label="Remove item"
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Size {item.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                          className="grid size-8 place-items-center text-muted-foreground hover:text-primary"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                          className="grid size-8 place-items-center text-muted-foreground hover:text-primary"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-sm text-primary">
                        {formatINR(product.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-border px-4 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="eyebrow">Subtotal</span>
                <span className="text-primary">{formatINR(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {subtotal >= 999
                  ? "Free shipping applied."
                  : `Add ${formatINR(999 - subtotal)} more for free shipping.`}
              </p>
              <Link
                to="/checkout"
                onClick={() => setCartOpen(false)}
                className="block bg-primary py-3.5 text-center text-xs tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                CHECKOUT
              </Link>
              <Link
                to="/cart"
                onClick={() => setCartOpen(false)}
                className="block border border-border py-3.5 text-center text-xs tracking-[0.25em] text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                VIEW BAG
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

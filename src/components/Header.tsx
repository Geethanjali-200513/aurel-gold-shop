import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useShop } from "@/lib/shop-store";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Collections", to: "/collections" },
  { label: "About", to: "/about" },
] as const;

export function Header() {
  const { count, wishlist, setCartOpen } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/shop", search: { q: query.trim() || undefined } });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur">
      <div className="border-b border-primary/25 bg-surface py-2.5 text-center">
        <p className="text-[10px] tracking-[0.3em] text-primary sm:text-[11px]">
          FREE SHIPPING ON ORDERS ABOVE ₹999
        </p>
      </div>

      <div className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-10">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="text-foreground transition-colors hover:text-primary lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <Link
            to="/"
            className="font-display text-2xl tracking-[0.35em] text-foreground lg:text-[26px]"
          >
            AUREL
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "text-primary" }}
                className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="text-foreground transition-colors hover:text-primary"
            >
              <Search className="size-[18px]" />
            </button>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden text-foreground transition-colors hover:text-primary sm:block"
            >
              <User className="size-[18px]" />
            </Link>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative text-foreground transition-colors hover:text-primary"
            >
              <Heart className="size-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 grid size-4 place-items-center bg-primary text-[9px] text-primary-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
              className="relative text-foreground transition-colors hover:text-primary"
            >
              <ShoppingBag className="size-[18px]" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 grid size-4 place-items-center bg-primary text-[9px] text-primary-foreground">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border bg-surface">
            <form
              onSubmit={submitSearch}
              className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-10"
            >
              <Search className="size-4 text-primary" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for shirts, denim, jackets…"
                aria-label="Search products"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="text-[11px] tracking-[0.2em] text-primary uppercase"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <span className="font-display text-xl tracking-[0.35em]">AUREL</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="text-foreground hover:text-primary"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/60 py-5 font-display text-2xl tracking-wide text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="py-5 text-xs tracking-[0.25em] text-primary uppercase"
            >
              Wishlist ({wishlist.length})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

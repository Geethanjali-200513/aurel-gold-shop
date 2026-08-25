import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { CATEGORIES } from "@/data/products";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-10 lg:py-20">
        <div className="space-y-5">
          <span className="font-display text-2xl tracking-[0.35em]">AUREL</span>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Considered menswear for men who dress with intent. Made in limited runs,
            finished by hand.
          </p>
          <div className="flex items-center gap-4">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="AUREL social profile"
                className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow">Shop</h3>
          <ul className="mt-5 space-y-3">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/shop"
                  search={{ category: c.slug }}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Customer Care</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/shipping" className="transition-colors hover:text-primary">
                Shipping &amp; Delivery
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="transition-colors hover:text-primary">
                Returns &amp; Exchanges
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="transition-colors hover:text-primary">
                Size Guide
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="transition-colors hover:text-primary">
                Track Your Order
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">About</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="transition-colors hover:text-primary">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/collections" className="transition-colors hover:text-primary">
                Collections
              </Link>
            </li>
            <li>
              <Link to="/new-arrivals" className="transition-colors hover:text-primary">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-primary">
                Craftsmanship
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <p className="mx-auto max-w-7xl px-4 text-center text-[11px] tracking-[0.15em] text-muted-foreground sm:px-6 lg:px-10">
          © {new Date().getFullYear()} AUREL. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}

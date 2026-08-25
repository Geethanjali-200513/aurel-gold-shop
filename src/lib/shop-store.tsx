import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product, type Size } from "@/data/products";

export type CartItem = { id: string; size: Size; qty: number };

type ShopContext = {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (id: string, size: Size, qty?: number) => void;
  updateQty: (id: string, size: Size, qty: number) => void;
  removeFromCart: (id: string, size: Size) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  count: number;
  subtotal: number;
  detailed: { item: CartItem; product: Product }[];
};

const Ctx = createContext<ShopContext | null>(null);

const CART_KEY = "aurel.cart";
const WISH_KEY = "aurel.wishlist";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(read<CartItem[]>(CART_KEY, []));
    setWishlist(read<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const value = useMemo<ShopContext>(() => {
    const detailed = cart
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.id);
        return product ? { item, product } : null;
      })
      .filter((x): x is { item: CartItem; product: Product } => x !== null);

    return {
      cart,
      wishlist,
      cartOpen,
      setCartOpen,
      detailed,
      count: cart.reduce((n, i) => n + i.qty, 0),
      subtotal: detailed.reduce((n, d) => n + d.product.price * d.item.qty, 0),
      addToCart: (id, size, qty = 1) =>
        setCart((prev) => {
          const existing = prev.find((i) => i.id === id && i.size === size);
          if (existing) {
            return prev.map((i) =>
              i.id === id && i.size === size ? { ...i, qty: i.qty + qty } : i,
            );
          }
          return [...prev, { id, size, qty }];
        }),
      updateQty: (id, size, qty) =>
        setCart((prev) =>
          qty <= 0
            ? prev.filter((i) => !(i.id === id && i.size === size))
            : prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i)),
        ),
      removeFromCart: (id, size) =>
        setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size))),
      clearCart: () => setCart([]),
      toggleWishlist: (id) =>
        setWishlist((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        ),
      inWishlist: (id) => wishlist.includes(id),
    };
  }, [cart, wishlist, cartOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShop() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

import tshirt from "@/assets/p-tshirt.jpg";
import shirt from "@/assets/p-shirt.jpg";
import trousers from "@/assets/p-trousers.jpg";
import jeans from "@/assets/p-jeans.jpg";
import jacket from "@/assets/p-jacket.jpg";
import accessories from "@/assets/p-accessories.jpg";
import knit from "@/assets/p-knit.jpg";
import blazer from "@/assets/p-blazer.jpg";

export const CATEGORIES = [
  { slug: "t-shirts", name: "T-Shirts", image: tshirt },
  { slug: "shirts", name: "Shirts", image: shirt },
  { slug: "trousers", name: "Trousers", image: trousers },
  { slug: "jeans", name: "Jeans", image: jeans },
  { slug: "jackets", name: "Jackets", image: jacket },
  { slug: "accessories", name: "Accessories", image: accessories },
] as const;

export const SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

export type Product = {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  category: string;
  images: string[];
  sizes: Size[];
  isNew?: boolean;
  featured?: boolean;
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "onyx-essential-tee",
    name: "Onyx Essential Tee",
    price: 1499,
    compareAt: 1999,
    rating: 4.8,
    reviews: 214,
    category: "t-shirts",
    images: [tshirt, knit, blazer],
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    description:
      "Cut from long-staple combed cotton with a dense 220 GSM weight, the Onyx tee holds its shape wash after wash. A refined crew neck and clean side seams keep the silhouette sharp.",
  },
  {
    id: "ivory-linen-shirt",
    name: "Ivory Linen Shirt",
    price: 3299,
    rating: 4.7,
    reviews: 132,
    category: "shirts",
    images: [shirt, blazer, tshirt],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    description:
      "Breathable European linen with a soft garment wash. Mother-of-pearl buttons and a semi-cutaway collar make it as easy over denim as it is under tailoring.",
  },
  {
    id: "midnight-wool-trousers",
    name: "Midnight Wool Trousers",
    price: 4499,
    rating: 4.9,
    reviews: 88,
    category: "trousers",
    images: [trousers, blazer, jeans],
    sizes: ["M", "L", "XL", "XXL"],
    featured: true,
    description:
      "A tapered flat-front trouser in fine-gauge wool blend. Hidden hook closure, French bearer waistband and a clean break at the ankle.",
  },
  {
    id: "indigo-slim-denim",
    name: "Indigo Slim Denim",
    price: 3899,
    compareAt: 4599,
    rating: 4.6,
    reviews: 301,
    category: "jeans",
    images: [jeans, trousers, tshirt],
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    description:
      "Japanese-woven stretch denim in a deep unwashed indigo. Slim through the thigh with a straight leg opening for an easy, modern line.",
  },
  {
    id: "noir-leather-bomber",
    name: "Noir Leather Bomber",
    price: 12999,
    rating: 4.9,
    reviews: 64,
    category: "jackets",
    images: [jacket, blazer, tshirt],
    sizes: ["M", "L", "XL"],
    isNew: true,
    featured: true,
    description:
      "Full-grain lambskin with a ribbed collar and cuffs. Quilted viscose lining, two welt pockets and antique hardware that patinas beautifully.",
  },
  {
    id: "gold-hour-watch-set",
    name: "Gold Hour Accessory Set",
    price: 8499,
    rating: 4.8,
    reviews: 47,
    category: "accessories",
    images: [accessories, jacket, trousers],
    sizes: ["M"],
    isNew: true,
    featured: true,
    description:
      "A curated trio: gold-tone automatic watch, hand-finished leather belt and a slim bifold wallet. Presented in an AUREL keepsake box.",
  },
  {
    id: "sand-ribbed-knit",
    name: "Sand Ribbed Knit",
    price: 5299,
    rating: 4.7,
    reviews: 76,
    category: "t-shirts",
    images: [knit, tshirt, shirt],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    featured: true,
    description:
      "Chunky rib-knit in a merino and cashmere blend. Relaxed shoulders, ribbed hem and a weight that carries you from October through February.",
  },
  {
    id: "obsidian-tailored-blazer",
    name: "Obsidian Tailored Blazer",
    price: 14999,
    rating: 5,
    reviews: 39,
    category: "jackets",
    images: [blazer, jacket, shirt],
    sizes: ["M", "L", "XL", "XXL"],
    isNew: true,
    featured: true,
    description:
      "Half-canvassed construction in a matte wool twill. Notch lapel, two-button front and a suppressed waist that flatters without restricting.",
  },
  {
    id: "charcoal-pique-polo",
    name: "Charcoal Piqué Polo",
    price: 2199,
    rating: 4.5,
    reviews: 158,
    category: "t-shirts",
    images: [tshirt, knit, shirt],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Mercerised piqué cotton with a subtle sheen. Three-button placket and a self-fabric collar engineered to stay upright.",
  },
  {
    id: "monochrome-oxford-shirt",
    name: "Monochrome Oxford Shirt",
    price: 2899,
    rating: 4.6,
    reviews: 122,
    category: "shirts",
    images: [shirt, tshirt, blazer],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    description:
      "Classic oxford weave in a soft-hand finish. Button-down collar, single chest pocket and a trim but unrestrictive body.",
  },
  {
    id: "pleated-city-trouser",
    name: "Pleated City Trouser",
    price: 5199,
    rating: 4.4,
    reviews: 54,
    category: "trousers",
    images: [trousers, jeans, blazer],
    sizes: ["M", "L", "XL"],
    description:
      "A single-pleat trouser with a higher rise and gentle taper. Cut in a dry-finish wool that drapes with weight.",
  },
  {
    id: "raw-selvedge-jeans",
    name: "Raw Selvedge Jeans",
    price: 6499,
    rating: 4.8,
    reviews: 91,
    category: "jeans",
    images: [jeans, trousers, tshirt],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
    description:
      "14oz raw selvedge denim on vintage shuttle looms. Ages to a personal fade with copper rivets and a hidden-stitch waistband.",
  },
];

export const formatINR = (value: number) =>
  "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const flowerOfferings = [
  {
    id: "blush-market-wrap",
    name: "Blush Market Wrap",
    price: 72,
    description:
      "A smaller wrapped bouquet with fresh seasonal stems and a clean gift finish.",
    image:
      "https://images.unsplash.com/photo-1642919854744-451204041fe4?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "petite-bright-wrap",
    name: "Petite Bright Wrap",
    price: 86,
    description:
      "A cheerful wrapped bouquet with more color and a little extra volume.",
    image:
      "https://images.unsplash.com/photo-1767458557936-181932af5cf4?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "signature-garden",
    name: "Signature Garden",
    price: 124,
    description:
      "A medium bouquet with roses, tulips, and a polished wrapped presentation.",
    image:
      "https://images.unsplash.com/photo-1644248423441-bc7c5dcebeb6?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "soft-romance",
    name: "Soft Romance",
    price: 148,
    description:
      "A fuller romantic bouquet with blush tones, cream blooms, and greenery.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "seasonal-grace",
    name: "Seasonal Grace",
    price: 162,
    description:
      "A layered seasonal bouquet with premium texture, movement, and depth.",
    image:
      "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "celebration-luxe",
    name: "Celebration Luxe",
    price: 198,
    description:
      "A larger, more intricate bouquet with premium blooms, berries, and greenery.",
    image:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=900&q=85",
  },
];

export type FlowerOffering = (typeof flowerOfferings)[number];

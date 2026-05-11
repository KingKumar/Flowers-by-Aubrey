export type FlowerMedia =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string; alt?: string };

export type FlowerOffering = {
  id: string;
  name: string;
  description: string;
  image: string;
  cardColor: string;
  backdropImage?: string;
  media?: FlowerMedia[];
};

export const flowerOfferings: FlowerOffering[] = [
  {
    id: "grandmas-orchid-garden",
    name: "Grandma's Orchid Garden",
    description:
      "Pink cymbidium orchids, purple tulips, lavender allium, pink hydrangea, hot pink spider gerbera daisies, peach lisianthus, white scabiosa, creamy astilbe, and trailing amaranthus.",
    image: "/images/grandmas-orchid-garden.jpg",
    cardColor: "#ed2b82",
    media: [
      {
        type: "image",
        src: "/images/grandmas-orchid-garden.jpg",
        alt: "Grandma's Orchid Garden",
      },
      {
        type: "video",
        src: "/images/grandmas-orchid-garden-video-silent.mp4",
        alt: "Grandma's Orchid Garden video",
      },
    ],
  },
  {
    id: "pink-orchid-peony-garden",
    name: "Pink Orchid Peony Garden",
    description:
      "White cymbidium orchids, hot pink Japanese peonies, blush lisianthus, green hydrangea, white scabiosa, airy astilbe, and trailing amaranthus.",
    image: "/images/pink-orchid-dahlia-garden-cover.jpg",
    cardColor: "#ed2b82",
    media: [
      {
        type: "image",
        src: "/images/pink-orchid-dahlia-garden-cover.jpg",
        alt: "Pink Orchid Peony Garden",
      },
      {
        type: "image",
        src: "/images/pink-lily-yellow-rose-bouquet-1.jpg",
        alt: "Pink Orchid Peony Garden detail",
      },
      {
        type: "video",
        src: "/images/pink-orchid-dahlia-garden-video-1-silent.mp4",
        alt: "Pink Orchid Peony Garden video",
      },
      {
        type: "video",
        src: "/images/pink-orchid-dahlia-garden-video-2-silent.mp4",
        alt: "Pink Orchid Peony Garden closeup video",
      },
    ],
  },
  {
    id: "fringed-tulip-gerbera-garden",
    name: "Fringed Tulip Gerbera Garden",
    description:
      "Purple fringed tulips, hot pink spider gerbera daisies, pink hydrangea, Queen Anne's lace, green amaranthus, and fresh green texture.",
    image: "/images/fringed-tulip-gerbera-garden.jpg",
    cardColor: "#c7da38",
  },
  {
    id: "apricot-rose-amaranth-bouquet",
    name: "Apricot Rose Amaranth Bouquet",
    description:
      "Apricot roses, white hydrangea, magenta spray roses, trailing amaranthus, and variegated greenery.",
    image: "/images/apricot-rose-amaranth-bouquet.png",
    cardColor: "#f26a21",
  },
  {
    id: "green-amaranth-lily-garden",
    name: "Mimi's Enchanted Lily Garden",
    description:
      "Green hydrangea, lily buds, purple garden blooms, hanging amaranthus, curly willow, and variegated foliage.",
    image: "/images/green-amaranth-lily-garden.png",
    cardColor: "#344f20",
    media: [
      {
        type: "image",
        src: "/images/green-amaranth-lily-garden.png",
        alt: "Mimi's Enchanted Lily Garden",
      },
      {
        type: "image",
        src: "/images/green-amaranth-lily-garden-detail-crop.jpg",
        alt: "Mimi's Enchanted Lily Garden detail",
      },
    ],
  },
  {
    id: "orange-rose-hydrangea-bouquet",
    name: "Orange Rose Hydrangea Bouquet",
    description:
      "Orange roses, white hydrangea, ornithogalum, bupleurum, and green textural stems.",
    image: "/images/sage-ribbon-vase.png",
    cardColor: "#c7da38",
  },
  {
    id: "pink-lily-agrostemma-garden",
    name: "Pink Lily Agrostemma Garden",
    description:
      "Pink lilies, white lisianthus, green hydrangea, purple agrostemma, scabiosa pods, lily buds, and fresh green stems.",
    image: "/images/pink-lily-agrostemma-garden.jpg",
    cardColor: "#c7da38",
  },
  {
    id: "pink-tulip-yellow-rose-bouquet",
    name: "Pink Tulip Yellow Rose Bouquet",
    description:
      "Pink tulips, yellow roses, purple mums, soft pink sedum, and glossy green foliage.",
    image: "/images/pink-tulip-yellow-rose-bouquet.png",
    cardColor: "#ed2b82",
  },
  {
    id: "blush-lily-lisianthus-garden",
    name: "Blush Lily Lisianthus Garden",
    description:
      "Pink lilies, white lisianthus, peach roses, green hydrangea, creamy astilbe, lily buds, and soft garden greenery.",
    image: "/images/pink-lily-lisianthus-garden.jpg",
    cardColor: "#ed2b82",
  },
  {
    id: "pink-star-lily-bouquet",
    name: "Pink Rose Lily Bouquet",
    description:
      "Pink rose lilies, magenta button mums, white lily buds, and leafy green stems.",
    image: "/images/IMG_8177.JPG",
    cardColor: "#ed2b82",
  },
  {
    id: "autumn-safflower-garden",
    name: "Autumn Safflower Garden",
    description:
      "Orange safflower, rust mums, eucalyptus, seeded greenery, and a small accent posy.",
    image: "/images/IMG_8877.JPG",
    cardColor: "#c7da38",
  },
  {
    id: "autumn-mum-centerpiece",
    name: "Autumn Mum Centerpiece",
    description:
      "Bronze football mums, green button mums, yellow button mums, and warm fall texture.",
    image: "/images/IMG_8825.JPG",
    cardColor: "#c7da38",
  },
  {
    id: "pink-gladiolus-garden",
    name: "Pink Gladiolus Garden",
    description:
      "Pink gladiolus, peach roses, yellow ranunculus, green hydrangea, and eucalyptus.",
    image: "/images/IMG_8581.JPG",
    cardColor: "#f26a21",
  },
  {
    id: "orange-lily-amaranth-bouquet",
    name: "Orange Lily Amaranth Bouquet",
    description:
      "Orange lilies, burgundy hanging amaranthus, strawflowers, and bronzy foliage.",
    image: "/images/IMG_8278.JPG",
    cardColor: "#ed2b82",
  },
  {
    id: "purple-mum-hydrangea-dome",
    name: "Purple Mum Hydrangea Dome",
    description:
      "Purple cushion mums, lavender mums, green hydrangea, and a clean rounded shape.",
    image: "/images/IMG_7949.JPG",
    cardColor: "#ed2b82",
  },
  {
    id: "candlelight-rose-centerpiece",
    name: "Candlelight Rose Centerpiece",
    description:
      "Peach roses, burgundy mums, gerbera daisies, statice, and moody seasonal foliage.",
    image: "/images/IMG_6258.JPG",
    cardColor: "#f26a21",
  },
  {
    id: "raspberry-rose-garden",
    name: "Raspberry Rose Garden",
    description:
      "Red roses, red gerbera daisies, magenta mums, waxflower, and rosemary stems.",
    image: "/images/IMG_5946.JPG",
    cardColor: "#ed2b82",
  },
  {
    id: "burgundy-dahlia-mum-mix",
    name: "Burgundy Dahlia Mum Mix",
    description:
      "Burgundy dahlias, magenta mums, green hydrangea, and fresh rose buds.",
    image: "/images/IMG_5485.JPG",
    cardColor: "#c7da38",
  },
  {
    id: "pink-rose-hydrangea-dome",
    name: "Pink Rose Hydrangea Dome",
    description:
      "Pink roses, green hydrangea, and a rounded garden silhouette.",
    image: "/images/IMG_5415.JPG",
    cardColor: "#ed2b82",
  },
  {
    id: "magenta-lily-bouquet",
    name: "Magenta Lily Bouquet",
    description:
      "Pink lilies, magenta stock, purple button mums, and deep burgundy mums.",
    image: "/images/IMG_3376.JPG",
    cardColor: "#ed2b82",
  },
  {
    id: "marigold-mum-bouquet",
    name: "Marigold Mum Bouquet",
    description:
      "Yellow mums, yellow button mums, green hypericum berries, and airy bupleurum.",
    image: "/images/IMG_3200.JPG",
    cardColor: "#c7da38",
  },
  {
    id: "ruby-lily-bouquet",
    name: "Ruby Lily Bouquet",
    description:
      "Stargazer lilies, orange roses, red roses, lily buds, and airy dried texture.",
    image: "/images/IMG_2745.JPG",
    cardColor: "#f26a21",
  },
  {
    id: "blush-tulip-garden",
    name: "Blush Tulip Garden",
    description:
      "Pink carnations, white tulips, green button mums, and sculptural curly willow.",
    image: "/images/IMG_2413.JPG",
    cardColor: "#c7da38",
  },
  {
    id: "tangerine-gerbera-bouquet",
    name: "Tangerine Gerbera Bouquet",
    description:
      "Orange gerbera daisies with pink berries, purple veronica, and leafy greens.",
    image: "/images/IMG_2338.JPG",
    cardColor: "#ed2b82",
  },
];

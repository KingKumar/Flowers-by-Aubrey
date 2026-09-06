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
    id: "orange-rose-hydrangea-bouquet",
    name: "Orange Rose",
    description:
      "Orange roses, white hydrangea, ornithogalum, bupleurum, and green textural stems.",
    image: "/images/IMG_7786.jpg",
    cardColor: "#c7da38",
    media: [
      {
        type: "image",
        src: "/images/IMG_7786.jpg",
        alt: "Orange Rose arrangement in a white ceramic vase",
      },
      {
        type: "image",
        src: "/images/IMG_7796.jpg",
        alt: "Orange Rose arrangement alternate view",
      },
      {
        type: "video",
        src: "/images/IMG_7766.mp4",
        poster: "/images/IMG_7786.jpg",
        alt: "Orange Rose arrangement video",
      },
      {
        type: "image",
        src: "/images/sage-ribbon-vase.png",
        alt: "Orange Rose arrangement previous photo",
      },
    ],
  },
  {
    id: "raspberry-rose-garden",
    name: "Raspberry Rose Garden",
    description:
      "Red roses, red gerbera daisies, magenta mums, purple dahlias, waxflower, and rosemary stems.",
    image: "/images/IMG_7454.jpg",
    cardColor: "#ed2b82",
  },
  {
    id: "lunar-velvet",
    name: "Lunar Velvet",
    description:
      "Lavender spider mums, green hydrangea, deep purple lisianthus, scabiosa, burgundy dahlias, campanula, delphinium, and airy seasonal stems.",
    image: "/images/IMG_0555.JPG",
    cardColor: "#344f20",
    media: [
      {
        type: "image",
        src: "/images/IMG_0555.JPG",
        alt: "Lunar Velvet",
      },
      {
        type: "video",
        src: "/images/IMG_0561.MP4",
        poster: "/images/IMG_0555.JPG",
        alt: "Lunar Velvet video",
      },
      {
        type: "image",
        src: "/images/IMG_0564.JPG",
        alt: "Lunar Velvet detail",
      },
    ],
  },
  {
    id: "the-crimson-car",
    name: "The Crimson Car",
    description:
      "Red and gold anthuriums, dark red roses, red dahlias, pink hydrangea, orange and red gerbera daisies, and burgundy amaranthus.",
    image: "/images/redcar 1.jpg",
    cardColor: "#f24b12",
    media: [
      {
        type: "image",
        src: "/images/redcar 1.jpg",
        alt: "The Crimson Car",
      },
      {
        type: "image",
        src: "/images/redcar 2.jpg",
        alt: "The Crimson Car detail",
      },
      {
        type: "video",
        src: "/images/redcar video.mp4",
        poster: "/images/redcar 1.jpg",
        alt: "The Crimson Car video",
      },
    ],
  },
  {
    id: "gallery-after-dark",
    name: "Gallery After Dark",
    description:
      "Campanula, deep purple lisianthus, burgundy and purple scabiosa, delphinium, green hydrangea, burgundy amaranthus, and airy seasonal stems.",
    image: "/images/purple and red 1.jpg",
    cardColor: "#344f20",
    media: [
      {
        type: "image",
        src: "/images/purple and red 1.jpg",
        alt: "Gallery After Dark",
      },
      {
        type: "image",
        src: "/images/purple and red 2.jpg",
        alt: "Gallery After Dark detail",
      },
    ],
  },
  {
    id: "the-blushing-wave",
    name: "The Blushing Wave",
    description:
      "Premium roses, dahlias, green hydrangea, light pink lisianthus, sweet peas, and seasonal foliage.",
    image: "/images/lisa 1 .jpg",
    cardColor: "#ed2b82",
  },
  {
    id: "cupids-arrow",
    name: "Cupid's Arrow",
    description:
      "Purple calla lilies, roses, pink hydrangea, burgundy chrysanthemums, astrantia, and hellebores.",
    image: "/images/deannas 1.jpg",
    cardColor: "#ed2b82",
    media: [
      {
        type: "image",
        src: "/images/deannas 1.jpg",
        alt: "Cupid's Arrow",
      },
      {
        type: "image",
        src: "/images/deannas 2.jpg",
        alt: "Cupid's Arrow detail",
      },
      {
        type: "image",
        src: "/images/deannas 3.jpg",
        alt: "Cupid's Arrow alternate view",
      },
    ],
  },
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
        type: "image",
        src: "/images/aubrey-grandmas-orchid-garden-scale.jpg",
        alt: "Aubrey holding Grandma's Orchid Garden for scale",
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
    name: "Blush Ascension",
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
    name: "Aubrey jar of love",
    description:
      "Purple fringed tulips, hot pink spider gerbera daisies, pink hydrangea, Queen Anne's lace, green amaranthus, and fresh green texture.",
    image: "/images/fringed-tulip-gerbera-garden.jpg",
    cardColor: "#c7da38",
  },
  {
    id: "apricot-rose-amaranth-bouquet",
    name: "Apricot Rose",
    description:
      "Apricot roses, white hydrangea, magenta spray roses, trailing amaranthus, and variegated greenery.",
    image: "/images/apricot-rose-amaranth-bouquet.png",
    cardColor: "#f26a21",
  },
  {
    id: "green-amaranth-lily-garden",
    name: "Mimi's Enchanted Lilys",
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
    id: "pink-tulip-yellow-rose-bouquet",
    name: "Tropical Punch",
    description:
      "Pink tulips, yellow roses, purple mums, soft pink sedum, and glossy green foliage.",
    image: "/images/pink-tulip-yellow-rose-bouquet.png",
    cardColor: "#ed2b82",
  },
  {
    id: "blush-lily-lisianthus-garden",
    name: "Lily & Lace",
    description:
      "Pink and white lilies, peach lisianthus, green hydrangea, creamy astilbe, and soft garden greenery.",
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
    id: "autumn-mum-centerpiece",
    name: "Autumn mosses",
    description:
      "Bronze football mums, green button mums, yellow button mums, and warm fall texture.",
    image: "/images/IMG_8825.JPG",
    cardColor: "#c7da38",
  },
  {
    id: "pink-gladiolus-garden",
    name: "ArtWalk in Bloom",
    description:
      "Pink gladiolus, peach roses, yellow ranunculus, green hydrangea, and eucalyptus.",
    image: "/images/IMG_8581.JPG",
    cardColor: "#f26a21",
  },
  {
    id: "orange-lily-amaranth-bouquet",
    name: "Vibrant Sunday Morning",
    description:
      "Orange lilies, burgundy hanging amaranthus, and strawflowers.",
    image: "/images/IMG_8278.JPG",
    cardColor: "#ed2b82",
  },
  {
    id: "candlelight-rose-centerpiece",
    name: "Evening at the Opera",
    description:
      "Peach roses, burgundy mums, gerbera daisies, statice, and moody seasonal foliage.",
    image: "/images/IMG_6258.JPG",
    cardColor: "#f26a21",
  },
  {
    id: "burgundy-dahlia-mum-mix",
    name: "Lettuce give you some Dahlias",
    description:
      "Burgundy and magenta dahlias, green hydrangea, lettuce stem, and green foliage.",
    image: "/images/IMG_5485.JPG",
    cardColor: "#c7da38",
  },
  {
    id: "pink-rose-hydrangea-dome",
    name: "PINK bubble of Love",
    description:
      "Pink roses, green hydrangea, and a rounded garden silhouette.",
    image: "/images/IMG_5415.JPG",
    cardColor: "#ed2b82",
  },
  {
    id: "marigold-mum-bouquet",
    name: "Pot of Gold",
    description:
      "Yellow mums, yellow button mums, green hypericum berries, and airy bupleurum.",
    image: "/images/IMG_3200.JPG",
    cardColor: "#c7da38",
  },
  {
    id: "ruby-lily-bouquet",
    name: "Stargazer",
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
];

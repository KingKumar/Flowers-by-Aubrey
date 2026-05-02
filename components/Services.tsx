import { SectionHeader } from "./SectionHeader";

const services = [
  {
    title: "Custom Bouquets",
    description:
      "Hand-selected blooms arranged around your palette, occasion, and the feeling you want to send.",
  },
  {
    title: "Events & Celebrations",
    description:
      "Romantic floral moments for showers, dinners, birthdays, intimate weddings, and special gatherings.",
  },
  {
    title: "Seasonal Arrangements",
    description:
      "Fresh, graceful designs guided by the season's prettiest textures, stems, and color stories.",
  },
  {
    title: "Local Delivery or Pickup",
    description:
      "Simple ordering for thoughtful gifts, table flowers, and just-because arrangements close to home.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="border-y border-[#eadfcf] bg-[#fffdf8] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Offerings"
          title="Floral design for soft, memorable occasions"
          description="Every arrangement is composed with a gentle eye for color, texture, and natural movement."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-3xl border border-[#eadbc6] bg-[#fffaf0] p-6 shadow-[0_18px_45px_rgba(65,57,46,0.07)]"
            >
              <div className="mb-6 h-1.5 w-16 rounded-full bg-[#f3d8d8]" />
              <h3 className="font-serif text-2xl font-medium tracking-normal text-[#312d28]">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#70665b]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

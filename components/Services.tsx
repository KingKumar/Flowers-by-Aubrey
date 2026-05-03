import { SectionHeader } from "./SectionHeader";

const services = [
  {
    title: "Custom Bouquets",
    description:
      "Fresh, expressive arrangements built around your palette, occasion, and personal style.",
  },
  {
    title: "Events & Celebrations",
    description:
      "Modern floral moments for showers, dinners, birthdays, intimate weddings, and brand gatherings.",
  },
  {
    title: "Seasonal Arrangements",
    description:
      "Statement-making stems guided by the season's strongest textures, shapes, and color stories.",
  },
  {
    title: "Local Delivery or Pickup",
    description:
      "Streamlined ordering for thoughtful gifts, table flowers, and custom pieces close to home.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="paper-grain border-y-2 border-[#1b120c] bg-[#fff2df] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Offerings"
          title="Florals with shape, color, and point of view"
          description="Every arrangement is composed with a confident eye for palette, negative space, texture, and scale."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="border-2 border-[#1b120c] bg-[#fff2df] p-6 shadow-[6px_6px_0_#f26a21]"
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center border-2 border-[#1b120c] bg-[#ed2b82] text-sm font-black text-[#fff2df]">
                0{index + 1}
              </div>
              <h3 className="font-mono text-2xl font-black uppercase leading-none tracking-normal text-[#1b120c]">
                {service.title}
              </h3>
              <p className="mt-4 font-mono text-sm font-bold leading-7 text-[#344f20]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

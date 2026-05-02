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
      className="border-y-2 border-[#171512] bg-[#fffaf0] px-5 py-20 sm:px-8 lg:px-12"
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
              className="rounded-[1.25rem] border-2 border-[#171512] bg-[#fffdf8] p-6 shadow-[8px_8px_0_#171512]"
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#f2d7dd] text-sm font-black text-[#171512]">
                0{index + 1}
              </div>
              <h3 className="text-2xl font-black uppercase leading-none tracking-normal text-[#171512]">
                {service.title}
              </h3>
              <p className="mt-4 text-sm font-medium leading-7 text-[#5d574f]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

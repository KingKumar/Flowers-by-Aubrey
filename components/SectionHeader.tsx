type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`mx-auto max-w-3xl ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#8b7657]">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-3xl font-medium tracking-normal text-[#2c2824] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-[#6f665d] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

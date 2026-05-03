type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
}: SectionHeaderProps) {
  const isLight = tone === "light";

  return (
    <div
      className={`mx-auto max-w-4xl ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <p
        className={`font-mono text-xs font-black uppercase tracking-[0.18em] ${
          isLight ? "text-[#c7da38]" : "text-[#344f20]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-5xl font-black uppercase leading-[0.9] tracking-normal sm:text-6xl lg:text-7xl ${
          isLight ? "text-[#fff2df]" : "text-[#1b120c]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-8 sm:text-lg ${
            isLight ? "text-[#fff2df]" : "text-[#344f20]"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

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
        className={`text-xs font-black uppercase tracking-[0.32em] ${
          isLight ? "text-[#f3d8d8]" : "text-[#5f6f44]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-4xl font-black uppercase leading-[0.95] tracking-normal sm:text-5xl lg:text-6xl ${
          isLight ? "text-[#fffaf0]" : "text-[#171512]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-8 sm:text-lg ${
            isLight ? "text-[#e6dccc]" : "text-[#625d55]"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

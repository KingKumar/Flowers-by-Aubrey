import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { CondensedLookbook } from "@/components/CondensedLookbook";
import { Hero } from "@/components/Hero";
import { Inquiry } from "@/components/Inquiry";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#fff2df] text-[#1b120c]">
      <Hero />
      <About />
      <Inquiry />
      <CondensedLookbook />
      <Footer />
    </main>
  );
}

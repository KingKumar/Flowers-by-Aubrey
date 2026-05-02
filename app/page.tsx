import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Inquiry } from "@/components/Inquiry";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#2c2824]">
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Inquiry />
      <Footer />
    </main>
  );
}

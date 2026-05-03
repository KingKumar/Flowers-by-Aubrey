import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Inquiry } from "@/components/Inquiry";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#fff2df] text-[#1b120c]">
      <Hero />
      <Gallery />
      <Services />
      <About />
      <Inquiry />
      <Footer />
    </main>
  );
}

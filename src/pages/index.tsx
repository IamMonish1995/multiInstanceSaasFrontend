import { About } from "#srccomponents/About.tsx";
import { Cta } from "#srccomponents/Cta.tsx";
import { FAQ } from "#srccomponents/FAQ.tsx";
import { Features } from "#srccomponents/Features.tsx";
import { Footer } from "#srccomponents/Footer.tsx";
import { Hero } from "#srccomponents/Hero.tsx";
import { HowItWorks } from "#srccomponents/HowItWorks.tsx";
import { Navbar } from "#srccomponents/Navbar.tsx";
import { Newsletter } from "#srccomponents/Newsletter.tsx";
import { Pricing } from "#srccomponents/Pricing.tsx";
import { ScrollToTop } from "#srccomponents/ScrollToTop.tsx";
import { Services } from "#srccomponents/Services.tsx";
import { Sponsors } from "#srccomponents/Sponsors.tsx";
import { Team } from "#srccomponents/Team.tsx";
import { Testimonials } from "#srccomponents/Testimonials.tsx";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

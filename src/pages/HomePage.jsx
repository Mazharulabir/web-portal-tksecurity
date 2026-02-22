import Hero from '../components/Hero'
import ServiceCarousel from '../components/ServiceCarousel'
import Sectors from '../components/Sectors'
import ClientMarquee from '../components/ClientMarquee'
import Testimonials from '../components/Testimonials'
import WhyChooseUsHome from '../components/WhyChooseUsHome'
import DedicatedSection from '../components/DedicatedSection'
import Gallery from '../components/Gallery'
import CTA from '../components/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCarousel />
      <Sectors />
      <ClientMarquee />
      <Testimonials />
      <WhyChooseUsHome />
      <DedicatedSection />
      <Gallery />
      <CTA />
    </>
  )
}

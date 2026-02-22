import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import Sectors from '../components/Sectors'

export default function ServicesPage() {
  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="pt-24" />
      <Services />
      <WhyChooseUs />
      <Sectors />
    </>
  )
}

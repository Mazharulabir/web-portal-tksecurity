import About from '../components/About'
import WhyChooseUs from '../components/WhyChooseUs'

export default function AboutPage() {
  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="pt-24" />
      <About />
      <WhyChooseUs />
    </>
  )
}

import AboutUsSection from "./aboutUsSection";
import GallerySection from "./gallerySection";
import GetQuoteSection from "./getQuoteSection";
import LandingSection from "./landingSection";
import Testimonials from "./testimonials";
import styles from "../../styles/home/main/main.module.css";

function Main() {
  return (
    <div className={["text-end", styles['main-container']].join(' ')}>
      <LandingSection />
      {/* <GallerySection />
      <Testimonials />
      <GetQuoteSection /> */}
      <AboutUsSection />
    </div>
  )
}

export default Main;
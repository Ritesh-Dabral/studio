import LandingSection from "./landingSection";
import styles from "../../styles/home/main/main.module.css";

function Main() {
  return (
    <div className={["text-end", styles['main-container']].join(' ')}>
      <LandingSection />
    </div>
  )
}

export default Main;
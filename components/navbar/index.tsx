import NavbarIcon from "./navbar-icon"

import {
  RiHome5Line,
  RiCalendar2Line,
  RiLineChartLine,
  RiUser2Line,
} from "react-icons/ri"
import styles from "./styles.module.css"
import { displayMobileView } from "utils/screen"

const Navbar: React.FunctionComponent = () => {
  const isMobileView = displayMobileView()

  if (isMobileView) {
    return <div className={styles.mobileContainer}>TODO - Mobile Navbar</div>
  } else {
    return (
      <div className={styles.container}>
        <NavbarIcon link="/home" icon={<RiHome5Line />} />
        <NavbarIcon link="/calendar" icon={<RiCalendar2Line />} />
        <NavbarIcon link="/analytics" icon={<RiLineChartLine />} />
        <NavbarIcon link="/profile" icon={<RiUser2Line />} />
      </div>
    )
  }
}

export default Navbar

import NavbarIcon from "./navbar-icon";

import { RiHome5Line, RiCalendar2Line } from "react-icons/ri";
import styles from "./styles.module.css";
import { displayMobileView } from "utils/screen";
import MobileNavbarIcon from "./mobile-navbar-icon";

const Navbar: React.FunctionComponent = () => {
  const isMobileView = displayMobileView();

  const routes = {
    "/home": <RiHome5Line />,
    "/calendar": <RiCalendar2Line />,
    // "/analytics": <RiLineChartLine />,
    // "/profile": <RiUser2Line />,
  };

  if (isMobileView) {
    return (
      <div className={styles.mobileContainer}>
        {Object.keys(routes).map((route) => {
          return (
            <MobileNavbarIcon link={route} icon={routes[route]} key={route} />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        {Object.keys(routes).map((route) => {
          return <NavbarIcon link={route} icon={routes[route]} key={route} />;
        })}
      </div>
    );
  }
};

export default Navbar;

import { useSession } from "next-auth/client";
import ScreenLoader from "components/screen-loader";
import Navbar from "components/navbar";

import styles from "./styles.module.css";
import classnames from "classnames";

interface PrivateLayoutProps {
  children: React.ReactNode;
  backgroundStyle?: any;
}

const PrivateLayout = ({
  children,
  backgroundStyle,
}: PrivateLayoutProps): JSX.Element => {
  const [session, loading] = useSession();

  if (loading) {
    return <ScreenLoader />;
  } else if (!session) {
    window.location.href = "/login";
  } else {
    return (
      <div className="d-flex">
        <Navbar />
        <div
          className={classnames(
            "p-3",
            "pb-5",
            styles.childrenLayout,
            backgroundStyle
          )}
        >
          {children}
        </div>
      </div>
    );
  }
};

export default PrivateLayout;

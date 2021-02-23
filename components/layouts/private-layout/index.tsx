import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import ScreenLoader from "components/screen-loader";
import Navbar from "components/navbar";

import styles from "./styles.module.css";
import classnames from "classnames";

const PrivateLayout: React.FunctionComponent = ({ children }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) {
    return <ScreenLoader />;
  } else if (!session) {
    router.push("/api/auth/signin");
  } else {
    return (
      <div className="d-flex">
        <Navbar />
        <div className={classnames("p-3", "pb-5", styles.childrenLayout)}>
          {children}
        </div>
      </div>
    );
  }
};

export default PrivateLayout;

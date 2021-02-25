import Head from "next/head";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import styles from "../../../styles/Home.module.css";

const AuthLayout: React.FunctionComponent = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>TipTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Row>
        <Col xs={12} md={5}>
          <Image
            src="/images/tip-tracker-logo.png"
            alt="Logo of TipTracker Application"
            width={400}
            height={400}
          />
        </Col>
        <Col xs={12} md={7}>
          {children}
        </Col>
      </Row>

      {/* <footer className={styles.footer}>

      </footer> */}
    </div>
  );
};

export default AuthLayout;

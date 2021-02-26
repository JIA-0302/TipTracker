import React from "react";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import styles from "styles/Home.module.css";

const AuthLayout: React.FunctionComponent = ({ children }) => {
  return (
    <div className={styles.container}>
      <Row>
        <Col
          xs={12}
          md={5}
          className="d-flex align-items-center justify-content-center"
        >
          <Image
            src="/images/tip-tracker-logo.png"
            alt="Logo of TipTracker Application"
            width={400}
            height={400}
          />
        </Col>
        <Col
          xs={12}
          md={7}
          className="d-flex align-items-center justify-content-center"
        >
          <main className={styles.main}>{children}</main>
        </Col>
      </Row>
    </div>
  );
};

export default AuthLayout;

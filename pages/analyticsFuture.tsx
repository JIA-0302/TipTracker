import PrivateLayout from "../components/layouts/private-layout";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/analytics.module.css";
import stylesBackground from "styles/Home.module.css";
import React from "react";
import { Button } from "react-bootstrap";
import Calendar from "components/analytics/calendar";

const analytics: React.FunctionComponent = () => {
  return (
    <PrivateLayout backgroundStyle={stylesBackground.dashboard}>
      <h1 className={styles.summaryHeader}>Future Trends</h1>
      <Button
        className={styles.backButton}
        variant="warning"
        href="/analytics"
        size="sm"
      >
        Back
      </Button>
      <div className={styles.trendsDiv}>
        <div className="align-self-end">
          <h2 className={styles.trends}>Forecast Template</h2>
          <h3 className={styles.h3}>
            Shift Time
            <br />
            <span style={{ color: "red" }}>Hourly Wages</span>
            <br />
            <span style={{ color: "blue" }}>Tips</span>
          </h3>
        </div>

        <Calendar />
      </div>
    </PrivateLayout>
  );
};

export default analytics;

import PrivateLayout from "../components/layouts/private-layout";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/analytics.module.css";
import DSelector from "components/analytics/dateSelector";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import stylesBackground from "styles/Home.module.css";

const analytics: React.FunctionComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  return (
    <PrivateLayout backgroundStyle={stylesBackground.dashboard}>
      <h1 className={styles.summaryHeader}>Analytics</h1>
      <DSelector
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <div className={styles.gridDatesContainer2}>
        <Button
          className={styles.seePastTrendsButton}
          variant="warning"
          type="submit"
        >
          Past Trends
        </Button>
        <Button
          className={styles.seeFutureTrendsButton}
          variant="warning"
          type="submit"
        >
          Future Trends
        </Button>
      </div>
    </PrivateLayout>
  );
};

export default analytics;

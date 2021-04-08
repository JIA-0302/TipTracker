import React from "react";
import { Button } from "react-bootstrap";

import {
  ShiftTrendsProvider,
  trendsTemplate,
} from "src/providers/ShiftTrendsContext";
import WeekCalendar from "components/analytics/calendar";
import PrivateLayout from "../components/layouts/private-layout";

import styles from "../styles/analytics.module.css";
import stylesBackground from "styles/Home.module.css";
import Trends from "components/analytics/trends-container";
import { getPastTrends } from "src/actions/trends";
import { useRouter } from "next/router";

const PastAnalytics: React.FunctionComponent = () => {
  const router = useRouter();

  let startDate = new Date();
  if (router.query?.date) {
    const { date } = router.query;
    if (typeof date === "string") {
      startDate = new Date(date);
    } else {
      startDate = new Date(date[0]);
    }
  }

  return (
    <PrivateLayout backgroundStyle={stylesBackground.dashboard}>
      <Button
        className={styles.backButton}
        variant="warning"
        href="/analytics"
        size="sm"
      >
        Back
      </Button>

      <ShiftTrendsProvider>
        <div className="d-flex align-items-end">
          <Trends data={trendsTemplate} />
          <WeekCalendar
            title="Past Trends"
            retrieveData={getPastTrends}
            startDate={startDate}
          />
        </div>
      </ShiftTrendsProvider>
    </PrivateLayout>
  );
};

export default PastAnalytics;

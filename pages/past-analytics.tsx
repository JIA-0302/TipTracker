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

const PastAnalytics: React.FunctionComponent = () => {
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
          <WeekCalendar title="Past Trends" retrieveData={getPastTrends} />
        </div>
      </ShiftTrendsProvider>
    </PrivateLayout>
  );
};

export default PastAnalytics;

import React from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

import { ShiftTrendsProvider } from "src/providers/ShiftTrendsContext";
import { getPastTrends } from "src/actions/trends";
import WeekCalendar from "components/analytics/calendar";
import PrivateLayout from "components/layouts/private-layout";
import WagesTipsVisualizer from "components/analytics/trends-visualization/wagesTipsVisualizer";

import styles from "styles/analytics.module.css";
import stylesBackground from "styles/Home.module.css";

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

      <ShiftTrendsProvider defaultCurrentDate={startDate}>
        <div className="d-flex align-items-end">
          <WeekCalendar title="Past Trends" retrieveData={getPastTrends} />
        </div>
        <WagesTipsVisualizer />
      </ShiftTrendsProvider>
    </PrivateLayout>
  );
};

export default PastAnalytics;

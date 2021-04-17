import React from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

import { ShiftTrendsProvider } from "src/providers/ShiftTrendsContext";
import { getFutureTrends } from "src/actions/trends";
import PrivateLayout from "components/layouts/private-layout";
import WeekCalendar from "components/analytics/calendar";
import WagesTipsVisualizer from "components/analytics/trends-visualization/wagesTipsVisualizer";

import stylesBackground from "styles/Home.module.css";
import styles from "styles/analytics.module.css";
import { getDateFromRequestQuery } from "utils/date-utils";

const FutureAnalytics: React.FunctionComponent = () => {
  const router = useRouter();
  const startDate = getDateFromRequestQuery(router.query);

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
          <WeekCalendar title="Future Trends" retrieveData={getFutureTrends} />
        </div>
        <WagesTipsVisualizer />
      </ShiftTrendsProvider>
    </PrivateLayout>
  );
};

export default FutureAnalytics;

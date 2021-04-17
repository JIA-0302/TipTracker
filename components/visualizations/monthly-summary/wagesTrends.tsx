import { ResponsiveLine } from "@nivo/line";
import React, { useEffect, useState } from "react";
import { getEarningsTrendsData } from "src/actions/visualizations";
import Loader from "../loader";

import styles from "./styles.module.css";

const WagesTrends = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [earningsData, setEarningsData] = useState([]);

  const days = 15;

  useEffect(() => {
    setLoading(true);
    getEarningsTrendsData(days)
      .then((data) => {
        setEarningsData(data);
      })
      .catch(() => {
        setEarningsData([]);
        window.alert(
          "We could not retrieve the earnings trends data. Please try again later"
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ height: 400, width: "100%" }} className="text-center">
          <h5>Earnings Trends for</h5>
          <h3>past {days} days</h3>
          <ResponsiveLine
            data={earningsData}
            margin={{ top: 50, right: 15, bottom: 75, left: 50 }}
            xScale={{ type: "point" }}
            colors={{ scheme: "category10" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="linear"
            lineWidth={1}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Dates",
              legendOffset: 36,
              legendPosition: "middle",
              format: (value) => {
                return Number(value) % 2 === 0 ? (value as string) : "";
              },
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Earnings",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            pointSize={2}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 75,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 105,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 18,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default WagesTrends;

import { ResponsivePie } from "@nivo/pie";
import React, { useEffect, useState } from "react";
import { getEarningsDistributionData } from "src/actions/visualizations";
import Loader from "../loader";

import styles from "./styles.module.css";

const WagesDistribution = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [earningsData, setEarningsData] = useState([]);

  const days = 30;

  useEffect(() => {
    setLoading(true);
    getEarningsDistributionData(30)
      .then((data) => setEarningsData(data))
      .catch(() => {
        setEarningsData([]);
        window.alert(
          "We could not retrieve the earnings distribution data. Please try again later"
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
          <h5>Earnings Distribution for</h5>
          <h3>past {days} days</h3>
          <ResponsivePie
            data={earningsData}
            valueFormat={(v) => `$ ${v}`}
            margin={{ top: 40, right: 80, bottom: 80, left: 100 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: "nivo" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextColor="#333333"
            radialLabelsLinkColor={{ from: "color" }}
            radialLabel={(d) => d.label}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#333333"
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
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

export default WagesDistribution;

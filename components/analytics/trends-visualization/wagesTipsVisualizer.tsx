import { ResponsiveBar } from "@nivo/bar";
import React, { useContext } from "react";
import { ShiftTrendsContext } from "src/providers/ShiftTrendsContext";
import styles from "styles/analytics.module.css";
import { getVisualizationDataForWeek } from "./utils";

const WagesTipsVisualizer: React.FunctionComponent = () => {
  const { currentDate, shiftTrends } = useContext(ShiftTrendsContext);
  const visData = getVisualizationDataForWeek(currentDate, shiftTrends);

  return (
    <div className={styles.pastTrendVisPosition}>
      <ResponsiveBar
        data={visData}
        keys={["Cash Tips", "Credit Card Tips", "Wages"]}
        indexBy="date"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Date",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Earnings",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        tooltip={({ id, value }) => (
          <span>
            <b>{id}:</b> $ {value}
          </span>
        )}
      />
    </div>
  );
};

export default WagesTipsVisualizer;

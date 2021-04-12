import React from "react";
import { IShiftTrendData } from "src/providers/ShiftTrendsContext";
import TrendsLine from "./trendsLine";

interface TrendsProps {
  data: IShiftTrendData;
}

const Trends = ({ data }: TrendsProps) => {
  const { shiftTime, creditCardTips, cashTips, hourlyWages, totalTips } = data;

  const formatValue = (value: string | number) => {
    if (typeof value === "number") {
      return `$ ${value.toFixed(2)}`;
    } else {
      return `$ ${value}`;
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-3">
      <TrendsLine value={shiftTime} color="#48b9d7" item="shiftTime" />
      <TrendsLine value={formatValue(hourlyWages)} color="green" item="wages" />
      <TrendsLine
        value={formatValue(creditCardTips)}
        color="black"
        item="creditCardTips"
      />
      <TrendsLine value={formatValue(cashTips)} color="navy" item="cashTips" />
      <TrendsLine
        value={formatValue(totalTips)}
        color="#ff5252"
        item="totalTips"
      />
    </div>
  );
};

export default Trends;
